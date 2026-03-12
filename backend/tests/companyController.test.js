const request = require("supertest");
const jwt = require("jsonwebtoken");

jest.mock("../config/db", () => {
  return {
    execute: jest.fn(),
    getConnection: jest.fn().mockResolvedValue({
      execute: jest.fn(),
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn()
    })
  };
});

process.env.JWT_SECRET = "test-secret";
const app = require("../server");
const db = require("../config/db");

const companyToken = jwt.sign(
  { id: 2, email: "company@test.com", type: "entreprise" },
  process.env.JWT_SECRET
);

afterEach(() => {
  jest.clearAllMocks();
});

describe("Company Controller", () => {

  describe("GET /api/company/profile", () => {
    it("should return 200 and company data", async () => {
      db.execute.mockResolvedValueOnce([[{ id: 5, nomEntreprise: "TechCorp" }]]);

      const res = await request(app)
        .get("/api/company/profile")
        .set("Authorization", `Bearer ${companyToken}`);

      expect(res.status).toBe(200);
      expect(res.body.nomEntreprise).toBe("TechCorp");
    });
  });

  describe("POST /api/company/challenges", () => {
    it("should return 400 if title is missing", async () => {
      const res = await request(app)
        .post("/api/company/challenges")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({ description: "Great job" }); // Missing titre
      
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/titre et la description sont obligatoires/i);
    });

    it("should return 400 if title is too short", async () => {
      const res = await request(app)
        .post("/api/company/challenges")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({ titre: "Ab", description: "Details..." });
      
      expect(res.status).toBe(400);
    });

    it("should return 400 if dateDebut >= dateFin", async () => {
      const res = await request(app)
        .post("/api/company/challenges")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({
          titre: "Valid Title",
          description: "Details...",
          dateDebut: "2024-12-31",
          dateFin: "2024-01-01" // End date is before start date
        });
      
      expect(res.status).toBe(400);
    });

    it("should return 201 and create challenge successfully", async () => {
      db.execute
        .mockResolvedValueOnce([[{ id: 5 }]]) // get entreprise ID
        .mockResolvedValueOnce([{ insertId: 42 }]); // insert challenge

      const res = await request(app)
        .post("/api/company/challenges")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({
          titre: "Fullstack Developer",
          description: "Build an app",
          dateDebut: "2025-01-01",
          dateFin: "2025-12-31"
        });
      
      expect(res.status).toBe(201);
      expect(res.body.challengeId).toBe(42);
    });
  });

  describe("DELETE /api/company/challenges/:id", () => {
    it("should return 404 if challenge not owned by company", async () => {
      db.execute.mockResolvedValueOnce([[]]); // companyOwnsChallenge returns false

      const res = await request(app)
        .delete("/api/company/challenges/99")
        .set("Authorization", `Bearer ${companyToken}`);

      expect(res.status).toBe(404);
    });

    it("should return 200 on successful deletion", async () => {
      db.execute
        .mockResolvedValueOnce([[{ id: 99 }]]) // companyOwnsChallenge returns true
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // delete query

      const res = await request(app)
        .delete("/api/company/challenges/99")
        .set("Authorization", `Bearer ${companyToken}`);

      expect(res.status).toBe(200);
    });
  });

});

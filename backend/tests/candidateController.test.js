const request = require("supertest");
const jwt = require("jsonwebtoken");

// Mock the DB pool BEFORE requiring the app
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

// Set a dummy secret for JWT signing in tests
process.env.JWT_SECRET = "test-secret";

const app = require("../server");
const db = require("../config/db");

// Generate a valid token for a candidate
const candidatToken = jwt.sign(
  { id: 1, email: "candidat@test.com", type: "candidat" },
  process.env.JWT_SECRET
);

afterEach(() => {
  jest.clearAllMocks();
});

describe("Candidate Controller", () => {
  
  describe("GET /api/candidate/profile", () => {
    it("should return 401 if not authenticated", async () => {
      const res = await request(app).get("/api/candidate/profile");
      expect(res.status).toBe(401); // No token provided
    });

    it("should return 404 if profile not found in DB", async () => {
      db.execute.mockResolvedValueOnce([[]]); // Return empty array

      const res = await request(app)
        .get("/api/candidate/profile")
        .set("Authorization", `Bearer ${candidatToken}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/introuvable/i);
    });

    it("should return 200 and profile data if found", async () => {
      const mockProfile = { id: 10, nom: "Doe", prenom: "John", utilisateur_id: 1 };
      db.execute.mockResolvedValueOnce([[mockProfile]]);

      const res = await request(app)
        .get("/api/candidate/profile")
        .set("Authorization", `Bearer ${candidatToken}`);

      expect(res.status).toBe(200);
      expect(res.body.nom).toBe("Doe");
    });
  });

  describe("PUT /api/candidate/profile", () => {
    it("should update profile and return 200", async () => {
      db.execute.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const res = await request(app)
        .put("/api/candidate/profile")
        .set("Authorization", `Bearer ${candidatToken}`)
        .send({ nom: "Smith", prenom: "Will", ville: "Paris" });

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/mis à jour/i);
      
      // Keep in mind DB execute should have been called
      expect(db.execute).toHaveBeenCalled();
    });

    it("should return 400 if nom is invalid type", async () => {
      const res = await request(app)
        .put("/api/candidate/profile")
        .set("Authorization", `Bearer ${candidatToken}`)
        .send({ nom: 12345 }); // Invalid type for nom

      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/candidate/skills", () => {
    it("should return skills for the candidate", async () => {
      db.execute
        .mockResolvedValueOnce([[{ id: 10 }]]) // Candidate ID fetch
        .mockResolvedValueOnce([
          [{ competence_id: 1, competenceNom: "React", niveau: 4 }]
        ]); // Skills fetch

      const res = await request(app)
        .get("/api/candidate/skills")
        .set("Authorization", `Bearer ${candidatToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].competenceNom).toBe("React");
    });
  });

});

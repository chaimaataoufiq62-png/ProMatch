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

describe("Submission Controller", () => {

  describe("POST /api/company/submissions/:id/evaluate", () => {
    
    it("should return 400 if note_finale is missing", async () => {
      const res = await request(app)
        .post("/api/company/submissions/10/evaluate")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({ commentaire: "Good job", est_qualifie: true }); // missing note_finale

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/note finale est obligatoire/i);
    });

    it("should return 400 if note_finale is out of range (0-100)", async () => {
      const res = await request(app)
        .post("/api/company/submissions/10/evaluate")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({ note_finale: 150, commentaire: "Good job", est_qualifie: true });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/entre 0 et 100/i);
    });

    it("should return 404 if company does not own the challenge related to submission", async () => {
      db.execute
        .mockResolvedValueOnce([[{ id: 2 }]]) // company profile fetch
        .mockResolvedValueOnce([[]]); // submission fetch returns nothing (not found/not owned)

      const res = await request(app)
        .post("/api/company/submissions/10/evaluate")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({ note_finale: 85, commentaire: "Good job", est_qualifie: true });

      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/introuvable ou non autorisée/i);
    });

    it("should successfully evaluate a submission", async () => {
      db.execute
        .mockResolvedValueOnce([[{ id: 2 }]]) // company profile fetch
        .mockResolvedValueOnce([[{ id: 10, titre: "Test Challenge", entreprise_id: 2, candidat_utilisateur_id: 1 }]]) // submission fetch
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // insert evaluation
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // update submission statut
        .mockResolvedValueOnce([{ insertId: 5 }]); // create notification

      const res = await request(app)
        .post("/api/company/submissions/10/evaluate")
        .set("Authorization", `Bearer ${companyToken}`)
        .send({ note_finale: 85, commentaire: "Good job", est_qualifie: true });

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/Évaluation enregistrée/i);
    });

  });

});

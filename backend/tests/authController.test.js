// filepath: c:\Users\Ramir\OneDrive\Desktop\documents projet web\Talynx\backend\tests\authController.test.js
const request = require("supertest");

// Mock the DB pool BEFORE requiring the app so no real DB connection is made
jest.mock("../config/db", () => {
  const mockConnection = {
    execute: jest.fn(),
    beginTransaction: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn(),
    release: jest.fn()
  };
  return {
    execute: jest.fn(),
    getConnection: jest.fn().mockResolvedValue(mockConnection)
  };
});

const app = require("../server");
const db = require("../config/db");

afterEach(() => {
  jest.clearAllMocks();
});

// ─── /api/auth/register ───────────────────────────────────────────────────────

describe("POST /api/auth/register", () => {
  it("should return 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ password: "password123", type: "candidat", nom: "Doe", prenom: "John" });
    expect(res.status).toBe(400);
  });

  it("should return 400 if email format is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "not-an-email", password: "password123", type: "candidat", nom: "Doe", prenom: "John" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/email/i);
  });

  it("should return 400 if password is too short (< 8 chars)", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "short", type: "candidat", nom: "Doe", prenom: "John" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/8 caractères/);
  });

  it("should return 400 if type is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123", type: "admin" });
    expect(res.status).toBe(400);
  });

  it("should return 400 if candidat is missing nom/prenom", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123", type: "candidat" });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Nom et prénom/);
  });

  it("should register a new candidat successfully", async () => {
    // Mock: no existing user
    db.execute
      .mockResolvedValueOnce([[]])       // SELECT utilisateur
    ;
    const mockConn = await db.getConnection();
    mockConn.execute
      .mockResolvedValueOnce([[]])                          // SELECT existing users
      .mockResolvedValueOnce([{ insertId: 1 }])            // INSERT utilisateur
      .mockResolvedValueOnce([{}]);                        // INSERT candidat

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "test@example.com",
        password: "password123",
        type: "candidat",
        nom: "Doe",
        prenom: "John"
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Inscription réussie.");
  });
});

// ─── /api/auth/login ──────────────────────────────────────────────────────────

describe("POST /api/auth/login", () => {
  it("should return 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ password: "password123" });
    expect(res.status).toBe(400);
  });

  it("should return 400 if email format is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid", password: "pass" });
    expect(res.status).toBe(400);
  });

  it("should return 401 if user is not found", async () => {
    db.execute.mockResolvedValueOnce([[]]); // No user found
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "unknown@example.com", password: "password123" });
    expect(res.status).toBe(401);
  });
});

// ─── Health check ─────────────────────────────────────────────────────────────

describe("GET /", () => {
  it("should return 200 with service name", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.service).toBe("Talynx API");
  });
});

// ─── 404 handler ─────────────────────────────────────────────────────────────

describe("Unknown routes", () => {
  it("should return 404 for unknown route", async () => {
    const res = await request(app).get("/api/unknown-route");
    expect(res.status).toBe(404);
  });
});
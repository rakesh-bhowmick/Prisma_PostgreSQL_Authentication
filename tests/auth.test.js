
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../db/db.config.js";

const testUser = {
  name: "Test User",
  email: `test-${Date.now()}@example.com`,
  password: "TestPassword123!",
};

describe("Authentication API", () => {
  afterAll(async () => {
    // Remove only the user created by this test run.
    await prisma.user.deleteMany({
      where: { email: testUser.email },
    });
  });

  it("should return 200 for the auth endpoint", async () => {
    const response = await request(app).get("/api/auth");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Auth API called",
    });
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.user.email).toBe(testUser.email);
    expect(response.body.data.token).toBeTruthy();
  });

  it("should reject duplicate email registration", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already Exist.");
  });

  it("should log in with the correct password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.data.token).toBeTruthy();
  });

  it("should reject an incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: "WrongPassword123!",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid password");
  });

  it("should reject a nonexistent user", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: `missing-${Date.now()}@example.com`,
        password: "TestPassword123!",
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });
});

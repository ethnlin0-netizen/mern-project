const request = require("supertest");

jest.mock("../models/User", () => ({
  findOne: jest.fn(),
  find: jest.fn(),
}));

jest.mock("../utils/emailService", () => ({
  sendVerificationEmail: jest.fn(),
  sendResetPasswordEmail: jest.fn(),
}));

const User = require("../models/User");
const app = require("../app");

describe("Auth endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/auth/register should not return 404", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        FirstName: "Test",
        LastName: "User",
        Email: "test@test.com",
        Login: "testuser",
        Password: "password123",
      });

    expect(res.statusCode).not.toBe(404);
  });

  test("POST /api/auth/login should not return 404", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        Login: "fake",
        Password: "fake",
      });

    expect(res.statusCode).not.toBe(404);
  });

  test("GET /api/auth/verify-email/:token should not return 404", async () => {
    User.find.mockResolvedValue([]);
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .get("/api/auth/verify-email/faketoken");

    expect(res.statusCode).not.toBe(404);
  });

  test("POST /api/auth/resend-verification should not return 404", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/resend-verification")
      .send({ Email: "fake@test.com" });

    expect(res.statusCode).not.toBe(404);
  });

  test("POST /api/auth/forgot-password should not return 404", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ Email: "fake@test.com" });

    expect(res.statusCode).not.toBe(404);
  });

  test("POST /api/auth/reset-password/:token should not return 404", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/reset-password/faketoken")
      .send({ Password: "newpassword123" });

    expect(res.statusCode).not.toBe(404);
  });
});
const request = require("supertest");

jest.mock("../middleware/middlewareAuth", () => ({
  authMiddleware: (req, res, next) => {
    req.user = { userId: "testUserId" };
    next();
  },
}));

jest.mock("../models/Class", () => ({
  findOne: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock("../models/Resource", () => ({
  deleteMany: jest.fn(),
}));

const Class = require("../models/Class");
const app = require("../app");

describe("Class endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/classes/create should not return 404", async () => {
    const res = await request(app)
      .post("/api/classes/create")
      .send({ className: "Test Class" });

    expect(res.statusCode).not.toBe(404);
  });

test("POST /api/classes/join should return 404 when class is not found", async () => {
  Class.findOne.mockResolvedValue(null);

  const res = await request(app)
    .post("/api/classes/join")
    .send({ joinCode: "ABC123" });

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("Class not found");
});

  test("GET /api/classes/user/me should not return 404", async () => {
    Class.find.mockResolvedValue([]);

    const res = await request(app)
      .get("/api/classes/user/me");

    expect(res.statusCode).not.toBe(404);
  });

  test("GET /api/classes/search should not return 404", async () => {
    Class.find.mockResolvedValue([]);

    const res = await request(app)
      .get("/api/classes/search?query=test");

    expect(res.statusCode).not.toBe(404);
  });

test("POST /api/classes/leave/:id should return 404 when class is not found", async () => {
  Class.findById.mockResolvedValue(null);

  const res = await request(app)
    .post("/api/classes/leave/123");

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("Class not found");
});

test("DELETE /api/classes/delete/:id should return 404 when class is not found", async () => {
  Class.findById.mockResolvedValue(null);

  const res = await request(app)
    .delete("/api/classes/delete/123");

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("Class not found");
});

test("GET /api/classes/:id should return 404 when class is not found", async () => {
  Class.findById.mockResolvedValue(null);

  const res = await request(app)
    .get("/api/classes/123");

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toBe("Class not found");
});

});
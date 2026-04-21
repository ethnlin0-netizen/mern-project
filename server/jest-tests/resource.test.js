const request = require("supertest");

jest.mock("../middleware/middlewareAuth", () => ({
  authMiddleware: (req, res, next) => {
    req.user = { userId: "testUserId" };
    next();
  },
}));

jest.mock("../models/Resource", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock("../models/Class", () => ({
  findById: jest.fn(),
}));

jest.mock("../models/User", () => ({
  findOne: jest.fn(),
}));

const Resource = require("../models/Resource");
const Class = require("../models/Class");
const User = require("../models/User");

const app = require("../app");

describe("Resource endpoints", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/resources/ should return 404 when class not found", async () => {
    Class.findById.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/resources/")
      .send({
        title: "Test",
        description: "Desc",
        link: "http://test.com",
        classID: "123",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Class not found");
  });

  test("GET /api/resources/class/:classID should return 404 when class not found", async () => {
    Class.findById.mockResolvedValue(null);

    const res = await request(app)
      .get("/api/resources/class/123");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Class not found");
  });

  test("DELETE /api/resources/:id should return 404 when resource not found", async () => {
    User.findOne.mockResolvedValue({ Login: "testUser" });
    Resource.findById.mockResolvedValue(null);

    const res = await request(app)
      .delete("/api/resources/123");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Resource not found");
  });

});
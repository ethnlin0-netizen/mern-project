const request = require("supertest");
const app = require("../app");

describe("Server routes", () => {
  test("GET / should return API is running", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API is running");
  });

  test("POST /ping should return ping works", async () => {
    const res = await request(app).post("/ping");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "ping works" });
  });
});
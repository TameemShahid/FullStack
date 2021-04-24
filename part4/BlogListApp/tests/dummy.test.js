const listHelper = require("../utils/list_helper").dummy;

describe("List Helper", () => {
  test("dummy should return one", () => {
    const blogs = [];

    const result = listHelper(blogs);
    expect(result).toBe(1);
  });
});

const mostBlogs = require("../utils/list_helper").mostBlogs;

describe("Most Blogs", () => {
  test("in an empty list is empty object", () => {
    const blogs = [];

    const result = mostBlogs(blogs);
    expect(result).toEqual({});
  });

  test("in a single item list is that item itself", () => {
    const blogs = [
      {
        author: "Muhammad Tameem Shahid",
        title: "Example Title",
        url: "example.url.com",
        likes: 23,
      },
    ];

    const result = mostBlogs(blogs);
    expect(result).toEqual({ author: "Muhammad Tameem Shahid", blogs: 1 });
  });

  test("in a more than one item list is calculated right", () => {
    const blogs = [
      {
        _id: "6081df24f66dc90ee8376a67",
        title: "Example Title",
        author: "Tameem Shahid",
        url: "http://exampleurl.com",
        likes: 57,
        __v: 0,
      },
      {
        _id: "6081df41f66dc90ee8376a68",
        title: "Example Title 2",
        author: "Anne Hathway",
        url: "http://exampleurl2.com",
        likes: 23,
        __v: 0,
      },
      {
        _id: "6081e40010c9e02b20262337",
        title: "Example Title 3",
        author: "Ada Lovelace",
        url: "http://exampleurl3.com",
        likes: 88,
        __v: 0,
      },
      {
        _id: "6081e7eb6b50c7065cd03ce3",
        title: "Example Title 4",
        author: "Ada Lovelace",
        url: "http://exampleurl4.com",
        likes: 88,
        __v: 0,
      },
      {
        _id: "6081ed830924741fc4f154bd",
        title: "Example Title 5",
        author: "Andrew Simmons",
        url: "http://exampleurl5.com",
        likes: 88,
        __v: 0,
      },
    ];

    const result = mostBlogs(blogs);
    expect(result).toEqual({ author: "Ada Lovelace", blogs: 2 });
  });
});

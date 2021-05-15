const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("../utils/test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as JSON and in correct amount", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier of returned blogs is named id not _id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => expect(blog.id).toBeDefined());
});

test("blog post is added to DB correctly", async () => {
  const note = {
    title: "Example Title 3",
    author: "Amber Jones",
    url: "www.example.url3.com",
    likes: 12,
  };

  await api.post("/api/blogs").send(note).expect(201);

  const allBlogs = await helper.blogsInDB();
  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);
});

test("blog likes are defined", async () => {
  const note = {
    title: "Example Title 4",
    author: "Denim Levis",
    url: "www.example.url4.com",
  };

  const savedBlog = await api.post("/api/blogs").send(note);
  expect(savedBlog.body.likes).toBe(0);
});

test("blog post url and title must be defined", async () => {
  const note = {
    author: "Muhammad Tameem Shahid",
    likes: 34,
  };

  await api.post("/api/blogs").send(note).expect(400);
});

afterAll(async () => {
  await mongoose.connection.close();
});

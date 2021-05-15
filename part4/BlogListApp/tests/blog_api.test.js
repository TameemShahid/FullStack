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

  const allNotes = await helper.blogsInDB();
  expect(allNotes).toHaveLength(helper.initialBlogs.length + 1);
});

test("blog likes are defined", async () => {
  const note = {
    title: "Example Title 4",
    author: "Denim Levis",
    url: "www.example.url4.com",
  };

  const savedNote = await api.post("/api/blogs").send(note);
  expect(savedNote.body.likes).toBe(0);
});

afterAll(async () => {
  await mongoose.connection.close();
});

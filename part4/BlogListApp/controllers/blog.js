const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  if (blogs) {
    response.json(blogs);
  } else {
    response.status(204).end();
  }
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (blog.likes === undefined) {
    blog.likes = 0;
  } else if (blog.title === undefined || blog.url === undefined) {
    response.status(400).end();
    return;
  }

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogRouter;

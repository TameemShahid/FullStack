const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Example Title 1",
    author: "Muhammad Tameem Shahid",
    url: "www.example.url.com",
    likes: 34,
  },
  {
    title: "Example Title 2",
    author: "Ada Lovelace",
    url: "www.example.url2.com",
    likes: 57,
  },
];

const blogsInDB = async () => {
  const notes = await Blog.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDB,
};

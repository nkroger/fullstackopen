const Blog = require("../models/blog");
const User = require("../models/user");
const _ = require("lodash");
const crypto = require("../utils/crypto");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    author: "A Mystery Writer",
    title: "Not really there",
    url: "http://already.gone",
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const userAccounts = [
  { username: "kalleankka", name: "Kalle Ankka", password: "12345678" },
  { username: "peelo", name: "Pekka Elo", password: "hunter2" },
  { username: "pirkko", name: "Niksi Pirkko", password: "aaaaaaaa" },
];

const initialUsers = [
  {
    username: "kalleankka",
    name: "Kalle Ankka",
    passwordHash:
      "$2b$10$FDq7FRQYzxQcozZkZKcRZ.yfWRSgPLMuUgOqng6tFwz2Ul6ceMNN.",
  },
  {
    username: "peelo",
    name: "Pekka Elo",
    passwordHash:
      "$2b$10$Zjckfdxt3i3j3Mk8jgNQc./tKYM9BdPgH02DqCbj5ezrwKgCko8uy",
  },
  {
    username: "pirkko",
    name: "Niksi Pirkko",
    passwordHash:
      "$2b$10$7FX1GZ6DRQC/6aZ0Kd3SpevpvAIhqIx3AUJKBNP9ByHK07PJtDTp.",
  },
];

const nonExistingUserId = async () => {
  const user = new User({
    username: "eimuaoikeestioo",
    name: "Mennyt Mies",
    passwordHash: "olinjamenin",
  });
  await user.save();
  await user.remove();

  return user._id.toString();
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb,
  nonExistingUserId,
  userAccounts,
};

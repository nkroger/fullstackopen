const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");
const _ = require("lodash");
const Blog = require("../models/blog");
const User = require("../models/user");
const crypto = require("../utils/crypto");

const api = supertest(app);

const loginAs = async (username) => {
  const password = helper.userAccounts.find(
    (u) => u.username === username
  ).password;

  const request = { username: username, password: password };
  // login
  const res = await api.post("/api/login").send(request).expect(200);

  return res.body;
};

describe("when there are some initial blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
    const blogs = await Blog.find({});
    const users = await User.find({});

    blogs.forEach(async (blog) => {
      const userId = _.sample(users).id;
      blog.user = userId;
      await blog.save();
    });
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-type", /application\/json/);
  });

  test("api returns the correct amount of blogs", async () => {
    const numberOfBlogs = helper.initialBlogs.length;
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(numberOfBlogs);
  });

  test("a specific blog is among the returned blogs", async () => {
    const expectedBlog = _.sample(helper.initialBlogs);
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain(expectedBlog.title);
  });

  test("blogs should have an id field", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("viewing a specific blog post", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = _.sample(blogsAtStart);

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  test("fails with status code 404 for a nonexisting blog post", async () => {
    const validNonExistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonExistingId}`).expect(404);
  });

  test("fails with staus code 400 if id is invalid", async () => {
    const invalidId = "3a33ddj33j9";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("adding a new blog post", () => {
  test("succeeds with valid data", async () => {
    // TODO login!
    const newBlog = {
      title: "A new blog post for testing",
      author: "Test Author Please Ignore",
      url: "https://www.notarealblog.post/atall",
    };
    const user = await User.findOne({});
    const login = await loginAs(user.username);

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + login.token)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const expectedSize = helper.initialBlogs.length + 1;
    const blogsNow = await helper.blogsInDb();
    const titlesNow = blogsNow.map((b) => b.title);

    expect(blogsNow).toHaveLength(expectedSize);
    expect(titlesNow).toContain(newBlog.title);
  });

  test("fails if the title is missing", async () => {
    const newBlog = {
      url: "www.url.fi",
      author: "A. Uthor",
    };

    const user = await User.findOne({});
    const login = await loginAs(user.username);

    const blogsAtStart = await helper.blogsInDb();

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + login.token)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("fails if the url is missing", async () => {
    const newBlog = {
      title: "A blog post without an url",
      author: "T A",
    };
    const blogsAtStart = await helper.blogsInDb();
    const user = await User.findOne({});
    const login = await loginAs(user.username);

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + login.token)
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("results in a blog with 0 likes if likes are not specified", async () => {
    const newBlog = {
      title: "A test blog",
      author: "Test Author",
      url: "https://test.url.com/blog",
    };

    const user = await User.findOne({});
    const login = await loginAs(user.username);

    // Is this the way to do it?? Could also do the same as viewing a blog test
    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + login.token)
      .send(newBlog)
      .expect(201)
      .expect((res) => {
        expect(res.body.likes).toBe(0);
      });
  });
});

describe("deletion of a blog post", () => {
  test("fails with status code 401 if user is not authorized", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = _.sample(blogsAtStart);

    const expectedError = "authorization failed";

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
      .expect("Content-Type", /application\/json/)
      .expect((res) => {
        expect(res.body.error).toEqual(expectedError);
      });

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
  });

  test("succeeds with status code 204 if the id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = _.sample(blogsAtStart);
    const usersAtStart = await helper.usersInDb();
    // TODO must log in!
    //const blog = await Blog.find({ id: blogToDelete.id })
    const userId = blogToDelete.user;
    const user = await User.findById(userId);

    const login = await loginAs(user.username);
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", "Bearer " + login.token)
      .expect(204);
    //.expect('Content-Type', /application\/json/)

    await new Promise(r => setTimeout(r, 2000))
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe("updating a blog post to change its likes", () => {
  test("succeeds with status code 200 with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = _.sample(blogsAtStart);

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const userId = request.user;
  if (!userId) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: userId,
    likes: body.likes === undefined ? 0 : body.likes,
    comments: [],
  });

  const savedBlog = await blog.save();
  console.log(savedBlog);
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body.comment;
  const update = { $push: { comments: body } };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {
    new: true,
  });

  response.status(201).json(updatedBlog.toJSON());
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes: body.likes },
    { runValidators: true, new: true }
  ).populate("user", { username: 1, name: 1, id: 1 });
  response.json(updatedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  //const user = jwt.verify(request.token, process.env.SECRET).id
  const user = request.user;
  if (!(user && blog.user.toString() === user.toString())) {
    return response.status(401).json({ error: "authorization failed" });
  }
  blog.remove();
  response.status(204).end();
  //await Blog.findByIdAndRemove(request.params.id)
  //response.status(204).end()
});

module.exports = blogsRouter;

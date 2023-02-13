import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createNewBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("blog title");
  const authorInput = screen.getByPlaceholderText("blog author");
  const urlInput = screen.getByPlaceholderText("blog url");
  const createButton = screen.getByText("create");

  const newBlog = {
    title: "Test Title Please Ignore",
    author: "Iam Notreal",
    url: "www.nothinghere.fi",
  };

  await userEvent.type(titleInput, newBlog.title);
  await userEvent.type(authorInput, newBlog.author);
  await userEvent.type(urlInput, newBlog.url);

  await userEvent.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(newBlog.title);
  expect(createBlog.mock.calls[0][0].author).toBe(newBlog.author);
  expect(createBlog.mock.calls[0][0].url).toBe(newBlog.url);
});

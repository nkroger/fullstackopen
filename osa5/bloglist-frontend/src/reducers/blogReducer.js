import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { setSuccessMsg, setErrorMsg } from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      const id = updatedBlog.id

      return state.map((blog) => (blog.id !== id ? blog : updatedBlog))
    },
  },
})

export const { appendBlog, setBlogs, removeBlog, updateBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(setSuccessMsg(`New blog ${newBlog.title} added!`))
    } catch (error) {
      dispatch(setErrorMsg(error.message))
    }
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogToDelete)
      dispatch(setSuccessMsg(`Blog ${blogToDelete.title} deleted!`))
      dispatch(removeBlog(blogToDelete.id))
    } catch (error) {
      dispatch(setErrorMsg(`Deleting blog failed. ${error.message}`))
    }
  }
}

export const addLike = (blogToLike) => {
  return async (dispatch) => {
    try {
      const updatedBlog = { ...blogToLike, likes: blogToLike.likes + 1 }
      await blogService.updateLikes(updatedBlog)
      dispatch(updateBlog(updatedBlog))
      dispatch(setSuccessMsg(`You liked ${blogToLike.title}!`, 2))
    } catch (error) {
      dispatch(setErrorMsg(`Liking blog failed. ${error.message}`))
    }
  }
}

export default blogSlice.reducer

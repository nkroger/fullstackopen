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
  },
})

export const { appendBlog, setBlogs } = blogSlice.actions

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

export default blogSlice.reducer

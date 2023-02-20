import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { setErrorMsg, setSuccessMsg } from "./notificationReducer"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    //removeUser(state, action) {
    //return null
    //},
  },
})

export const { setUser, removeUser } = userSlice.actions

export const login = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user))
      dispatch(setUser(user))
      setSuccessMsg(`Logged in as ${user.username}`)
    } catch (error) {
      setErrorMsg("wrong credentials")
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(setUser(null))
    window.localStorage.removeItem("loggedInBlogUser")
  }
}

export default userSlice.reducer

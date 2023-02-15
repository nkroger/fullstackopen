import { useState, useEffect, useRef } from "react"
//import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import BlogList from "./components/BlogList"
import blogService from "./services/blogs"
import LoggedUser from "./components/LoggedUser"
import Notifications from "./components/Notification"
import Togglable from "./components/Togglable"
import { initializeBlogs } from "./reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { setSuccessMsg } from "./reducers/notificationReducer"
import { setUser, login, logout } from "./reducers/userReducer"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedInBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login({ username, password }))
  }

  const handleLogout = () => {
    dispatch(logout())
    window.localStorage.removeItem("loggedInBlogUser")
    setSuccessMsg("Logged out")
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

  const user = useSelector((state) => state.user)

  return (
    <div>
      <h2>blogs</h2>
      <Notifications.ErrorNotification />
      <Notifications.SuccessNotification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <LoggedUser name={user.name} logoutHandler={() => handleLogout()} />
          <br />
          <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App

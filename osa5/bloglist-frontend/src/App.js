import { useState, useEffect, useRef } from "react"
//import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import User from "./components/User"
import blogService from "./services/blogs"
import LoggedUser from "./components/LoggedUser"
import Notifications from "./components/Notification"
import Togglable from "./components/Togglable"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/usersReducer"
import { useDispatch, useSelector } from "react-redux"
import { setSuccessMsg } from "./reducers/notificationReducer"
import { setUser, login, logout } from "./reducers/userReducer"
import { Routes, Route, Link } from "react-router-dom"
import { Form, Button, Navbar, Nav } from "react-bootstrap"

const Users = () => {
  const users = useSelector((state) => state.users)
  const blogCounts = users
    .map((u) => ({ ...u, count: u.blogs.length }))
    .sort((a, b) => b.count - a.count)

  return (
    <>
      <div>
        {" "}
        <h2>Users</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {blogCounts.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const padding = {
  paddingRight: 5,
}

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
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
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  )

  const user = useSelector((state) => state.user)

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              Users
            </Link>
          </Nav.Link>
          {user === null ? (
            <></>
          ) : (
            <LoggedUser name={user.name} logoutHandler={() => handleLogout()} />
          )}
        </Navbar.Collapse>
      </Navbar>
      <h2>blogs</h2>
      <Notifications.ErrorNotification />
      <Notifications.SuccessNotification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {/*<BlogList />*/}
        </div>
      )}
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App

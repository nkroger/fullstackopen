import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoggedUser from './components/LoggedUser'
import Notifications from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs]                   = useState([])
  const [errorMessage, setErrorMessage]     = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername]             = useState('')
  const [password, setPassword]             = useState('')
  const [user, setUser]                     = useState(null)
  const [title, setTitle]                   = useState('')
  const [author, setAuthor]                 = useState('')
  const [url, setUrl]                       = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(
        `Logged in as ${user.username}`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  /*const handleAddBlog = async (event) => {
    event.preventDefault()
    
    try {
      const result = await blogService.create(
        { title, author, url }
      )
      setBlogs(blogs.concat(result))
      setSuccessMessage(
        `A new blog '${result.title}' by ${result.author} added!`
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage('Adding blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }*/

  // TODO: New blog cannot be deleted before refresh!
  const createBlog = async ( newBlog ) => {
    try {
      const res = await blogService.create(newBlog)
      console.log(res)
      setBlogs(blogs.concat(res))
      setSuccessMessage(
        `A new blog '${res.title}' by ${res.author} added!`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage('Adding blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const deleteBlog = async ( blogToDelete ) => {
    if (window.confirm(`Delete blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        const res = await blogService.deleteBlog(blogToDelete)
        setBlogs(blogs.filter( b => b.id !== blogToDelete.id ))
        setSuccessMessage('Blog deleted')
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      } catch (exception) {
        setErrorMessage('Deletion failed\n' + exception)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogUser')
    setSuccessMessage('Logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const sortedBlogs = () => {
    return blogs.sort( (a, b) => b.likes - a.likes )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notifications.ErrorNotification message={errorMessage} />
      <Notifications.SuccessNotification message={successMessage} />
      { user === null ?
        loginForm() :
        <div>
          <LoggedUser
            name={user.name}
            logoutHandler={() => logout()} />
          <br />
          <Togglable  buttonLabel="add blog" ref={blogFormRef} >
             <BlogForm createNewBlog={createBlog} />
           </Togglable>
          {
            sortedBlogs().map(blog =>
              <Blog key={blog.id} blog={blog} user={user}
                deleteHandler={() => deleteBlog(blog)}/>
            )}
        </div> 
      }
      
    </div>
  )
}

export default App

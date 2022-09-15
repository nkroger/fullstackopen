import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoggedUser from './components/LoggedUser'

const App = () => {
  const [blogs, setBlogs]               = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername]         = useState('')
  const [password, setPassword]         = useState('')
  const [user, setUser]                 = useState(null)
  const [title, setTitle]               = useState('')
  const [author, setAuthor]             = useState('')
  const [url, setUrl]                   = useState('')

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
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    
    try {
      const result = await blogService.create(
        { title, author, url }
      )
      setBlogs(blogs.concat(result))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setErrorMessage('Adding blog failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogUser')
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

  const blogForm = () => (
    <form onSubmit={handleAddBlog}>
      <div>
        <h2>create new</h2>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h2>blogs</h2>


      { user === null ?
        loginForm() :
        <div>
          <LoggedUser
            name={user.name}
            logoutHandler={() => logout()} />
          {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div> 
      }
      
    </div>
  )
}

export default App

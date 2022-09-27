import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, user, deleteHandler}) => {
  const [ visible, setVisible ] = useState(false)
  const [ currentLikes, setLikes ]     = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const buttonLabel = () => {
    const label = visible ? 'hide' : 'view'
    return label
  }

  const addLike = async () => {
    const { id, user, title, author, url } = blog
    const newLikes = currentLikes + 1
    const result = await blogService.updateLikes({ id, user, title, author, url, likes: newLikes })
    setLikes(result.likes)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisiblity}>{buttonLabel()}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {currentLikes} <button onClick={addLike}>like</button><br />
        {blog.user.name}
        { user.username === blog.user.username &&
          <>
            <br /><button onClick={deleteHandler}>Delete</button>
          </>
        }
      </div>
    </div>  
  )
}

export default Blog

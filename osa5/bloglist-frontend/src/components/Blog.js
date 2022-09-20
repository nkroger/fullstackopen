import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [ visible, setVisible ] = useState(false)
  const [ likes, setLikes ]     = useState(blog.likes)

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
    const { id, user, title, author, url, likes } = blog
    const newLikes = likes + 1
    const result = await blogService.updateLikes({ id, user, title, author, url, likes: newLikes })
    setLikes(result.likes)
  }
    
  
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisiblity}>{buttonLabel()}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {likes} <button onClick={addLike}>like</button><br />
        {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog

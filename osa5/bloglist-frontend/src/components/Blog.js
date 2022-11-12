import { useState } from 'react'

const Blog = ({ blog, user, deleteHandler, likeHandler }) => {
  const [ visible, setVisible ] = useState(false)

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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisiblity}>{buttonLabel()}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes} <button onClick={likeHandler}>like</button><br />
        {blog.user.name}
        { user.username === blog.user.username &&
          <>
            <br /><button onClick={() => deleteHandler(blog)}>Delete</button>
          </>
        }
      </div>
    </div>
  )
}

export default Blog

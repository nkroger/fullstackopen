import { useState } from "react"
import { deleteBlog, addLike } from "../reducers/blogReducer"
import { useDispatch } from "react-redux"

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  const buttonLabel = () => {
    const label = visible ? "hide" : "view"
    return label
  }

  const deleteHandler = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
    }
  }

  const likeHandler = () => {
    dispatch(addLike(blog))
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleVisiblity}>{buttonLabel()}</button>
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes}
        <br />
        {blog.user.name}
        {user.username === blog.user.username && (
          <>
            <br />
            <button onClick={() => deleteHandler()}>Delete</button>
          </>
        )}
        <button onClick={() => likeHandler()}>like</button>
      </div>
    </div>
  )
}

export default Blog

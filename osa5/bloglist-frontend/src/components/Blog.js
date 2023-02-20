import { deleteBlog, addLike } from "../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { Link, useMatch } from "react-router-dom"

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const match = useMatch("/blogs/:id")
  const blog = useSelector((state) =>
    state.blogs.find((b) => b.id === match.params.id)
  )

  if (!blog) {
    return null
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
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
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}{" "}
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        likes {blog.likes}
        <button onClick={() => likeHandler()}>like</button>
        <br />
        Added by {blog.user.name}
        {user.username === blog.user.username && (
          <>
            <br />
            <button onClick={() => deleteHandler()}>Delete</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Blog

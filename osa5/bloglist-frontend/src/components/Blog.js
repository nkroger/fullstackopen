import { deleteBlog, addLike, addBlogComment } from "../reducers/blogReducer"
import { useDispatch, useSelector } from "react-redux"
import { useMatch } from "react-router-dom"
import { useState } from "react"

const Blog = () => {
  const [comment, setComment] = useState("")
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

  const blogComments = () => {
    const comments = blog.comments
    if (!comments) {
      return null
    }

    const addComment = async (event) => {
      event.preventDefault()
      dispatch(addBlogComment({ blogId: blog.id, comment: comment }))
    }

    return (
      <div>
        <h2>comments</h2>
        <form onSubmit={addComment}>
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button id="comment-button" type="submit">
            add comment
          </button>
        </form>
        <ul>
          {comments.map((comment, i) => {
            return <li key={i}>{comment}</li>
          })}
        </ul>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <div>
        <a href={blog.url}>{blog.url}</a> <br />
        likes {blog.likes}
        <button onClick={() => likeHandler()}>like</button>
        <br />
        Added by {blog.user.name}
        {user && user.username === blog.user.username && (
          <>
            <br />
            <button onClick={() => deleteHandler()}>Delete</button>
          </>
        )}
        {blogComments()}
      </div>
    </div>
  )
}

export default Blog

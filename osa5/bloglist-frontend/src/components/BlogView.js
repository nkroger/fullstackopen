import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const BlogView = () => {
  const match = useMatch("/blogs/:id")
  const blog = useSelector((state) =>
    state.blogs.find((b) => b.id === match.params.id)
  )

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      {blog.likes} likes
      <p>Added by {blog.user.name}</p>
    </div>
  )
}

export default BlogView

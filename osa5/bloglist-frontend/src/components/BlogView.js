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
      <a href={blog.url}>{blog.url}</a> <br />
      {blog.likes} likes
    </div>
  )
}

export default BlogView

import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = ({ user }) => {
  //const dispatch = useDispatch()

  const sortedBlogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })

  return (
    <div id="bloglist">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default BlogList

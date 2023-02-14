import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogList = () => {
  //const dispatch = useDispatch()

  const sortedBlogs = useSelector((state) => {
    return [...state.blogs].sort((a, b) => b.likes - a.likes)
  })

  return (
    <div id="bloglist">
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          //user={user}
          //deleteHandler={() => deleteBlog(blog)}
          //likeHandler={() => addLikeFor(blog.id)}
        />
      ))}
    </div>
  )
}

export default BlogList

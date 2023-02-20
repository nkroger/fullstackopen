import { useMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  const match = useMatch("/users/:id")
  const user = useSelector((state) =>
    state.users.find((u) => u.id === match.params.id)
  )

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <b>Added blogs</b>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User

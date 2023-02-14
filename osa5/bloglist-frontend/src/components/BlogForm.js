import { useState } from "react"
import { useDispatch } from "react-redux"
import { addBlog } from "../reducers/blogReducer"

const BlogForm = () => {
  const [title, setNewTitle] = useState("")
  const [author, setNewAuthor] = useState("")
  const [url, setNewUrl] = useState("")
  const dispatch = useDispatch()

  const handleAdd = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(addBlog({ ...newBlog, likes: 0 }))

    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div>
          title:
          <input
            id="blog-title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="blog title"
          />
        </div>
        <div>
          author:
          <input
            id="blog-author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="blog author"
          />
        </div>
        <div>
          url:
          <input
            id="blog-url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="blog url"
          />
        </div>
        <button id="save-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm

import { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
  const [title, setNewTitle]   = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl]       = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title: title,
      author: author,
      url: url
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm

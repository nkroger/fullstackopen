import axios from "axios"
const baseUrl = "/api/blogs"

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + `/${updatedBlog.id}`

  const response = await axios.put(url, updatedBlog, config)
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  }

  const url = baseUrl + `/${blogToDelete.id}`
  const response = await axios.delete(url, config)
  return response.data
}

const addComment = async ({ id, comment }) => {
  const url = baseUrl + `/${id}/comments`
  const body = { comment: comment }
  const response = await axios.post(url, body)
  return response.data
}

export default { getAll, setToken, create, updateLikes, deleteBlog, addComment }

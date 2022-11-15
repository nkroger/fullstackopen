import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const url = baseUrl + `/${updatedBlog.id}`

  const response = await axios.put(url, updatedBlog, config)
  return response.data
}

const deleteBlog = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token }
  }

  const url = baseUrl + `/${blogToDelete.id}`
  const response = await axios.delete(url, config)
  console.log(response.data)
  return response.data
}

export default { getAll, setToken, create, updateLikes, deleteBlog }

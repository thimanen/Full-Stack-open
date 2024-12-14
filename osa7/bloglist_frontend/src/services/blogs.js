import axios from "axios"
const baseUrl = "/api/blogs"

/* Token for authorization */
let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updateBlog) => {
  const blogUrl = `${baseUrl}/${updateBlog.id}`

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(blogUrl, updateBlog, config)
  return response.data
}

const remove = async (deleteBlog) => {
  const blogUrl = `${baseUrl}/${deleteBlog.id}`

  const config = {
    headers: { Authorization: token },
  }

  /* is deleteBlog needed as argument */
  const response = await axios.delete(blogUrl, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }

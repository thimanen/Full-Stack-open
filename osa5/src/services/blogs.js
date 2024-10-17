import axios from 'axios'
const baseUrl = '/api/blogs'

/* Token for authorization */
let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

/*
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
*/

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

export default { getAll, create, setToken }
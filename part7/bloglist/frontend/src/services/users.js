import axios from 'axios'
import decode from 'jwt-decode'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getUser = () => {
  return token ? decode(token) : false
}

const getUsers = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { setToken, getUser, getUsers }

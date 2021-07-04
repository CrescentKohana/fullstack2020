import blogService from '../services/blogs'
import loginService from '../services/login'
import { setMessage } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const initUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    console.log(user)
    blogService.setToken(user.token)
    return { type: 'LOGIN', data: user }
  }
  return { type: 'LOGOUT' }
}

export const userLogout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  return { type: 'LOGOUT' }
}

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(initUser())
      dispatch(setMessage(`Welcome ${user.username}!`, 'success'))
    } catch (error) {
      dispatch(setMessage('Wrong credentials', 'error'))
    }
  }
}

export default userReducer

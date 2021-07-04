import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'ADD_LIKE':
    return state.map(blog => blog.id === action.data.id ? { ...blog, likes: action.data.likes } : blog )
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'ADD_COMMENT':
    return state.map(item => item.id !== action.data.id ? item : action.data)
  default:
    return state
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getBlogs()
    dispatch({ type: 'INIT_BLOGS', data: blogs })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({ type: 'CREATE_BLOG', data: newBlog })
  }
}

export const addLike = (id, likes) => {
  return async (dispatch) => {
    await blogService.update({ id, likes })
    dispatch({ type: 'ADD_LIKE', data: { id, likes } })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.del(id)
    dispatch({ type: 'DELETE_BLOG', data: { id } })
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(id, comment)
    dispatch({ type: 'ADD_COMMENT', data: updatedBlog })
  }
}

export default blogReducer

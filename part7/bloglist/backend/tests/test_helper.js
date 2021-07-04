const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = require('./test_data/initial_blogs.json')

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'person', url: 'url', likes: 0 })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const getBlog = async (id) => {
  return await Blog.findById(id)
}

const blogsInDb = async () => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, getBlog, blogsInDb, usersInDb
}

import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const blogFormRef = useRef()

  useEffect(async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs.sort((a, b) => b.likes - a.likes))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      setMessage(null)
      const userLoggedIn = await loginService.login(userObject)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userLoggedIn))
      blogService.setToken(userLoggedIn.token)
      setUser(userLoggedIn)
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const createBlog = async (blogObject) => {
    setMessage(null)
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)
      const tempBlogs = await blogService.getAll()
      setBlogs(tempBlogs.sort((a, b) => b.likes - a.likes))
      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    } catch (_error) {
      setMessage('An error occured')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const deleteHandler = async (blogObject) => {
    if (!window.confirm(`Remove blog ${blogObject.title}?`)) {
      return
    }
    const deletedBlog = blogObject
    try {
      blogService.del(blogObject.id)
      setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id).sort((a, b) => b.likes - a.likes))
      setMessage(`${deletedBlog.title} succesfully deleted`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    } catch (error) {
      setMessage(`A problem trying to delete ${deletedBlog.title}. Maybe it doesn't exist anymore?`)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 5000)
    }
  }

  const addLike = async (blogObject) => {
    setBlogs(blogs.map(blog => blog.id === blogObject.id ? { ...blog, likes: blog.likes + 1 } : blog ))
    blogService.update(
      blogObject.id,
      { title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: blogObject.likes + 1 }
    )
  }

  const loginForm = () => {
    return <Togglable showButtonLabel='Login' hideButtonLabel="Cancel">
      <LoginForm handleLogin={handleLogin} />
    </Togglable>
  }

  const blogForm = () => (
    <Togglable showButtonLabel="New blog" hideButtonLabel="Cancel" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  return <div>
    <h1>Blog App</h1>
    <Notification message={message} type={messageType} />
    { user === null ?
      loginForm() :
      <>
        <div><b>{user.name}</b> logged in <button onClick={handleLogout}>Logout</button></div>
        <div>{blogForm()}</div>
      </>
    }

    <h2>Blogs</h2>
    <div>
      {
        blogs.map(blog => <Blog
          className='blog'
          key={blog.id}
          blog={blog}
          likeHandler={addLike}
          deleteHandler={user && user.id === blog.user.id ? deleteHandler : null}
        />)
      }
    </div>
  </div>

}

export default App
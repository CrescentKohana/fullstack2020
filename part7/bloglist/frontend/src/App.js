import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'

import { initBlogs, createBlog } from './reducers/blogReducer'
import { setMessage } from './reducers/notificationReducer'
import { initUser } from './reducers/userReducer'

import Navigation from './components/Navigation'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'

import { Container, Typography } from '@material-ui/core'


const App = () => {
  const dispatch = useDispatch()
  const history = useHistory
  const blogFormRef = useRef()

  const blogs        = useSelector((state) => state.blogs.sort((a, b) => b.likes - a.likes))
  const notification = useSelector((state) => state.notification)
  const user         = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initUser())
    dispatch(initBlogs())
  }, [])

  const matchUserID = useRouteMatch('/users/:id')
  const userBlogs = matchUserID ? blogs.filter(blog => blog.user.id === matchUserID.params.id) : null

  const blogHandler = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(setMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success'))
    } catch (error) {
      dispatch(setMessage('An error occured', 'error'))
    }
  }

  const mainView = () => {
    if (user) {
      return <div>
        <Blogs blogs={blogs} />
        <br/>
        <Togglable showButtonLabel='New blog' hideButtonLabel='Cancel' ref={blogFormRef}>
          <BlogForm createBlog={blogHandler} />
        </Togglable>
        <Users />
      </div>
    }

    return <div>
      <Typography style={{ marginBottom: 20 }} align="left" variant="h5">Login to create blogs</Typography>
      <Togglable showButtonLabel='Login' hideButtonLabel='Cancel'>
        <LoginForm />
      </Togglable>
    </div>
  }

  return <Container>
    <Typography align="left" variant="h1">Blog App</Typography>
    <Navigation history={history} />
    <Notification notification={notification} />
    <Switch>
      <Route path='/users/:id'><User blogs={userBlogs} /></Route>
      <Route path='/blogs/:id'><Blog history={history} /></Route>
      <Route path='/users'><Users /></Route>
      <Route path='/blogs'>
        <Blogs blogs={blogs} />
        <br/>
        { user &&
          <Togglable showButtonLabel='New blog' hideButtonLabel='Cancel' ref={blogFormRef}>
            <BlogForm createBlog={blogHandler} />
          </Togglable>}
      </Route>
      <Route path='/'>{mainView()}</Route>
    </Switch>
  </Container>
}

export default App

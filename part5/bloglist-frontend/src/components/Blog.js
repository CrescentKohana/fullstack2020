import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const addLike = async (event) => {
    event.preventDefault()
    likeHandler(blog)
    setLikes(blog.likes + 1)
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    deleteHandler(blog)
  }

  const delButton = () => {
    return <button className="blog-del-btn" onClick={deleteBlog}>Delete</button>
  }

  return <div className="blog">
    <b>{blog.title}</b> by <b>{blog.author}</b> {' '}
    <button className="blog-view-btn" onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</button>
    {visible &&
      <div className='extra'>
        <div className='url'>🔗 <a href={blog.url}>{blog.url}</a></div>
        <div className='likes'>❤️ {likes} <button onClick={addLike}>+</button></div>
        { deleteHandler !== null && delButton() }
      </div>
    }
  </div>
}

Blog.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  likes: PropTypes.number
}

export default Blog

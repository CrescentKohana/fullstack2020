import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [likes, setLikes] = useState('')

  const handleTitleChange = (event) => { setTitle(event.target.value) }
  const handleAuthorChange = (event) => { setAuthor(event.target.value) }
  const handleURLChange = (event) => { setURL(event.target.value) }
  const handleLikesChange = (event) => { setLikes(event.target.value) }

  const addBlog = async (event) => {
    event.preventDefault()

    createBlog({
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
      likes: likes
    })
  }

  return <div className="formDiv">
    <h2>Add a new blog</h2>
    <div>
      <form id="form-blog" onSubmit={addBlog}>
        <div>Title <input id='title' value={title} onChange={handleTitleChange} /></div>
        <div>Author <input id='author' value={author} onChange={handleAuthorChange} /></div>
        <div>URL <input id='url' value={url} onChange={handleURLChange} /></div>
        <div>Likes <input id='likes' value={likes} type="number" onChange={handleLikesChange} /></div>
        <button id='save-btn' type="submit">Save</button>
      </form>
    </div>
  </div>
}

export default BlogForm

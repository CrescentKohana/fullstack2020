import React, { useState } from 'react'

import { Button, TextField, Typography } from '@material-ui/core'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const handleTitleChange = (event) => { setTitle(event.target.value) }
  const handleAuthorChange = (event) => { setAuthor(event.target.value) }
  const handleURLChange = (event) => { setURL(event.target.value) }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title.trim(),
      author: author.trim(),
      url: url.trim(),
      likes: 0
    })
  }

  return <div className="formDiv">
    <Typography align="left" variant="h4">Add a new blog</Typography>
    <div>
      <form id="form-blog" onSubmit={addBlog}>
        <div><TextField id="standard-basic" label="Title" value={title} onChange={handleTitleChange} /></div>
        <div><TextField id="standard-basic" label="Author" value={author} onChange={handleAuthorChange} /></div>
        <div><TextField id="standard-basic" label="URL" value={url} onChange={handleURLChange} /></div>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Button variant="contained" color="primary" id='save-btn' type="submit">Save</Button>
        </div>
      </form>
    </div>
  </div>
}

export default BlogForm

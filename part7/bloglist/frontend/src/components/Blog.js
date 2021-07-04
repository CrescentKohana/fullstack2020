import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, withRouter, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addLike, deleteBlog, addComment } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

import { withStyles } from '@material-ui/core/styles'
import { Container, Typography, Button, Input } from '@material-ui/core'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

const StyledTableCell = withStyles(() => ({
  head: { backgroundColor: '#000', color: '#fff' },
  body: { fontSize: 15 },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }
}))(TableRow)

const Blog = ({ history }) => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find(blog => blog.id === id))
  const currentUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!blog) {
    return <Redirect to="/" />
  }

  const likeHandler = async (event) => {
    event.preventDefault()
    dispatch(addLike(blog.id, blog.likes + 1))
  }

  const deleteHandler = async (event) => {
    event.preventDefault()
    if (!window.confirm(`Remove blog ${blog.title}?`)) {
      return
    }

    const deletedBlog = blog
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(setMessage(`${deletedBlog.title} succesfully deleted`, 'success'))
      history.push('/')
    } catch (error) {
      dispatch(setMessage(`A problem trying to delete ${deletedBlog.title}. Maybe it doesn't exist anymore?`, 'error'))
    }
  }

  const commentHandler = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, e.target.comment.value))
    e.target.comment.value = ''
  }

  const displayDelete = currentUser && blog.user.id === currentUser.id

  return <Container>
    <Typography align="left" variant="h4">
      <b>{blog.title}</b> by <b>{blog.author}</b> {' '}
      <Button variant="contained" color="primary" onClick={likeHandler}>❤️ {blog.likes}</Button>
    </Typography>
    <div className='extra'>
      <Typography className='url' align="left" variant="h5">URL 🔗 <a href={blog.url}>{blog.url}</a></Typography>
      {displayDelete && <Button  variant="contained" color="secondary" className='blog-del-btn' onClick={deleteHandler}>
        Delete
      </Button>}
    </div>

    <div className='comments' style={{ marginTop: 50 }}>
      <form id="form-comment" onSubmit={commentHandler}>
        <Input multiline={true} placeholder="Comment" name="comment" />
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <Button variant="contained" color="primary" id='comment-btn' type="submit">Submit</Button>
        </div>
      </form>

      <div className="comments">
        {blog.comments[0] && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow><StyledTableCell>Comments</StyledTableCell></TableRow>
              </TableHead>
              <TableBody>
                {blog.comments.map((comment, index) => (
                  <StyledTableRow key={index}><StyledTableCell>{comment}</StyledTableCell></StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  </Container>
}

Blog.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  url: PropTypes.string,
  likes: PropTypes.number
}

export default withRouter(Blog)

import React from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'

const StyledTableCell = withStyles(() => ({
  head: { backgroundColor: '#000', color: '#fff' },
  body: { fontSize: 15 },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }
}))(TableRow)

const Blogs = ({ blogs }) => {
  return <div className="blogs">
    <Typography style={{ marginTop: 50 }} align="left" variant="h5">Blogs</Typography>
    {blogs && (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Author</StyledTableCell>
              <StyledTableCell>Link</StyledTableCell>
              <StyledTableCell align="right">Likes ❤</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <StyledTableRow key={blog.id}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </StyledTableCell>
                <StyledTableCell>{blog.author}</StyledTableCell>
                <StyledTableCell><a href={blog.url}>{blog.url}</a></StyledTableCell>
                <StyledTableCell align="right">{blog.likes}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </div>
}

export default Blogs

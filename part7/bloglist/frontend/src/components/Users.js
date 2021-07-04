import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../reducers/usersReducer'

import { withStyles } from '@material-ui/core/styles'
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@material-ui/core'

const StyledTableCell = withStyles(() => ({
  head: { backgroundColor: '#000', color: '#fff' },
  body: { fontSize: 15 },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: { '&:nth-of-type(odd)': { backgroundColor: theme.palette.action.hover } }
}))(TableRow)

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(async () => { dispatch(getUsers()) }, [])

  return (
    <div className="users">
      <Typography style={{ marginTop: 50 }} align="left" variant="h5">Users</Typography>
      {users && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell>Blogs Created</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <StyledTableRow key={user.id}>
                  <StyledTableCell component="th" scope="row">
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </StyledTableCell>
                  <StyledTableCell>{user.blogs.length}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default Users

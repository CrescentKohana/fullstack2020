import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  flex: { flexGrow: 1 },
  link: { textDecoration: 'none', padding: '5px', color: '#ffffff' }
}))

const Navigation = ({ history }) => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/')
  }

  return <div className={classes.flex} style={{ marginBottom: 50 }}>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.flex}>
          <Link className={classes.link} to='/'>Home</Link>
          <Link className={classes.link} to='/Blogs'>Blogs</Link>
          <Link className={classes.link} to='/Users'>Users</Link>
        </Typography>
        {user !== null && (<>
          {user.name} logged in
          <Button style={{ marginLeft: 10 }} variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
        </>)}
      </Toolbar>
    </AppBar>
  </div>
}

export default withRouter(Navigation)

import React from 'react'
import Blogs from './Blogs'

import { Typography } from '@material-ui/core'

const User = ({ blogs }) => {
  if (blogs.length === 0) {
    return <Typography style={{ marginTop: 50 }} align="left" variant="h4">No blogs</Typography>
  }

  return <div>
    <Typography style={{ marginTop: 50 }} align="left" variant="h4">{blogs[0].user.name}</Typography>
    <Blogs blogs={blogs} />
  </div>
}

export default User

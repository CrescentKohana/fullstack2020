import React from 'react'

import Alert from '@material-ui/lab/Alert'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  const severity = notification.type === 'success' ? 'success' : 'error'

  return <Alert severity={severity}>{notification.text}</Alert>
}

export default Notification

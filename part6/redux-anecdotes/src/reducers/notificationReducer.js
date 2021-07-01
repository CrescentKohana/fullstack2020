let timeout = 0

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification 
    default:
      return state
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    clearTimeout(timeout)
    timeout = setTimeout(() => 
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { notification: null }
      }), 
      time * 1000
    )

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }
    })
  }
}

export default notificationReducer

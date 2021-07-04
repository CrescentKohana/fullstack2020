import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return <>
    <span style={hideWhenVisible}>
      <Button variant="contained" onClick={toggleVisibility}>{props.showButtonLabel}</Button>
    </span>
    <span style={showWhenVisible} className="togglableContent">
      {props.children}
      <Button variant="contained" onClick={toggleVisibility}>{props.hideButtonLabel ? props.hideButtonLabel : 'Cancel'}</Button>
    </span>
  </>
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired
}

export default Togglable

import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
      <button onClick={toggleVisibility}>{props.showButtonLabel}</button>
    </span>
    <span style={showWhenVisible} className="togglableContent">
      {props.children}
      <button onClick={toggleVisibility}>{props.hideButtonLabel ? props.hideButtonLabel : 'Cancel'}</button>
    </span>
  </>
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showButtonLabel: PropTypes.string.isRequired
}

export default Togglable

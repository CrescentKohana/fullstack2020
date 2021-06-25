import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ value, onChange }) => {
  return <p>Filter shown with <input value={value} onChange={onChange} /></p>
}

Filter.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any,
}

export default Filter

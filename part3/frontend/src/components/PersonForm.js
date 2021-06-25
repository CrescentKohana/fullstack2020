import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({ addPerson, data }) => {
  return <form onSubmit={addPerson}>
    <div>Name <input value={data.newName} onChange={data.handleNameChange} /></div>
    <div>Number <input value={data.newNumber} onChange={data.handleNumberChange} /></div>
    <div><button type="submit">Add</button></div>
  </form>
}

PersonForm.propTypes = {
  addPerson: PropTypes.any,
  data: PropTypes.any
}

export default PersonForm

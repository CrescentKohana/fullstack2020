import React from 'react'
import PropTypes from 'prop-types'

const Persons = ({ persons, deletePerson }) => {
  return persons.map(person =>
    <p key={person.id}>
      {person.name} : {person.number} {' '}
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </p>
  )
}

Persons.propTypes = {
  persons: PropTypes.any,
  deletePerson: PropTypes.any
}

export default Persons

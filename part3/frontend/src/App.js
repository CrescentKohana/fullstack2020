import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {setPersons(initialPerson)})
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [message, setMessage] = useState('')

  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleFilterChange = (event) => { setFilter(event.target.value) }

  let personsFilter = persons
  if (filter) {
    personsFilter = persons.filter(p => filter.localeCompare(p.name, undefined, { sensitivity: 'accent' }) === 0)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName.trim(), number: newNumber.trim() }

    if (persons.some(p => p.name === personObject.name)) {
      const result = window.confirm(
        `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      )
      const id = persons.filter(e => e.name === personObject.name)[0].id

      if (result) {
        personService
          .updatePerson(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person))
            setMessage({ text: `Edited ${returnedPerson.name}`, type: 'success', })
            setTimeout(() => {setMessage(null)}, 3000)
          })
          .catch(e => {
            setMessage({ text: e.response.data.error, type: 'error' })
            setTimeout(() => {setMessage(null)}, 3000)
          })
      }
    } else {
      personService
        .createPerson(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({ text: `Added ${returnedPerson.name}`, type: 'success', })
          setTimeout(() => {setMessage(null)}, 3000)
        })
        .catch(e => {
          setMessage({ text: e.response.data.error, type: 'error' })
          setTimeout(() => {setMessage(null)}, 3000)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    if (persons.some(p => p === null)) {
      window.alert(`${id} has already been deleted`)
    } else {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage({ text: `Deleted ${id}`, type: 'success', })
          setTimeout(() => {setMessage(null)}, 3000)
        })
        .catch(e => {
          setMessage({ text: e.response.data.error, type: 'error' })
          setTimeout(() => {setMessage(null)}, 3000)
        })
    }
  }

  const addPersonData = { newName, newNumber, handleNameChange, handleNumberChange }

  return <div>
    <h2>Phonebook</h2>
    <Notification message={message} />
    <Filter value={filter} onChange={handleFilterChange} />

    <h2>Add a new person</h2>
    <PersonForm addPerson={addPerson} data={addPersonData} />

    <h2>Numbers</h2>
    <Persons persons={personsFilter} deletePerson={deletePerson} />
  </div>
}

export default App

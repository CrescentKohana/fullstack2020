import React from 'react'
import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.createAnecdote(content)
    props.setNotification(`Anecdote added: '${content}'`, 5)
  }

  return <form onSubmit={addAnecdote}>
    <input name='content'/> {' '}
    <button type='submit'>Create</button> 
  </form>
}

const mapDispatchToProps = { createAnecdote, setNotification }
const ConnectedAnecdoteForm = connect( 
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm

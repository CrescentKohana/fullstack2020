import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleClick }) => {
  return <li key={anecdote.id}>
    <button onClick={handleClick}>+</button> 
    {' '} {anecdote.content} {' '}
    <b>({anecdote.votes} votes)</b> 
  </li>
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    }

    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`Voted '${anecdote.content}'`, 5))
  }

  return <ul>
    {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote)} /> 
    )}
  </ul>
}

export default AnecdoteList

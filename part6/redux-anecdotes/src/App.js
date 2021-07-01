import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from "./components/Notification"
import Filter from './components/Filter'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {dispatch(initializeAnecdotes())}, [dispatch])

  return <div>
    <h2>Create new</h2>
    <Notification />
    <AnecdoteForm />
    <h2>Anecdotes</h2>
    <Filter />
    <AnecdoteList />
  </div>
  
}

export default App
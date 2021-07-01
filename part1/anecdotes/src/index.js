import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length))
  const [mostVoted, setMostVoted] = useState(0)

  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const nextAndecdote = () => setSelected(getRandomInt(0, props.anecdotes.length))

  const vote = () => {
    const votesCopy = [...votes]
    votesCopy[selected]++
    if (votesCopy[selected] > votesCopy[mostVoted]) {
      setMostVoted(selected)
    }
    setVotes(votesCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={props.anecdotes[selected]} votes={votes[selected]} />
      <button onClick={vote}>vote</button>
      <button onClick={nextAndecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={props.anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

const Anecdote = (props) => {
  const voteString = (props.votes == 1) ? "vote" : "votes"

  return [
    <p>{props.anecdotes}</p>,
    <p>has {props.votes} {voteString}</p>
  ]
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

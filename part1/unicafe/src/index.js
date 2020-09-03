import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <Feedback addGood={addGood} addNeutral={addNeutral} addBad={addBad}/>
      <Statistics feedback={{good:good, neutral:neutral, bad:bad}} />
    </div>
  )
}

const Feedback = (props) => {
  return [
    <h1>Give feedback</h1>,
    <Button text="Good" handleClick={props.addGood}/>,
    <Button text="Neutral" handleClick={props.addNeutral} />,
    <Button text="Bad" handleClick={props.addBad} />
  ]
}
const Statistics = ({feedback}) => {
  let allCount = feedback.good + feedback.neutral + feedback.bad

  if (allCount == 0) return (<p>No feedback given</p>)

  let average = (feedback.good + (feedback.bad * -1)) / allCount
  let positiveRatio = feedback.good / allCount * 100

  return (
    <div>
    <h1>Statistics</h1>
    <table>
      <tbody>
        <Statistic text="Good" value={feedback.good} />
        <Statistic text="Neutral" value={feedback.neutral} />
        <Statistic text="Bad" value={feedback.bad} />
        <Statistic text="All" value={allCount} />
        <Statistic text="Average" value={average} />
        <Statistic text="Positive" value={positiveRatio.toString() + " %"} />
      </tbody>
    </table>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr><td>{text}</td> <td>{value}</td></tr>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

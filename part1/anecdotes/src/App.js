import React, { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(7).fill(0))
  const [mostVoted, setMostVoted] = useState (0)
  if(points[selected] > points[mostVoted])
    setMostVoted(selected)

  const vote = () => {
    const copy = {...points}
    copy[selected] +=1
    setPoints(copy)
  }
  const randomSelected = () => {
    setSelected(Math.floor(Math.random()*7))
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      {anecdotes[selected]}
      <p>has {points[selected]} points</p>
      <Button handleClick={randomSelected} text='next anecdotes' />
      <Button handleClick={vote} text='vote' />
      <h1>Anecdotes with most votes</h1>
      {anecdotes[mostVoted]}
    </div>
  )
}

export default App
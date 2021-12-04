import React from 'react'
import {useState} from 'react'

const style ={
  border :"2px solid black",
  borderCollapse: "collapse",
  padding: "2px"
}

const StatisticsLine = (props) => 
  <tbody>
  <tr style ={style}>
    
    <td style = {style}>{props.text}</td>
    <td style = {style}>{props.value}</td>
    
  </tr>
  </tbody>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  if(props.good ===0 && props.neutral ===0 && props.bad===0)
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  return (
    <>
      <h2>statistics</h2>
      <table style ={style} >
      <StatisticsLine text="good" value={props.good} />
      <StatisticsLine text="neutral" value={props.neutral} />
      <StatisticsLine text="bad" value={props.bad} />
      <StatisticsLine text="all" value={props.total()} />
      <StatisticsLine text="average" value={props.average()} />
      <StatisticsLine text="positive" value={`${props.positive()}%`} /> 
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }

  const handleBadClick = () => {
    setBad(bad+1)
  }

  const total = () => good + neutral + bad

  const average = () => (good-bad)/total()
    
  const positive = () => (good/total())*100
 
  return (
    <div>
      <h2>give feedback</h2>
      
      <Button handleClick={handleGoodClick} text ="good" />
      <Button handleClick={handleNeutralClick} text = "neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics 
        good = {good} 
        neutral ={neutral} 
        bad={bad}
        total={total} 
        average= {average} 
        positive={positive}
      />

    </div>
  )
}

export default App;

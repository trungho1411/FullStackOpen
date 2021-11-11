import React from "react"


const Header = (props) => {
  return (
    <div>
      <h2>
        The name of the course is: {props.course}
      </h2>
    </div>
  )
}

const Content = ({part1, exercise1, part2, exercise2, part3, exercise3}) => {
  return(
    <div>
      <Part part={part1} exercise={exercise1}/>
      <Part part={part2} exercise={exercise2}/>
      <Part part={part3} exercise={exercise3}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        - Number of exercises:  {props.exercise1 + props.exercise2 + props.exercise3}
      </p>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}
const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercise1 = 10
  const part2 = "Using props to pass data"
  const exercise2 = 7
  const part3 = "State of a component"
  const exercise3 = 14

  return(
    <div>

      <Header course={course}/>
      <Content part1={part1} exercise1={exercise1} part2={part2} exercise2={exercise2} part3={part3} exercise3={exercise3}/>
      <Total exercise1={exercise1} exercise2={exercise2} exercise3={exercise3}/>
     
    </div>
  )
}
export default App

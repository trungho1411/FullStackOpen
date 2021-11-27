import React from "react"


const Header = props => 
      <h2>
        The name of the course is: {props.course}
      </h2>
   
const Part = props => 
      <li>
        {props.content.name}, {props.content.exercises}
      </li>

const Content = (props) => {
  return(
    <div>
      <p>- The contents of this course are: </p>
      <ul>        
          <Part content={props.content[0]}/>
          <Part content={props.content[1]}/>
          <Part content={props.content[2]}/>
         
      </ul>
    </div>
  )
}
const Total = props => 
      <p>
       - Number of exercises:  {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises} 
      </p>

const App = () => {
  const course = {
      name: "Half Stack application development",
      parts : [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
     name: "Using props to pass data",
     exercises: 7
    },
    {
     name: "State of a component",
     exercises: 14
    }
  ]
}
  
  return(
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}
export default App

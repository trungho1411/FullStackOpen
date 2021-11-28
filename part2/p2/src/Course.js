import React from "react"


const Header = props => 
      <h2>
        The name of the course is: {props.course}
      </h2>
   
const Part = props => 
      <li>
        {props.content.name} {props.content.exercises}
      </li>

const Content = (props) => {
  return(
    <div>
      <p>- The contents of this course are: </p>
      <ul>        
          {props.content.map(part => <Part key={part.id} content={part} />)
          }
      </ul>
    </div>
  )
}
const Total = (props) => {
    return (
        <div>
            <p><strong> - Total of {props.total.reduce((s,p) => s+p.exercises, 0)} exercises </strong></p>
        </div>
    )
    
}
        

      

const Course = ({course}) => {
  
  
  return(
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}
export default Course

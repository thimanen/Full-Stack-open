const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )

}

const Part = ({part}) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  )
}

const Content = ({course}) => {
  const parts = course.parts
  return (
    <ul>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </ul>
  )
}

const Total = (props) => {
  console.log('from Total')
  console.log(props.course)
  return (
    <p>Number of exercises {props.course.parts[0].exercises + 
      props.course.parts[1].exercises + 
      props.course.parts[2].exercises}</p>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
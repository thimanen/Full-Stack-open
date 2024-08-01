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

const Total = ({course}) => {
  const parts = course.parts
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => {
        return(
          sum + part.exercises
        )}, 0)
      } 
    </p>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App
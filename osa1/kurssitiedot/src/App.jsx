const Header = (props) => {
  console.log(props.course)
  return (
    <h1>
      {props.course.name}
    </h1>
  )

}

const Part = (props) => {
  console.log('from Part')
  console.log(props.part)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )

}

const Content = (props) => {
  console.log('from Content')
  console.log(props.course)
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    // <Content parts={parts} />
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App

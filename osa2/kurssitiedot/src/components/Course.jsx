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

  export default Course
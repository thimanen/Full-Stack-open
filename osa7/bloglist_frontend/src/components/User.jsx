import { useParams } from "react-router-dom"

const User = ({ users }) => {
  if (!users) {
    return null
  }

  const id = useParams().id
  const user = users.find((u) => u.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog, key) => {
          return <li key={key}>{blog.title}</li>
        })}
      </ul>
    </div>
  )
}

export default User

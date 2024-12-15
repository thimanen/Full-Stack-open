import { Link } from "react-router-dom"

const UsersView = ({ users }) => {
  if (!users) {
    return
  }

  const tableArray = users.map((row) => {
    return { name: row.name, id: row.id, blogs: row.blogs.length }
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {tableArray.map((val, key) => {
            return (
              <tr key={val.id}>
                <td>
                  <Link to={`/users/${val.id}`}>{val.name}</Link>
                </td>
                <td>{val.blogs}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UsersView

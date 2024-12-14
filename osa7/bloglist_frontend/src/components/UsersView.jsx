const UsersView = ({ users }) => {
  if (!users) {
    return
  }

  const tableArray = users.map((row) => {
    return { name: row.name, blogs: row.blogs.length }
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
              <tr key={key}>
                <td>{val.name}</td>
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

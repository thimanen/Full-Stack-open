import { ALL_AUTHORS } from './queries'
import { useQuery } from '@apollo/client'
import AuthorForm from './AuthorForm'

const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS, { pollInterval: 2000 })

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorForm authors={authors} />
    </div>
  )
}

export default Authors

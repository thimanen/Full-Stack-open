import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ME } from './queries'

const Recommend = ({ show, setPage, favouriteGenre }) => {
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })
  const user = useQuery(ME, { pollInterval: 2000 })

  if (!show) {
    return null
  }

  if (result.loading || user.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  let booksToShow = []
  booksToShow = books.filter((book) =>
    book.genres.includes(user.data.me.favoriteGenre),
  )

  return (
    <div>
      <h2>recommendations</h2>
      in genre <b>{user.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend

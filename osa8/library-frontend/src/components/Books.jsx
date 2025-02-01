import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from './queries'
import GenreSelection from './GenreSelection'

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })
  const [genreToShow, setGenreToShow] = useState('all')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  const genres = books.map((book) => book.genres)

  let booksToShow = []
  if (genreToShow === 'all') {
    booksToShow = books
  } else {
    booksToShow = books.filter((book) => book.genres.includes(genreToShow))
  }

  return (
    <div>
      <h2>books</h2>
      in genre <b>{genreToShow}</b>

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

      <div>
        <GenreSelection genres={genres} setGenreToShow={setGenreToShow} />
      </div>
    </div>
  )
}

export default Books

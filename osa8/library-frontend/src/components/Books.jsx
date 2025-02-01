import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, BOOKS_FOR_GENRE } from './queries'
import GenreSelection from './GenreSelection'

const Books = ({ show }) => {
  const [genreToShow, setGenreToShow] = useState('all')

  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })

  let genreResult = useQuery(BOOKS_FOR_GENRE, {
    pollInterval: 2000,
    variables: { genre: genreToShow },
  })

  if (!show) {
    return null
  }

  if (result.loading || genreResult.loading) {
    return <div>loading...</div>
  }

  if (genreToShow === 'all') genreResult = result

  const books = result.data.allBooks
  const genres = books.map((book) => book.genres)

  /*

  REACT-WAY OF SELECTING BOOKS BASED ON GENRE

  let booksToShow = []
  if (genreToShow === 'all') {
    booksToShow = books
  } else {
    booksToShow = books.filter((book) => book.genres.includes(genreToShow))
  }
  */

  const booksToShow = genreResult.data.allBooks

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

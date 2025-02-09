import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './components/queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  const LoggedInOutMenu = ({ token }) => {
    if (!token) {
      return <button onClick={() => setPage('login')}>login</button>
    } else {
      return (
        <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={logout}>logout</button>
        </>
      )
    }
  }

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`A new book added: ${addedBook.title}`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <LoggedInOutMenu token={token} />
      </div>

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} />
      <Recommend show={page === 'recommend'} setPage={setPage} />
    </div>
  )
}

export default App

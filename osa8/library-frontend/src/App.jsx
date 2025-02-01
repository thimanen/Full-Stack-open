import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient } from '@apollo/client'

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

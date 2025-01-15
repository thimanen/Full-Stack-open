import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'
import { useState } from 'react'
import { useMutation } from '@apollo/client'

const AuthorForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    const setBornTo = born
    changeBorn({ variables: { name, setBornTo } })
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>change birthyear</button>
      </form>
    </div>
  )
}

export default AuthorForm

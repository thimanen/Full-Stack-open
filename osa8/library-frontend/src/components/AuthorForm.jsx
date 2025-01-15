import { ALL_AUTHORS, EDIT_AUTHOR } from './queries'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

const AuthorForm = ({ authors }) => {
  const [selectName, setSelectName] = useState('')
  const [born, setBorn] = useState('')
  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    changeBorn({ variables: { name: selectName.value, setBornTo: born } })
    setBorn('')
    setSelectName('')
  }

  const options = authors.map(({ name }) => ({ value: name, label: name }))

  return (
    <div>
      <h2>set birthyear</h2>

      <form onSubmit={submit}>
        <Select
          onChange={setSelectName}
          options={options}
          placeholder={'select author'}
        />
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

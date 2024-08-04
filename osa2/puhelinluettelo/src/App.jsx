import { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
    { name: 'Hello Artas'}
  ]) 
  const [newName, setNewName] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName
    }

    if (persons.some(entry => entry.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(entryObject))
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
      </div>
      <h2>Numbers</h2>
        <ul>
          {persons.map(entry =>
            <Entry key={entry.name} entry={entry} />
          )}
        </ul>
    </div>
  )

}

export default App
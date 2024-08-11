import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newNameFilter, setNewNameFilter] = useState('')

  useEffect(() => {
    console.log('effect hook activated')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addEntry = (event) => {
    event.preventDefault()
    const entryObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(entry => entry.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .createEntry(entryObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewNameFilter(event.target.value)
    console.log(newNameFilter)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newNameFilter} handler={handleFilterChange} />
      
      <h2>add a new</h2>
      <PersonForm addEntry={addEntry} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} newNameFilter={newNameFilter} />
    </div>
  )

}

export default App
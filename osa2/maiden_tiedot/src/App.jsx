import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() => {
    console.log('effect hook activated')
    countryService
    .getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  return (
    <div>
      <Filter filter={nameFilter} setNameFilter={setNameFilter} />
      <Countries countries={countries} nameFilter={nameFilter} setNameFilter={setNameFilter} />
    </div>
  )
}

export default App
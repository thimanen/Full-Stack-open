import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

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
      <Filter filter={nameFilter} changeHandler={handleFilterChange} />
      <Countries countries={countries} />
    </div>
  )
}

export default App
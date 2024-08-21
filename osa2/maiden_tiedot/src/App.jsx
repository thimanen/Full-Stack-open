import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

  const [countries, setCountries] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [weatherCodes, setWeatherCodes] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    fetch('/weather_interpretation_codes.json')
    .then((response) => response.json())
    .then((data) => setWeatherCodes(data))
    .catch((error) => console.error('Error fetching weather codes:', error))
  }, [])

  if(!weatherCodes) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Filter filter={nameFilter} setNameFilter={setNameFilter} />
      <Countries countries={countries} nameFilter={nameFilter} setNameFilter={setNameFilter} weatherCodes={weatherCodes} />
    </div>
  )
}

export default App
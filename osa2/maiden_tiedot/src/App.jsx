import { useState, useEffect } from 'react'

const App = () => {

  const [countries, setCountries] = useState([])

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
      <p> Hello world</p>
    </div>
  )
}

export default App
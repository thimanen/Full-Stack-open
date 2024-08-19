import Country from './Country'

const Countries = ({countries, nameFilter}) => {
    if(nameFilter !== '') {
        const filteredCountries = countries.filter( (country) => country.name.common.toLowerCase().includes(nameFilter))
        let allData = false
        if (filteredCountries.length > 10) {
            return (
            <div>Too many matches, specify another filter</div>
            )
        } else {
            if (filteredCountries.length === 1)
                allData = true
            return (
                <ul>
                    {filteredCountries.map( (country) => (
                        <Country key={country.name.common} country={country} allData={allData} />)
                    )}
                </ul>)
        }
    }
}

export default Countries
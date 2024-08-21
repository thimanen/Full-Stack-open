import Weather from './Weather'

const Country = ({country, allData, handleShowCountry, weatherCodes}) => {

    if(allData === false) {
        return (
            <li>
                {country.name.common} <button onClick={() => handleShowCountry(country)}>show</button>
            </li>)
    } else {
        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h3>languages:</h3>
                <ul>
                    {Object.keys(country.languages).map((key, index) => (
                        <li key={index}>
                            {country.languages[key]}                        
                        </li>
                    ))}
                </ul>
                <h3>flag:</h3>
                <img src={`${country.flags.png}`} />
                <h3>Weather in {country.capital}:</h3>
                <Weather country={country} weatherCodes={weatherCodes} />
            </div>
            
        )
    }
}

export default Country
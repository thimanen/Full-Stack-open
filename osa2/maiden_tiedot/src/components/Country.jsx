const Country = ({country, allData}) => {
    if(allData === false) {
        return (
            <li>
                {country.name.common}
            </li>)
    } else {
        return (
            <div>
                <h2>{country.name.common}</h2>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <h3>languages:</h3>
                
                <img src={`${country.flags.png}`} />

            </div>
        )
    }
}

export default Country
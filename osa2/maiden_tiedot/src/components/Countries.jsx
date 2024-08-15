const Countries = ({countries, filter}) => {
    return(
        <ul>
            {countries.map( (country) => {
                    return (
                        <li>
                            {country.name.common}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Countries
import {useEffect, useState} from 'react'
import axios from 'axios'

const baseUrl ='https://api.open-meteo.com/v1/forecast?'
const weatherParams = '&current=temperature_2m,is_day,weather_code,wind_speed_10m&forecast_days=1'

const Weather = ({country, weatherCodes}) => {
    const [weatherData, setWeatherData] = useState('')
    const lat = country.capitalInfo.latlng[0]
    const long = country.capitalInfo.latlng[1]

    const weatherUrl = baseUrl + 'latitude=' + lat + '&longitude=' + long + weatherParams
       
    useEffect(() => {
        axios.get(`${weatherUrl}`)
        .then(response => {
            setWeatherData(response.data)
        })
    }, [])

    
    if (weatherData) {        
        return (
            <div>
                <p>Temperature: {weatherData.current.temperature_2m}{weatherData.current_units.temperature_2m} </p>
                <p>Description: {(weatherData.current.is_day) ? 
                    weatherCodes[weatherData.current.weather_code].day.description
                    : weatherCodes[weatherData.current.weather_code].night.description} </p>
                <img src={(weatherData.current.is_day) ? 
                    `${weatherCodes[weatherData.current.weather_code].day.image}`
                    : `${weatherCodes[weatherData.current.weather_code].night.image}`} />
                <p>Wind: {weatherData.current.wind_speed_10m}{weatherData.current_units.wind_speed_10m} </p>
         </div>
        )
    } else return (
        <div>
            weather data not available
        </div>
    )
}

export default Weather
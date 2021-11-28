import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'

const apiKey = process.env.REACT_APP_API_KEY

const CountryInfo = ({country}) => {
    const [weather, setWeather] = useState()
    useEffect(() =>{
        axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${apiKey}`)
        .then (response => {
            console.log(response.data)
            setWeather(response.data)     
        }
            )
    }, [country.name.common])
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3>Languagues</h3>
            <ul>
                {Object.keys(country.languages).map(p => (
                <li key={p}>{country.languages[p]}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt="" />
            {weather && <div>
                <h2>Weather in {country.name.common}</h2> 
                <p>{weather.weather[0].description}</p>
                <p><strong>temperature:</strong> {weather.main.temp} Farenheit</p>
                <p><strong>wind:</strong> {weather.wind.speed}</p>
            </div>}
        </div>
    )
}

export default CountryInfo
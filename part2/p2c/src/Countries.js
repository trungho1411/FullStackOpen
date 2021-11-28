import React from 'react'
import CountryInfo from './CountryInfo'
import ShowCountry from './ShowCountry'

const Countries = ({countries}) => {
    
   return (
    <>
        {(countries.length > 10) && <p>Too many matches, specify another filter</p>}
        {(countries.length > 1 && countries.length < 10) && countries.map(p => (
           <ShowCountry key={p.altSpellings} country = {p}/>
        ))}
        {(countries.length === 1) && 
        <CountryInfo country={countries[0]} />
        }
    </>
   )
}

export default Countries
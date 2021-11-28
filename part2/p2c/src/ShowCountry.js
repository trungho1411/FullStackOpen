import React from 'react'
import CountryInfo from './CountryInfo'
import { useState } from 'react'



const ShowCountry = ({country}) => {
    const [show, setShow] = useState(false)
    const handleShow = () => {
        setShow(!show)
    }

    return (
        <div>
            <p>{country.name.common}</p>
            <button onClick={handleShow}>show</button>
            {(show === true) && <CountryInfo country = {country}/>}
        </div>
    )
}

export default ShowCountry
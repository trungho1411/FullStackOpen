import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'
import Filter from './Filter'

import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log(response.data)
      setCountries(response.data.filter(p => p.name.common.toLowerCase().includes(find.toLowerCase())))
    })
  }, [find])

  const handleFind = (event) => {
    setFind(event.target.value)
  }
  
  return (
    <>
      <Filter find={find} handleFind={handleFind}/>
      <Countries countries={countries}/>
    </>
  )
  
}

export default App;

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Filter from './Filter';
import AddForm from './AddForm'
import Laptops from './Laptops'
import laptopService from './services/laptops'
import Notification from './Notification'

const App = () => {
  const [laptops, setLaptops] = useState([])
  const [newSeri, setNewSeri] = useState ('')
  const [newBrandName, setNewBrandName] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const laptopsFilter = laptops.filter(p =>(p.name.toLowerCase().includes(search.toLowerCase())))

  useEffect(() => {
    laptopService
    .getAll()
    .then(initialLaptops => {
      setLaptops(initialLaptops)
    })
    .catch(error => {
      console.log(error)
    })
  }, [])

  const handleBrandNameChange =(event) => {
    setNewBrandName(event.target.value)
  }
  const handleSeriChange =(event) => {
    setNewSeri(event.target.event)
  }
  const handleSearch =(event) => {
    setSearch(event.target.value)
  }
  const handleUpdate = (name) => {
    const laptop = laptops.find(p => p.name.toLowerCase() === name.trim().toLowerCase())
    const changedName = {...laptop, seri : newSeri}
    laptopService
    .update(laptop.id, changedName)
    .then(returnedLaptop => {
      setLaptops(laptops.map(p=> p.id !== laptop.id ? p : returnedLaptop))
    })
    .catch(error => {
      console.log(error)
      setErrorMessage(`${laptop.name} was already removed `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
  const addNewLaptops =(event) => {
    event.preventDefault()
    let flag = false
    const nameObject = {
      name : newBrandName,
      seri : newSeri
    }
    for(var i =0; i<laptops.length; i++){
      if(laptops[i].name.toLowerCase() === newBrandName.toLowerCase()){
        if(window.confirm(`${newBrandName} is already added to your wishlist, do you want to replace it ?`)){
          handleUpdate(newBrandName)
        }
        flag = true
      }
    }
    if(flag === false) {
      laptopService
      .create(nameObject)
      .then(returnedLaptop => {
        setLaptops(laptops.concat(returnedLaptop))
        setMessage(`Added ${newBrandName} to your wishlist`)
        setTimeout(()=> {
          setMessage(null)
        },5000)
      })
    }
    setNewBrandName('')
    setNewSeri('')
  }

  const handleDelete =(id, name) => {
    if(window.confirm(`Delete ${name} ?`)) {
      laptopService
      .remove(id)
      .then(setLaptops(laptops.filter(p => p.id !== id)))
      .catch(error => {
        console.log(error)
      })
    }
  }
  return (
    <div>
      <h1>Laptops Topic:</h1>
      <div>
        <Filter 
          search={search}
          handleSearch={handleSearch}
        />
      </div>
      <h2>Add laptop(s) to your wishlist:</h2>
      <div>
        <AddForm 
          newBrandName={newBrandName}
          newSeri={newSeri}
          handleBrandNameChange={handleBrandNameChange}
          handleSeriChange={handleSeriChange}
          addNewLaptops={addNewLaptops}
        />
      </div>
      <h2>Your Wish List</h2>
      <div>
        <Laptops 
        laptops={search.length>0 ? laptopsFilter : laptops}
        handleDelete={handleDelete}
        />
      </div>
      <Notification message={errorMessage} messageClass='error'/>
      <Notification message={message} messageClass='notification'/>
    </div>
  )
}

export default App;

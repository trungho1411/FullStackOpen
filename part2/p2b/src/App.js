
import React, {useState, useEffect} from 'react' 
import Filter from './Filter'
import PersonsForm from './PersonsForm';
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState ('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  const personsFilter = persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log(error)
    }
  )}, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange =(event) => {
    setNewNumber(event.target.value)
  }
  const handleSearch =(event) => {
    setSearch(event.target.value)
  }
  const handleUpdate = (name) => {
    const person = persons.find(n => n.name.toLowerCase() === name.trim().toLowerCase())
    const changedName = {...person, number: newNumber}
      personService
      .update(person.id, changedName)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
      .catch(error =>{
        console.log(error)
        setErrorMessage(
          `${person.name} with ${person.number} was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }
  const addName = (event) => {
    event.preventDefault()
    let flag = false
    const nameObject = {
      name :  newName,
      number: newNumber
    }
    for(var i=0; i<persons.length; i++){
      if(persons[i].name.toLowerCase() === newName.toLowerCase()){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          handleUpdate(newName)
        }
        flag = true
      } 
    }
    if (flag === false){
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(`Added ${newName}`)
        setTimeout(()=> {
          setMessage(null)
        },5000)
      })
    }
    
    setNewName('')
    setNewNumber('')

  }
  const handleDelete =(id, name) => {
    if(window.confirm(`delete ${name} ?`)) {
      personService
      .remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(error => {
        console.log(error)
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} messageClass='error'/>
      <Notification message={message} messageClass ='notification'/>
      <div>
        <Filter 
        search={search}
        handleSearch={handleSearch}
        />
      </div>
      <h3>Add a new</h3>
      <PersonsForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}/>
      <h2>Numbers</h2>
      <Persons persons={search.length>0 ? personsFilter : persons} handleDelete={handleDelete}/>
    </div>
  )
}



export default App;

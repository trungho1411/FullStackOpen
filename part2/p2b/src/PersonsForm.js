import React from 'react'

const PersonsForm = ({newName, newNumber, handleNameChange, handleNumberChange, addName}) => {
    return (
        <form onSubmit= {addName}>
            name:
            <input 
                type = 'text'
                onChange={handleNameChange}
                value={newName}
            />
            number: 
            <input
                type= 'text'
                onChange={handleNumberChange}
                value={newNumber}
            />
            <button type='submit'>ADD</button>
        </form>
    )

}

export default PersonsForm
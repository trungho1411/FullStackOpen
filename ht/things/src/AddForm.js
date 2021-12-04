import React from 'react'

const AddForm =({newSeri, newBrandName, handleSeriChange, handleBrandNameChange, addNewLaptops}) => {
    return (
        <div>
            <form onSubmit={addNewLaptops}>
                Name: 
                <input 
                    type = 'text'
                    onChange = {handleBrandNameChange}
                    value = {newBrandName}
                />
                Seri:
                <input 
                    type = 'text'
                    onChange =  {handleSeriChange}
                    value = {newSeri}
                />
                <button type ='submit'>ADD</button>
            </form>
        </div>
    )
}


export default AddForm
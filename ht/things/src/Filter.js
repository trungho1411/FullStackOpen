import React from 'react'

const Filter =({search, handleSearch}) => {
    return (
        <div>
            <p>You are looking for: </p>
            <input 
                type = 'text'
                onChange={handleSearch}
                value={search}
            />
        </div>
    )
}

export default Filter
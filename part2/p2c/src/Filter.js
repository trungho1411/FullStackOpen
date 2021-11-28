import React from 'react'

const Filter = ({find,handleFind}) => {
    return (
        <div>
            Find Countries
            <input 
            name='filter'
            onChange={handleFind}
            value={find}
            />
        </div>
    )
}

export default Filter
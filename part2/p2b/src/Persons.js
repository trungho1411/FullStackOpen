import React from 'react'



const Persons = ({persons, handleDelete}) => {
    return (
        <div>
            {persons.map(p=>(
                <div key={p.name}>
                    <p>{p.name} {p.number}</p>
                    <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
                </div>
            ))}
            
        </div>
    )

}
export default Persons  
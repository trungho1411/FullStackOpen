import React from 'react'

const Laptops = ({laptops, handleDelete}) => {
    return ( 
        <div>
            {laptops.map(p =>(
                <div key={p.name}>
                    <p>{p.name} {p.seri}</p>
                    <button onClick={() => handleDelete(p.id, p.name)}></button>
                </div>
            ))}
        </div>
    )
}

export default Laptops
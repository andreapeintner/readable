import React from 'react'

export default function Vote({ id, onClick }) {  
    return (
        <div>
            <button onClick={() => onClick(id, 1)}>+</button>
            <button onClick={() => onClick(id, -1)}>-</button> 
        </div>
    )
}

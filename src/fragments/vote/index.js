import React from 'react'

export default function Vote({ post, onClick }) {  
    return (
        <div>
            <button onClick={() => onClick(post, 1)}>+</button>
            <button onClick={() => onClick(post, -1)}>-</button> 
        </div>
    )
}
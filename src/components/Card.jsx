import React from 'react'

function Card(props) {
  return (
    <div className='bg-card rounded-md shadow-md shadow-black p-4'>
        {props.children}
    </div>
  )
}

export default Card;
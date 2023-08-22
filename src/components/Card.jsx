import React from 'react'

function Card(props) {
  return (
    <div className='bg-card rounded-md shadow-md shadow-black p-2 my-2'>
        {props.children}
    </div>
  )
}

export default Card;
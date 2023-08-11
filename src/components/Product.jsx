
import React from 'react'
import { PriceFormatter } from '../Utils/PriceFormatter';

function Product({ _id, name, price, description, category, imgURL }) {
    
    const formattedPrice = PriceFormatter(price);    
    
    return (
        <div _id={_id} category={category} className='mb-2 p-2 bg-card rounded-md shadow-md shadow-black'>
            <div>
                <h1 className='inline capitalize font-semibold'>{name}</h1>
                <p className='float-right price'>$ {formattedPrice}</p>
            </div>
            <div className='h-[35vh] w-full p-2'>
                <img className='shadow-md shadow-black mx-auto object-contain h-full' src={imgURL} />
            </div>
            <p className='capitalize text-gray-700'>{description}</p>
        </div>
    )
}

export default Product;
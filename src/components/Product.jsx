
import React from 'react'
import { PriceFormatter } from '../Utils/PriceFormatter';
import Card from './Card';

function Product({ _id, name, price, description, category, imgURL }) {
    
    const formattedPrice = PriceFormatter(price);    
    
    return (
        <Card _id={_id} category={category} >
            <div>
                <h1 className='inline capitalize font-semibold'>{name}</h1>
                <p className='float-right price'>$ {formattedPrice}</p>
            </div>
            <div className='h-[35vh] w-full p-2'>
                <img className='shadow-md shadow-black mx-auto object-contain h-full' src={imgURL} />
            </div>
            <p className='capitalize text-gray-700'>{description}</p>
        </Card>
    )
}

export default Product;
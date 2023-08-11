import React from 'react';
import logo from '../assets/Logo-Restorant.png'
const Main = () => {
    
    return (
        <div>
            <div className='bg-secondary min-h-[94vh] bg-image'>
                <div className='p-2 mx-auto h-48 w-48'>
                    <img src={logo} className='' />
                </div>
            </div>
        </div>
    )
}

export default React.memo(Main);
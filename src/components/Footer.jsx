import React from 'react';
import gitHubImg from '../icons/GitHub.svg'
import linkedInImg from '../icons/LinkedIn.svg'
import { NavLink } from 'react-router-dom';

const Footer = ({ user, setUnloggedUser }) => {

    const logout = () => {
        setUnloggedUser();
    }

    return (
        <footer className=''>
            <div className='bg-primary p-4'>
                {
                    user.isLogged ?
                        <button className="boton py-1 px-2 mr-2" onClick={logout}>Logout</button> :
                        <NavLink to="/login" className='boton' >Login</NavLink>
                }
            </div>
            <div className='flex flex-row bg-primary h-20 items-center'>
                <p className='text-color-light mx-2 text-sm md:text-base font-medium min-w-fit'>Desarrollado por A. Martin Alcaraz &copy; </p>
                <div className='flex flex-row justify-evenly w-full'>
                    <a href='https://github.com/MartinAlcaraz' target="_blank"><img className='h-8' src={gitHubImg} alt='GitHub' title='GitHub' /></a>
                    <a href='https://www.linkedin.com/in/angel-martin-alcaraz/' target="_blank"><img className='h-8' src={linkedInImg} alt='LinkedIn' title='LinkedIn' /></a>
                </div>
            </div>
        </footer>
    )
}

export default React.memo(Footer);
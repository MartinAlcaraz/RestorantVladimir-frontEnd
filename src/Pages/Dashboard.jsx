import React from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Layuot from '../components/Layout.jsx';

const Dashboard = () => {
    return (
        <Layuot>
            <Card>
                <h1 className='underline text-2xl text-center pb-4'>Dashboard</h1>
                <ul className=''>
                    <li className='p-2' >
                        <NavLink to="/addProduct" className='boton px-5 py-2 inline-block w-[50vw] ' >Agregar producto</NavLink>
                    </li>
                    <li className='p-2' >
                        <NavLink to="/addUser" className='boton px-5 py-2 inline-block w-[50vw]' >Agregar usuario</NavLink>
                    </li>
                    <li className='p-2' >
                        <NavLink to="/removeUser" className='boton px-5 py-2 inline-block w-[50vw]' >Eliminar usuario</NavLink>
                    </li>
                </ul>
            </Card>
        </Layuot>
    )
}

export default Dashboard;
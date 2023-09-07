
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useContext } from 'react';
import menuIcon from '../icons/Menu.svg';
import LensIcon from "../icons/LensIcon.jsx";
import CloseIcon from "../icons/CloseIcon.jsx";
import SettingIcon from "../icons/SettingIcon.jsx";

const NavBar = ({ toggleMenu, hideMenu, allPaths, user, onLine }) => {
    const [title, setTitle] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const navigate = useNavigate();
    const inputBuscadorRef = useRef();
    const location = useLocation();

    // const fetchCategories = async () => {
    //     const res = await UserServices.getCategories();
    //     setCategoryList(res.userCategories);
    // }

    // Obtiene el titulo desde el pathname
    useEffect(() => {
        if (location.pathname == '/') {
            setTitle("Home");
        } else {
            let path = location.pathname;

            if (allPaths.includes(path)) {
                setTitle(path.substring(path.lastIndexOf('/') + 1, path.length));
            } else {
                setTitle("");
            }
        }
    }, [allPaths, location.pathname]);

    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/search', { state: { searchProduct: inputBuscadorRef.current.value } });
        inputBuscadorRef.current.value = "";
    }

    // se copia el texto seleccionado de la lista de resultados en el input text
    // const setInputValue = (texto) => {
    //     inputRef.current.value = texto;
    //     inputRef.current.focus();
    // }

    useEffect(() => {
        setShowSearch(false);
        setShowForm(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const toggleIcon = () => {
        if (showSearch) {
            setTimeout(() => {
                setShowForm(false);
            }, 800);
        } else {
                setShowForm(true);
        }
        setShowSearch(!showSearch);
    }

    useEffect(()=>{
        if(showForm){
            inputBuscadorRef.current.focus();
        }
    }, [showForm]);

    return (
        <div onClick={hideMenu} className={(onLine ? "top-0" : "top-10") + " z-10 bg-primary fixed w-full flex items-center h-10"}>
            <button onClick={(e)=> {e.stopPropagation(); toggleMenu() }} className="z-20 basis-1/12 min-w-[30px]">
                <img src={menuIcon} className="p-1 text-gray-50" />
            </button>

            <div className="flex basis-11/12 justify-center items-center">
                <h1 className="ml-2 text-center text-color-light text-lg capitalize">{title}</h1>

                <div className={showSearch ? "w-full ml-4 transition-[width] duration-[900ms]" : "transition-[width] duration-[900ms] ml-4 w-0"}>
                    {
                        showForm &&
                        <form onSubmit={onSubmit}>
                            <input type="text" className="h-6 p-1 w-full rounded-sm" placeholder="Buscador" ref={inputBuscadorRef} />
                        </form>
                    }
                </div>

            </div>
            <button className="h-6 w-6 mx-2" onClick={toggleIcon}>
                {showSearch ?
                    <CloseIcon className="close-icon" /> :
                    <LensIcon className="lupa" />
                }
            </button>
            {
                user.isLogged ?
                    <NavLink to='/dashboard' className="mx-4">
                        <SettingIcon className="h-5 w-6 fill-[#F2E49B] active:w-4 active:mx-1 " />
                    </NavLink> :
                    <></>
            }
        </div>
    )
}

export default React.memo(NavBar);
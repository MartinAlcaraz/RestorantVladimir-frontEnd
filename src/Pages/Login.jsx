import React from "react";
import { useNavigate } from 'react-router-dom';
import ModalLoading from '../components/ModalLoading';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import useFetch from "../Utils/useFetch";

const Login = () => {

    const { setLoggedUser } = useContext(UserContext);
    const [errorMessage, loading, sendHttpRequest] = useFetch();

    // const { setLoggedUser } = useContext(UserContext);
    const { register, handleSubmit, setError, trigger, formState: { errors } } = useForm({ mode: 'onBlur' }); // mode: 'onBlur' checkea los errores on blur

    const navigate = useNavigate();

    // funcion que recibe las respuesta de la peticion
    function loginHandler(res, data) {
        console.log(res, data);
        if (res.status == 200) {
            setLoggedUser(data.data.user);
            navigate('/dashboard');
        } else {
            if (res.status == 401) {
                setError('password', { message: "Username or password invalid." });
            } else {
                navigate('/error');
            }
        }
    }

    //   SUBMIT   //
    const onsubmit = async (data, e) => {
        const formData = new FormData();
        formData.append("email",data.email);
        formData.append("password",data.password);

        sendHttpRequest('/api/auth/login/', "POST", formData, loginHandler);
    };

    if (errorMessage) {
        console.log("errorMessage"); console.log(errorMessage);
        navigate('/error');
    }

    return (
        <div className='p-8 min-h-[95vh] bg-secondary'>
            {
                loading ? <ModalLoading /> : <></>
            }

            <h2 className='mx-auto text-center text-2xl font-semibold'>Login</h2>

            <form onSubmit={handleSubmit(onsubmit)} className="my-4 mx-auto flex flex-col items-center">

                <input type='email' name="email" className="p-2 m-2 rounded-md" placeholder="E-mail" autoFocus={true} title="E-mail" autoComplete="on"
                    {...register('email', {
                        required: "Ingrese el e-mail del usuario.",
                        pattern: { value: /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/, message: "E-mail incorrecto." }
                    })}
                />
                {
                    errors.email ? <div className='font-medium text-error text-center h-10'>{errors.email.message}</div> : <div className='h-10'></div>
                }


                <input type='password' name="password" className="p-2 m-2 rounded-md" placeholder="Contraseña" title="Contraseña"
                    {...register('password', {
                        required: "Ingrese la contraseña.",
                        minLength: { value: 3, message: "Contraseña muy corta." },
                        maxLength: {value: 10, message: "La contraseña no puede tener mas de 10 caracteres."}
                    })}
                />
                {
                    errors.password ? <div className='font-medium text-error text-center h-10'>{errors.password.message}</div> : <div className='h-10'></div>
                }

                <input type="submit" className="boton px-4 py-2 rounded" value="Login" />
            </form>
        </div>
    )
}

export default Login;
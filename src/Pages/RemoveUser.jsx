import React, { useEffect, useState } from 'react';
import useFetch from '../Utils/useFetch';
import { useNavigate } from 'react-router-dom';
import ModalLoading from '../components/ModalLoading';
import { useForm } from 'react-hook-form';
import Layuot from '../components/Layout';
import Card from '../components/Card';
import ModalDelete from '../components/ModalDelete';
import useConfirm from '../Utils/useConfirm';
import ModalMessage from '../components/ModalMessage';

function RemoveUser({ user }) {

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalMessage, setShowModalMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [Dialog, confirmDelete] = useConfirm(
        'Eliminar usuario',
        'Esta seguro que desea eliminar el usuario ?'
    );

    const navigate = useNavigate();
    const { register, handleSubmit, reset, setError, trigger, getValues, formState: { errors, isValid } } = useForm({
        mode: "onChange"    // necesario para la propiedad isValid, para que compruebe si es valido el formulario en cada entrada al input
    });

    const getUsers = (res, data) => {
        setUsers(data.data.users);
    }

    const requestUsers = () => {
        sendHttpRequest("/api/users", "GET", null, getUsers);
    }

    useEffect(() => {
        requestUsers();
    }, []);

    // setea el email del usuario seleccionado en el input select
    const selectOnClick = (e) => {
        const arr = getValues("nombre").split(",");
        if (arr[1] == undefined) {
            setEmail("")
        } else {
            setEmail(arr[1]);
        }
    }

    const deleteUser = (res, data) => {

        if (res.status == 200) {
            setMessage("El usuario ha sido eliminado");
            setShowModalMessage(true);
            requestUsers();
        }else{
            setMessage("No fue posible eliminar el usuario");
            setShowModalMessage(true);
        }
    }

    // data.nombre.split(",")[0];  // id del usuario a eliminar
    // data.nombre.split(",")[1];  // mail del usuario a eliminar
    // data.nombre.split(",")[2];  // nombre del usuario a eliminar

    const onSubmit = async (data) => {
        setShowModalDelete(true);
        const confirm = await confirmDelete();  // promesa del hook useConfirm();

        let formData = new FormData();
        formData.append("userId", data.nombre.split(",")[0]);

        if (confirm) {
            sendHttpRequest("/api/users", "DELETE", formData, deleteUser);
            setShowModalDelete(false);
        } else {
            setShowModalDelete(false);
        }
    }

    // Error
    if (errorMessage) {
        navigate('/error');
    }
    // If user is not Admin
    if (!user.isAdmin) {
        return (
            <div className='bg-secondary min-h-[94vh] p-2' >
                <h2 className='underline p-2'>Eliminar Usuario</h2>
                <p className='p-2'>Solo el administrador puede eliminar un usuario.</p>
            </div>
        )
    }

    return (
        <Layuot>
            <Card>
                <h3 className='p-4 text-center underline text-lg font-medium'>Eliminar Usuario</h3>
                {loading && <ModalLoading />}
                {
                    // showModalDelete && <ModalDelete text={name} setShowModalDelete={setShowModalDelete} setResponse={setResponse}/>
                }
                {
                    showModalDelete && <Dialog />
                }
                {
                    showModalMessage && <ModalMessage setShowModalMessage={setShowModalMessage} message={message} />
                }

                <form className='p-2 pt-4' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='nombre'>Nombre: &nbsp;</label>
                    <select name="nombre" className='m-0 p-1 w-1/2 capitalize' onClick={selectOnClick}
                        {...register("nombre", { required: "Seleccione un usuario" })} >
                        <option value="" className='text-center'>...</option>
                        {
                            users.map((u, index) => {
                                return <option key={index} value={`${u._id},${u.email},${u.username}`} className='capitalize text-center'>{u.username}</option>
                            })
                        }
                    </select>
                    {errors.nombre ? <p className='text-error h-6'>{errors.nombre.message}</p> : <p className='h-6'></p>}

                    <br />
                    <label htmlFor='nombre'>E-mail: &nbsp;</label>
                    <input className='text-center' disabled value={email} title={email} />
                    <br />
                    <br />

                    <input type='submit' value="Eliminar" className='boton'></input>
                </form>
            </Card>
        </Layuot>
    )
}

export default RemoveUser;
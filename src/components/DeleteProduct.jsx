import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import Card from './Card';
import useFetch from '../Utils/useFetch';
import Loading from './Loading';
import useModalDialog from '../Utils/useModalDialog';
import useConfirmDelete from '../Utils/useConfirmDelete';
import ModalLoading from './ModalLoading';

function DeleteProduct({ isOpen, closeDelete, name, _id, refreshData }) {

    const [errorMessage, loading, sendHttpRequest] = useFetch();
    const [AcceptDialog, setModalDialog, acceptDialog] = useModalDialog();
    const [showAnswer, setShowAnswer] = useState(true);

    const [ConfirmDeleteDialog, confirmDelete] = useConfirmDelete('Eliminar producto', 'Esta seguro que desea eliminar el producto', name); // return a Component and a function

    const handleDelete = async (res, data) => {
        if (res.status == 200) {
            setModalDialog("Exito", "El producto se ha eliminado!", false);
        } else {
            setModalDialog("Error", "El producto no se ha eliminado!", true);
        }
        let accepted = await acceptDialog();
        if (accepted || !accepted) {
            closeDelete();
        }
        refreshData();
    }

    const deleteProduct = () => {
        sendHttpRequest('/api/products/' + _id, 'DELETE', null, handleDelete);
        setShowAnswer(false);   // se oculta la pregunta para mostrar la notificacion
    }

    if (errorMessage) {
        navigate('/error');
    }

    async function deleteProd() {
        const confirm = await confirmDelete();  // promesa del hook useConfirm();
        if (confirm) {
            deleteProduct();
        } else {
            closeDelete();
        }
    }
    useEffect(() => {
        deleteProd();
    }, []);

    return (
        <Modal isOpen={isOpen} close={closeDelete}>
            {
                loading && <ModalLoading />
            }

            { /* ConfirmDeleteDialog se muestra y oculta cuando se espera a confirmDelete() */
                showAnswer ?
                    < ConfirmDeleteDialog /> :
                    <AcceptDialog />
            }
        </Modal>
    )
}

export default DeleteProduct;
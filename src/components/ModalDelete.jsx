import { useState , useEffect} from "react";
import Card from "./Card";

const ModalDelete = ({ open, title, message, handleConfirm, handleCancel }) => {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    function Eliminar() {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            handleConfirm();
        }, 500);
    }

    function Cancelar() {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            handleCancel();
        }, 500);    // al desaparecer la ventana modal se elimina el componente del DOM

    }

    if (!open) {
        return;
    }

    return (
        <div className={"bg-black/50 fixed h-screen w-screen top-0 left-0 z-20 pt-[30vh] " + animacion}>
            <div className="m-auto w-3/4">
                <Card>
                    <h2 className="text-center capitalize font-bold">{title}</h2>
                    <p className="text-center p-4 mx-auto bg-primary border-primary ">{message}</p>
                    <div className="flex justify-around">
                        <button className="button-primary w-1/3 " onClick={Eliminar}>Si</button>
                        <button autoFocus className="button-primary w-1/3 " onClick={Cancelar}>No</button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default ModalDelete;
import { useState } from "react";

const ModalMessage = ({ setShowModalMessage, message }) => {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);
    
    function aceptar() {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            setShowModalMessage(false);
        }, 600);    // al desaparecer la ventana modal se elimina el componente del DOM
    }

    return (
        <div className={ "bg-black/50 fixed h-screen w-screen top-0 left-0 z-30 "+ animacion}>
            <div className="m-auto w-3/4 mt-[50%]">
                <p className="text-center p-4 mx-auto bg-green rounded-md shadow-md shadow-black">
                    <strong className="capitalize">{message}</strong>
                </p>
                <div className="w-full text-center">
                    <button className="mx-auto my-4 boton-blue py-2 w-2/5 rounded-md" onClick={aceptar}>Aceptar</button>
                </div>
            </div>
        </div>
    )
}

export default ModalMessage;
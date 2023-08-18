import React, { useEffect, useState } from "react";
import Card from "./Card";

const ModalMessage = ({ open, warning=false,  title, message, handleAccept }) => {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    function aceptar() {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            handleAccept();
        }, 500);    // al desaparecer la ventana modal se elimina el componente del DOM
    }

    console.log("open ",open);

    if (!open){
        return;
    }

    return (
        <div className={"bg-black/50 fixed h-screen w-screen top-0 left-0 z-30 " + animacion}>
            <div className="m-auto w-3/4 mt-[50%]">
                <Card>
                    <h2 className={` text-center capitalize font-bold`}>{title}</h2>
                    <p className = {(warning? 'bg-warning':'bg-green') +` text-center capitalize p-4 mx-auto rounded-md shadow-md shadow-black`}>
                        {message}
                    </p>
                    <div className="w-full text-center">
                        <button autoFocus className="mx-auto my-4 button-primary py-2 w-2/5 rounded-md" onClick={aceptar}>Aceptar</button>
                    </div>
                </Card>
            </div>
        </div >
    )
}

export default React.memo(ModalMessage);
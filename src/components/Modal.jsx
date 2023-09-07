import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '../icons/CloseIcon.jsx'


function Modal({ children, isOpen=false, close }) {
    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    if (!isOpen) {
        return null;
    }

    function closeEdit() {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            close();    // close() setea la variable isOpen en false;
        }, 600);   // animation-duration: 0.7s;
    }

    return createPortal(
        <div onClick={closeEdit} className="p-6 pt-1 pb-24 fixed top-10 left-0 w-full h-full z-30 overflow-y-auto bg-gray-700/50 scrollbar-hide">
            <div className={" " + animacion} onClick={(e) => e.stopPropagation()}>
                <button className="ml-auto block" onClick={closeEdit}><CloseIcon className="h-6 w-6" /></button>
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default Modal;
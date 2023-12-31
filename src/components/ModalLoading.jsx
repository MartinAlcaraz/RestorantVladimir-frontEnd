import { useState } from "react";
import Loading from "./Loading.jsx";

const ModalLoading = ()=> {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    return(
        <div className={ "bg-black/50 fixed h-screen w-screen top-0 left-0 z-30 pt-[30vh] "+ animacion}>
            <div className="m-auto w-3/4">
                <div >
                    <Loading/>
                    <p className="text-center text-xl text-gray-500">Loading...</p>
                </div>
            </div>
        </div>
    )
}

export default ModalLoading;
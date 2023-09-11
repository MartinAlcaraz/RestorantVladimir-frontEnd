import React, { useEffect, useState } from "react";
import Card from "./Card";
import Modal from "./Modal";

const ModalMessage = ({ open, warning = false, title, message, handleAccept }) => {

    return (
        <Modal isOpen={open} showClose={false} >
            <div className="m-auto w-3/4 mt-[30%]">
                <Card>
                    <h2 className={` text-center capitalize font-bold`}>{title}</h2>
                    <p className={(warning ? 'bg-warning' : 'bg-green') + ` text-center capitalize p-4 mx-auto rounded-md shadow-md shadow-black`}>
                        {message}
                    </p>
                    <div className="w-full text-center">
                        <button autoFocus className="mx-auto my-4 button-primary py-2 w-2/5 rounded-md" onClick={handleAccept}>Aceptar</button>
                    </div>
                </Card>
            </div>
        </Modal>
    )
}

export default React.memo(ModalMessage);
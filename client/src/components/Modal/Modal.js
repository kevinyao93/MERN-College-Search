import React from "react";
import ReactDOM from "react-dom";

import './Modal.css';

function Modal({showModal, toggle}) {

    return(
        <>
            <div className={showModal ? "overlay" : "hide"} onClick={toggle} />      
            <div className={showModal ? "modal" : "hide"}>
                <button onClick={toggle}>X</button>
                <h1>Modal heading</h1>
                <p>This is modal content</p>
            </div>
        </>
    );


}

export default Modal;
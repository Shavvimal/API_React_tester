import React, { useState } from 'react';
import {Home} from './pages';
import './styles/app.css';


function App(){

    const [ModalClose, setModalClose] = useState(false);

    const handleModalClose = () => {
        setModalClose(!ModalClose)
    }

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }


    return (
        <>
            <Home />

            {/* <Modal isItOpen={ModalClose} updateOpen={handleModalClose} /> */}

        </>
    )
}

export default App;

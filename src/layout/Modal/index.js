import React from 'react';

const Modal = (props) => {
    return (
        <div className={props.isItOpen ? 'hidden' : ''} class=" font-light  fixed w-full h-100 inset-0 overflow-hidden flex justify-center items-center"
            style={{ background: "rgba(0,0,0,.7)" }}>
            <div class="container border shadow m-1 w-96 rounded-xl  mx-4 bg-white  relative">
                <div class="container-content p-6">
                    <div class="flex justify-between items-center pb-1">
                        <p class="mb-2 font-semibold text-lg mb-4 ">Thanks for visiting!</p>
                        <div class="modal-close cursor-pointer" onClick={() => props.updateOpen()}>
                            <svg class="mb-1" width="18" height="18"
                                viewBox="0 0 18 18">
                                <path
                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <p> I'm still working on this portfolio site, so it is still unfinished and under construction. Feel free to take a look, but please come back soon to see updates!  </p> <p class="text-right mr-4"> <br></br>
                        Shav  </p>
                </div> </div> </div>
    );
}

export default Modal;

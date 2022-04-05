import React, { useEffect, useRef, useState } from 'react';
import './style.css'
import { Word } from '../';

const Button = ({text, onClickFun}) => {
    return (
        <>
            <button 
            onClick={onClickFun}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded-full"> 
            {text}
            </button>
     </>
    );
}

export default Button;

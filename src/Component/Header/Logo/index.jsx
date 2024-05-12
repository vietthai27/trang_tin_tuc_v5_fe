import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logo() {

    const navigate = useNavigate()

    return (
        <img
            onClick={() => navigate("/")}
            className='page-logo'
            alt='page-logo'
            src='/page-logo.png' />
    );
}

export default Logo;
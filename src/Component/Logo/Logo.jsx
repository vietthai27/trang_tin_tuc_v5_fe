import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logo() {

    const navigate = useNavigate()

    return (
        <div className='logo-container'>
            <img
                onClick={() => navigate("/")}
                className='page-logo'
                alt='page-logo'
                src='/logo-icon.png' /> 
            <h3 className='logo-text'>Chia tiền</h3>
        </div>
    );
}

export default Logo;
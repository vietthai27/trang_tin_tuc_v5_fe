import React from 'react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import UserManage from '../UserManage/UserManage';

function Header() {
    return (
        <div className='header-container'>
            <Logo />
            <Menu />
            <UserManage />
        </div>
    );
}

export default Header;
import React from 'react';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';
import UserManage from './UserManage/UserManage';
import DateTime from './DateTime/DateTime';

function Header() {
    return (
        <div className='header'>
            <Logo />
            <Menu />
            <DateTime/>
            <UserManage />
        </div>
    );
}

export default Header;
import React from 'react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import DateTime from '../DateTime/DateTime';
import UserManage from '../UserManage/UserManage';


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
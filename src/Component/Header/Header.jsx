import Logo from '../Logo/Logo';
import UserManage from '../UserManage/UserManage';

function Header() {
    return (
        <div className='header-container'>
            <Logo />
            <UserManage />
        </div>
    );
}

export default Header;
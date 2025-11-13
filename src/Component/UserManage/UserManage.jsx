import { Button, Modal } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserLogin from '../UserLogin/UserLogin';
import { useDispatch, useSelector } from 'react-redux';
import UserSignup from '../UserSignup/UserSignup';
import UserForgetPass from '../UserForgetPass/UserForgetPass';
import { closeModalLogin, closemodalForgetpass, closemodalResetpass, closemodalSignup, openModalLogin } from './reducer';
import UserManageList from '../UserManageList/UserManageList';
import UserSignupModal from '../UserSignup/UserSignupModal';
import UserResetPass from '../UserForgetPass/UserResetPass';

function UserManage() {

    const modalLogin = useSelector(state => state.userManage.modalLogin)
    const modalSignup = useSelector(state => state.userManage.modalSignup)
    const modalForgetpass = useSelector(state => state.userManage.modalForgetpass)
    const modalResetpass = useSelector(state => state.userManage.modalResetpass)
    const loginState = useSelector(state => state.app.loginState)
    const userSignupValidate = useSelector(state => state.userSignup.userSignupValidate)

    const dispatch = useDispatch()

    return (
        <div className='user_manage'>
            {!loginState ? (
                <div className='user_login'>
                    <Button
                        onClick={() => { dispatch(openModalLogin()) }}
                        className='login-btn'
                        variant="contained"
                        startIcon={<AccountCircleIcon />}>
                        Đăng nhập
                    </Button>
                </div>) : (<div style={{ "justify-content": "end" }} className='user_login'>
                    <UserManageList />
                </div>)}
            <Modal
                open={modalLogin}
                onClose={() => { dispatch(closeModalLogin()) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserLogin />
            </Modal>
            <Modal
                open={modalSignup}
                onClose={() => { dispatch(closemodalSignup()) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserSignup />
            </Modal>
            <Modal
                open={modalForgetpass}
                onClose={() => { dispatch(closemodalForgetpass()) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserForgetPass />
            </Modal>
            <Modal
                open={userSignupValidate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserSignupModal />
            </Modal>
            <Modal
                open={modalResetpass}
                onClose={() => { dispatch(closemodalResetpass()) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserResetPass />
            </Modal>
        </div>
    );
}

export default UserManage;
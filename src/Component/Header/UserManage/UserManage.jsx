import { Button, Modal } from '@mui/material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserLogin from './UserLogin/UserLogin';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalSignUp, closeModalLogin, openModalLogin, closeModalForgetpass } from './action';
import UserSignup from './UserSignup/UserSignup';
import UserForgetPass from './UserForgetPass/UserForgetPass';

function UserManage() {

    const dispatch = useDispatch()

    const modalLogin = useSelector(state =>
        state.userManageReducer.modalLogin
    )

    const modalSignup = useSelector(state =>
        state.userManageReducer.modalSignup
    )

    const modalForgetpass = useSelector(state =>
        state.userManageReducer.modalForgetpass
    )

    const handleOpenLogin = () => {
        dispatch(openModalLogin)
    }

    const handleCloseLogin = () => {
        dispatch(closeModalLogin)
    }

    const handleCloseSignup = () => {
        dispatch(closeModalSignUp)
    }

    const handleCloseForgetpass = () => {
        dispatch(closeModalForgetpass)
    }

    return (
        <div className='user_manage'>
            <p>Chưa có tài khoản ? </p>
            <Button
                onClick={() => handleOpenLogin()}
                className='login-btn'
                variant="contained"
                startIcon={<AccountCircleIcon />}>
                Đăng nhập
            </Button>
            <Modal
                open={modalLogin}
                onClose={() => handleCloseLogin()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserLogin />
            </Modal>
            <Modal
                open={modalSignup}
                onClose={() => handleCloseSignup()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserSignup />
            </Modal>
            <Modal
                open={modalForgetpass}
                onClose={() => handleCloseForgetpass()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <UserForgetPass />
            </Modal>
        </div>
    );
}

export default UserManage;
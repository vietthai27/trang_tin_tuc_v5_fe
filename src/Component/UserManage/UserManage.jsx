import { Button, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserLogin from '../UserLogin/UserLogin';
import { useDispatch, useSelector } from 'react-redux';
import UserSignup from '../UserSignup/UserSignup';
import UserForgetPass from '../UserForgetPass/UserForgetPass';
import { closeModalLogin, closemodalForgetpass, closemodalSignup, openModalLogin } from './reducer';
import UserManageList from '../UserManageList/UserManageList';
import { setLoginState } from '../UserLogin/reducer';

function UserManage() {


    const modalLogin = useSelector(state => state.userManage.modalLogin)
    const modalSignup = useSelector(state => state.userManage.modalSignup)
    const modalForgetpass = useSelector(state => state.userManage.modalForgetpass)
    const loginState = useSelector(state => state.userLogin.loginState)

    useEffect(() => {
        if (localStorage.getItem("User token") === null) {
            dispatch(setLoginState(false))
        } else dispatch(setLoginState(true))
    },[loginState])

    const dispatch = useDispatch()

    return (
        <div className='user_manage'>
            {!loginState ? (
                <div className='user_login'>
                    <p>Chưa có tài khoản ? </p>
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
        </div>
    );
}

export default UserManage;
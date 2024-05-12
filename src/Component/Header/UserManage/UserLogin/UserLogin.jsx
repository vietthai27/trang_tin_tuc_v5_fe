import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { boxStyleLogin } from '../../../../StyleConfig';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, changeUsername, closeModalLogin, openModalForgetpass, openModalSignup } from '../action';
import { userLogin } from './api';
import * as types from './constant'
import { userLoginRequest } from './action';

function UserLogin() {

    const dispatch = useDispatch()

    const handleOpenSignup = () => {
        dispatch(closeModalLogin)
        dispatch(openModalSignup)
    }

    const handleOpenForgetPass = () => {
        dispatch(openModalForgetpass)
    }

    const userData = useSelector(state =>
        state.userManageReducer.userData
    )

    return (
        <Box sx={boxStyleLogin}>
            <h1>Đăng nhập</h1>
            <TextField
                className='input'
                label="Tên người dùng"
                type="text"
                variant="standard"
                onChange={(e) => { dispatch(changeUsername(e.target.value)) }}
            />
            <TextField
                className='input'
                label="Mật khẩu"
                type="password"
                variant="standard"
                onChange={(e) => { dispatch(changePassword(e.target.value)) }}
            />
            <Button
                className='button'
                variant="contained"
                onClick={() => {
                    dispatch(userLoginRequest(userData))
                }}
            >Đăng nhập</Button>
            <div style={{ display: "flex", alignItems: "center" }}>Chưa có tài khoản ? &nbsp;  <Button onClick={() => handleOpenSignup()}> Đăng ký</Button></div>
            <Button onClick={() => handleOpenForgetPass()}>Quên mật khẩu</Button>
        </Box>
    );
}

export default UserLogin;
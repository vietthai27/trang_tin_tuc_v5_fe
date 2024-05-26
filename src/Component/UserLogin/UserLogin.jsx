import { Box, Button, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { boxStyleLogin } from '../../StyleConfig';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalLogin, openmodalForgetpass, openmodalSignup } from '../UserManage/reducer';
import { changePassword, changeUsername } from './reducer';
import { toast } from 'react-toastify';
import { userLoginAction } from './action';



function UserLogin() {

    const dispatch = useDispatch()
    const userData = useSelector(state => state.userLogin.userData)
    const loginState = useSelector(state => state.userLogin.loginState)

    useEffect(() => {
        if (loginState === true) {
            dispatch(closeModalLogin())
        }
    },[loginState, dispatch])

    const handleLogin = () => {
        if (userData.username === ""|| userData.username === null) {
            toast.warn("Chưa nhập tên người dùng")
        } else if (userData.password === ""|| userData.password === null) {
            toast.warn("Chưa nhập mật khẩu")
        } else {
            dispatch(userLoginAction(userData))
        }
    }

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
                onClick={handleLogin}
            >Đăng nhập</Button>
            <div
                style={{ display: "flex", alignItems: "center" }}>
                Chưa có tài khoản ?
                &nbsp;
                <Button onClick={() => { dispatch(openmodalSignup()) }}> Đăng ký</Button>
            </div>
            <Button onClick={() => { dispatch(openmodalForgetpass()) }}>Quên mật khẩu</Button>
        </Box>
    );
}

export default UserLogin;
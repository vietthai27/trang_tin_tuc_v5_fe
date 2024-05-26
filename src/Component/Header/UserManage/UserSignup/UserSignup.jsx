import React from 'react';
import { boxStyleLogin } from '../../../../StyleConfig';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux'
import { openModalLogin } from '../reducer';

function UserSignup() {

    const dispatch = useDispatch()

    return (
        <Box sx={boxStyleLogin}>
            <h1>Đăng ký</h1>
            <TextField
                className='input'
                label="Tên người dùng"
                type="text"
                variant="standard"
            //onChange={(e) => { userData.username = e.target.value }}
            />
            <TextField
                className='input'
                label="Email"
                type="text"
                variant="standard"
            //onChange={(e) => { userData.email = e.target.value }}
            />
            <TextField
                className='input'
                label="Mật khẩu"
                type="password"
                variant="standard"
            //onChange={(e) => { userData.password = e.target.value }}
            />
            <TextField
                className='input'
                label="Nhập lại mật khẩu"
                type="password"
                variant="standard"
            //onChange={(e) => { userData.retypePassword = e.target.value }}
            />
            <Button
            style={{margin:"20px"}}
                className='button'
                variant="contained"
            //onClick={() => { handelDangKy() }}
            >Đăng ký</Button>
            Đã có tài khoản ? <Button onClick={() => {dispatch(openModalLogin())}}>Đăng nhập</Button>
        </Box>
    );
}

export default UserSignup;
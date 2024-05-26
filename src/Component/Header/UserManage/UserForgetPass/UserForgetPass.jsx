import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { boxStyleLogin } from '../../../../StyleConfig';
import { openModalLogin } from '../reducer';
import { useDispatch } from 'react-redux';

function UserForgetPass() {

    const dispatch = useDispatch()

    return (
        <Box sx={boxStyleLogin}>
            <h1>Quên mật khẩu</h1>
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
            <Button
                //onClick={() => { handelResetPass() }} 
                className='button'
                variant="contained"
            >Reset mật khẩu</Button>
            <Button onClick={() => { dispatch(openModalLogin()) }}>Đăng nhập</Button>
        </Box>
    );
}

export default UserForgetPass;
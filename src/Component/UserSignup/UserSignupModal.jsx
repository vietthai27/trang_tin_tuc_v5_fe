import React from 'react';
import { boxStyleLogin } from '../../StyleConfig';
import { Box, Button, TextField } from '@mui/material';
import { changeValidateCodeSignup, setUserSignupValidate } from './reducer';
import { useDispatch, useSelector } from 'react-redux';
import { userSignupAction } from './action';
import { toast } from 'react-toastify';

function UserSignupModal() {

    const userDataSignup = useSelector(state => state.userSignup.userDataSignup)
    const dispatch = useDispatch()

const handleSignup = () => {
    if(userDataSignup.validateCode === '' || userDataSignup.validateCode === null) {
        toast.warning("Chưa nhập mã xác thực")
    } else dispatch(userSignupAction(userDataSignup))
}

    return (
        <Box sx={boxStyleLogin}>
            <h1>Xác thực email</h1>
            <TextField
                className='input'
                label="Mã xác thực"
                type="text"
                variant="standard"
                onChange={(e) => { dispatch(changeValidateCodeSignup(e.target.value)) }}
            />
            <Button
                style={{ margin: "20px" }}
                className='button'
                variant="contained"
               onClick={() => { handleSignup() }}
            >Gửi mã</Button>
            <Button
                style={{ margin: "0 20px" }}
                className='button'
                variant="contained"
                color='error'
               onClick={() => { dispatch(setUserSignupValidate(false)) }}
            >Hủy</Button>
        </Box>
    );
}

export default UserSignupModal;
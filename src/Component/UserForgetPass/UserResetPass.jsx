import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { boxStyleLogin } from '../../StyleConfig';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { changeNewPass, changeNewPassValidate, changeOldPass } from './reducer';
import { toast } from 'react-toastify';
import validator from 'validator';
import { userResetPassAction } from './action';

function UserResetPass() {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const userDataResetPass = useSelector(state => state.userForgetPass.userDataResetPass)

    const handelResetPass = () => {
        if (userDataResetPass.oldPassword === '' || userDataResetPass.oldPassword === null) {
            toast.warn("Chưa nhập mật khẩu cũ")
        } else if (userDataResetPass.newPassword === '' || userDataResetPass.newPassword === null) {
            toast.warn("Chưa nhập mật khẩu mới")
        } else if (!validator.isStrongPassword(userDataResetPass.newPassword)) {
            toast.warn("Mật khẩu mới phải có ít nhất 8 kí tự, 1 chữ thường, 1 chữ in hoa và 1 kí tự đặc biệt", { autoClose: 10000, })
        } else if (userDataResetPass.newPasswordValidate === '' || userDataResetPass.newPasswordValidate === null) {
            toast.warn("Chưa nhập mật khẩu mới xác thực")
        } else if (userDataResetPass.newPasswordValidate !== userDataResetPass.newPassword) {
            toast.warn("Hai mật khẩu chưa khớp")
        } else {
            dispatch(userResetPassAction(userDataResetPass))
        }
    }

    return (
        <Box sx={boxStyleLogin}>
            <h1>Đổi mật khẩu</h1>
            <TextField
                className='input'
                label="Mật khẩu cũ"
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                onChange={(e) => { dispatch(changeOldPass(e.target.value)) }}
                InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <TextField
                className='input'
                label="Mật khẩu mới"
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                onChange={(e) => { dispatch(changeNewPass(e.target.value)) }}
            />
            <TextField
                className='input'
                label="Xác thực mật khẩu mới"
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                onChange={(e) => { dispatch(changeNewPassValidate(e.target.value)) }}
            />
            <Button
                onClick={() => { handelResetPass() }}
                className='button'
                variant="contained"
            >Đổi lại mật khẩu</Button>
        </Box>
    );
}

export default UserResetPass;
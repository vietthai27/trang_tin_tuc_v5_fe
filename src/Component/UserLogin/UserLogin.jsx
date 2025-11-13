import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { boxStyleLogin } from '../../StyleConfig';
import { useDispatch, useSelector } from 'react-redux';
import { openmodalForgetpass, openmodalSignup } from '../UserManage/reducer';
import { changePassword, changeUsername } from './reducer';
import { toast } from 'react-toastify';
import { userLoginAction } from './action';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function UserLogin() {

    const dispatch = useDispatch()
    const userData = useSelector(state => state.userLogin.userData)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleLogin = () => {
        if (userData.username === "" || userData.username === null) {
            toast.warn("Chưa nhập tên người dùng")
        } else if (userData.password === "" || userData.password === null) {
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
                type={showPassword ? 'text' : 'password'}
                variant="standard"
                onChange={(e) => { dispatch(changePassword(e.target.value)) }}
                InputProps={{
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
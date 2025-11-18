import { useState } from 'react';
import { boxStyleLogin } from '../../StyleConfig';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { openModalLogin } from '../UserManage/reducer';
import { changeEmailSignup, changeFullNameSignup, changePasswordSignup, changeRetypePasswordSignup, changeUsernameSignup } from './reducer';
import { toast } from 'react-toastify';
import validator from 'validator';
import { userSignupRequestAction } from './action';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function UserSignup() {

  const dispatch = useDispatch()
  const userDataSignup = useSelector(state => state.userSignup.userDataSignup)
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleClickShowRetypePassword = () => setShowRetypePassword(!showRetypePassword);
  const handleMouseDownRetypePassword = () => setShowRetypePassword(!showRetypePassword);

  const handleSignup = () => {
    if (userDataSignup.username === "" || userDataSignup.username === null) {
      toast.warn("Chưa nhập tên người dùng")
    } else if (userDataSignup.username.length < 4) {
      toast.warn("Tên người dùng phải có ít nhất 4 kí tự")
    } else if (userDataSignup.fullName === "" || userDataSignup.fullName === null) {
      toast.warn("Chưa nhập họ và tên")
    } else if (userDataSignup.fullName.length < 4) {
      toast.warn("Họ và tên phải có ít nhất 4 kí tự")
    } else if (userDataSignup.email === "" || userDataSignup.email === null) {
      toast.warn("Chưa nhập email")
    } else if (!validator.isEmail(userDataSignup.email)) {
      toast.warn("Email không đúng định dạng")
    } else if (userDataSignup.password === "" || userDataSignup.password === null) {
      toast.warn("Chưa nhập mật khẩu")
    } else if (!validator.isStrongPassword(userDataSignup.password)) {
      toast.warn("Mật khẩu phải có ít nhất 8 kí tự, 1 chữ thường, 1 chữ in hoa và 1 kí tự đặc biệt", { autoClose: 10000, })
    } else if (userDataSignup.retypePassword === "" || userDataSignup.retypePassword === null) {
      toast.warn("Chưa nhập mật khẩu xác thực lần 2")
    } else if (userDataSignup.password !== userDataSignup.retypePassword) {
      toast.warn("Hai mật khẩu chưa khớp")
    } else {
      dispatch(userSignupRequestAction(userDataSignup))
    }
  }

  return (
    <Box sx={boxStyleLogin}>
      <h1>Đăng ký</h1>
      <TextField
        className='input'
        label="Tên người dùng"
        type="text"
        variant="standard"
        onChange={(e) => { dispatch(changeUsernameSignup(e.target.value)) }}
      />
       <TextField
        className='input'
        label="Họ và tên"
        type="text"
        variant="standard"
        onChange={(e) => { dispatch(changeFullNameSignup(e.target.value)) }}
      />
      <TextField
        className='input'
        label="Email"
        type="text"
        variant="standard"
        onChange={(e) => { dispatch(changeEmailSignup(e.target.value)) }}
      />
      <TextField
        className='input'
        label="Mật khẩu"
        type={showPassword ? 'text' : 'password'}
        variant="standard"
        onChange={(e) => { dispatch(changePasswordSignup(e.target.value)) }}
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
        label="Nhập lại mật khẩu"
        type={showRetypePassword ? 'text' : 'password'}
        variant="standard"
        onChange={(e) => { dispatch(changeRetypePasswordSignup(e.target.value)) }}
        InputProps={{ // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowRetypePassword}
                onMouseDown={handleMouseDownRetypePassword}
              >
                {showRetypePassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Button
        style={{ margin: "20px" }}
        className='button'
        variant="contained"
        onClick={() => { handleSignup() }}
      >Đăng ký</Button>
      Đã có tài khoản ? <Button onClick={() => { dispatch(openModalLogin()) }}>Đăng nhập</Button>
    </Box>
  );
}

export default UserSignup;
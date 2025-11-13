import { Box, Button, TextField } from '@mui/material';
import { boxStyleLogin } from '../../StyleConfig';
import { openModalLogin } from '../UserManage/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeEmailForgetPass, changeUsernameForgetPass } from './reducer';
import { toast } from 'react-toastify';
import validator from 'validator';
import { userForgetPassAction } from './action';

function UserForgetPass() {

    const dispatch = useDispatch()

    const userDataForgetPass = useSelector(state => state.userForgetPass.userDataForgetPass)

    const handelForgetPass = () => {
        if (userDataForgetPass.username === '' || userDataForgetPass.username === null) {
            toast.warn("Chưa nhập tên người dùng")
        } else if (userDataForgetPass.email === '' || userDataForgetPass.email === null) {
            toast.warn("Chưa nhập email")
        } else if (!validator.isEmail(userDataForgetPass.email)) {
            toast.warn("Email không đúng định dạng")
        } else {
            dispatch(userForgetPassAction(userDataForgetPass))
        }
    }

    return (
        <Box sx={boxStyleLogin}>
            <h1>Quên mật khẩu</h1>
            <TextField
                className='input'
                label="Tên người dùng"
                type="text"
                variant="standard"
                onChange={(e) => { dispatch(changeUsernameForgetPass(e.target.value)) }}
            />
            <TextField
                className='input'
                label="Email"
                type="text"
                variant="standard"
                onChange={(e) => { dispatch(changeEmailForgetPass(e.target.value)) }}
            />
            <Button
                onClick={() => { handelForgetPass() }}
                className='button'
                variant="contained"
            >Reset mật khẩu</Button>
            <Button onClick={() => { dispatch(openModalLogin()) }}>Đăng nhập</Button>
        </Box>
    );
}

export default UserForgetPass;
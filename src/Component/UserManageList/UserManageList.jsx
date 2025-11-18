import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../../rootReducer';
import { openmodalResetpass } from '../UserManage/reducer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { StyledMenu } from '../../StyleConfig';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function UserManageList() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleOpenUserList = () => {
        setAnchorEl(null);
        navigate("/user-list")
    };

    const handleOpenBankList = () => {
        setAnchorEl(null);
        navigate("/bank-list")
    };

    const handleOpenAccountList = () => {
        setAnchorEl(null);
        navigate("/account-list")
    };

    const handleOpenBill = () => {
        setAnchorEl(null);
        navigate("/bill")
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };

    const handelChangePass = () => {
        handleClose()
        dispatch(openmodalResetpass())
    }

    const dispatch = useDispatch()

    const currentUsername = useSelector(state => state.app.username)

    const handelLogout = () => {
        localStorage.removeItem("token")
        toast.success("Đăng xuất thành công");
        dispatch(setLoginState(false))
        handleClose()
        navigate("/")
    }

    const [hasAdmin, setHasAdmin] = React.useState(false)
    const [hasModer, setHasModer] = React.useState(false)

    const setRole = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodeToken = jwtDecode(token)
            const isAdmin = decodeToken.roles.find((item) => (item.authority === "ADMIN"))
            if (isAdmin) {
                setHasAdmin(true)
            }
            const isModer = decodeToken.roles.find((item) => (item.authority === "MODER"))
            if (isModer) {
                setHasModer(true)
            }
        }
    }

    React.useEffect(() => {
        setRole()
    }, [])

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                startIcon={<AccountCircleIcon />}
            >
                <p className='greeting'>Xin chào {currentUsername}</p>
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    hasAdmin ? <MenuItem onClick={handleOpenUserList} disableRipple>
                        <SupervisedUserCircleIcon />
                        Người dùng
                    </MenuItem> : null
                }
                {
                    hasModer || hasAdmin ? <MenuItem onClick={handleOpenBankList} disableRipple>
                        <AccountBalanceIcon />
                        Ngân hàng
                    </MenuItem> : null
                }
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => handleOpenBill()} disableRipple>
                    <AttachMoneyIcon />
                    Bill
                </MenuItem>
                <MenuItem onClick={() => handleOpenAccountList()} disableRipple>
                    <AccountBalanceWalletIcon />
                    Tài khoản
                </MenuItem>
                <MenuItem onClick={() => handelChangePass()} disableRipple>
                    <PasswordIcon />
                    Đổi mật khẩu
                </MenuItem>
                <MenuItem onClick={() => handelLogout()} disableRipple>
                    <LogoutIcon />
                    Đăng xuất
                </MenuItem>
            </StyledMenu>

        </div>
    );
}

export default UserManageList;
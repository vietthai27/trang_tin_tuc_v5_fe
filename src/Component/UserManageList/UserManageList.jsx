import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ListIcon from '@mui/icons-material/List';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from '../../rootReducer';
import { openmodalResetpass } from '../UserManage/reducer';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function UserManageList() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleOpenUserList = () => {
        setAnchorEl(null);
        navigate("/manageSystem")
    };

    const handleOpenMenuList = () => {
        setAnchorEl(null);
        navigate("/menuList")
    };

    const handleOpenNewsList = () => {
        setAnchorEl(null);
        navigate("/newsPaperList")
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
    },[])


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
                startIcon={<AccountCircleIcon />}>
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
                {hasModer || hasAdmin ? <MenuItem onClick={handleOpenUserList} disableRipple>
                    <SupervisedUserCircleIcon />
                    Quản lý hệ thống
                </MenuItem> : null}

                <Divider sx={{ my: 0.5 }} />
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
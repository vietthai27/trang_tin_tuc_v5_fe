import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import UserLogin from '../UserLogin/UserLogin';
import { useDispatch, useSelector } from 'react-redux';
import { closemodalForgetpass, closeModalLogin, closemodalResetpass, closemodalSignup, openModalLogin, openmodalResetpass, resetManagementList } from '../Header/reducer';
import { Divider, MenuItem } from '@mui/material';
import { getCategoryDataRequest, getManagementDataRequest } from './reducer';
import UserSignup from '../UserSignup/UserSignup';
import UserForgetPass from '../UserForgetPass/UserForgetPass';
import UserSignupModal from '../UserSignup/UserSignupModal';
import UserResetPass from '../UserForgetPass/UserResetPass';
import { setLoginState } from '../../App/rootReducer';
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemIcon from '@mui/material/ListItemIcon';
import LockResetIcon from '@mui/icons-material/LockReset';
import LogoutIcon from '@mui/icons-material/Logout';
import GoogleIcon from '../GoogleIcon/GoogleIcon';
import { useNavigate } from 'react-router-dom';

function Header() {

    const loginState = useSelector(state => state.app.loginState)
    const username = useSelector(state => state.app.username)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategoryDataRequest())
    }, [dispatch])

    useEffect(() => {
        if (loginState && username) {
            dispatch(getManagementDataRequest(username))
        }
    }, [loginState, username, dispatch])

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const modalSignup = useSelector(state => state.header.modalSignup)
    const modalForgetpass = useSelector(state => state.header.modalForgetpass)
    const modalResetpass = useSelector(state => state.header.modalResetpass)
    const userSignupValidate = useSelector(state => state.userSignup.userSignupValidate)
    const modalLogin = useSelector(state => state.header.modalLogin)

    const managementList = useSelector(state => state.header.managementList)
    const categoryList = useSelector(state => state.header.categoryList)

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(setLoginState(false))
        dispatch(resetManagementList())
        navigate("/")
        toast.success('Đăng xuất thành công')
    }

    const navigate = useNavigate()

    const handleNavigatePage = (id) => {
        navigate("/category-news/" + id)
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <NewspaperIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        onClick={() => {navigate("/")}}
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Trang Tin Tức
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {categoryList.map((page) => (
                                <MenuItem onClick={() => {handleNavigatePage(page.id)}} key={page.id} >
                                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <NewspaperIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                    onClick={() => {navigate("/")}}l
                        variant="h5"
                        noWrap
                        componenlt="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Trang Tin Tức
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {categoryList.map((page) => (
                            <Button
                                key={page.id}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                onClick={() => {handleNavigatePage(page.id)}}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* ----- */}
                    <Box sx={{ flexGrow: 0 }}>
                        {loginState ? (<Box>
                            <Tooltip title="Mở menu">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={username.toUpperCase()} src="/static/images/avatar/1.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {managementList.map((page) => (
                                    <MenuItem key={page.id} onClick={() => {navigate(page.path)}}>
                                        <ListItemIcon>
                                            <GoogleIcon name={page.icon} />
                                        </ListItemIcon>
                                        <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                                    </MenuItem>
                                ))}
                                <Divider sx={{ backgroundColor: 'black' }} />
                                <MenuItem
                                    onClick={() => {
                                        dispatch(openmodalResetpass())
                                        handleCloseUserMenu()
                                    }}
                                >
                                    <ListItemIcon>
                                        <LockResetIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Typography>Đổi mật khẩu</Typography>
                                </MenuItem>

                                <MenuItem
                                    onClick={() => {
                                        handleLogout()
                                        handleCloseUserMenu()
                                    }}
                                >
                                    <ListItemIcon>
                                        <LogoutIcon fontSize="small" />
                                    </ListItemIcon>
                                    <Typography>Đăng xuất</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>) : (<Box>
                            <Button
                                variant="text"
                                color="inherit"
                                onClick={() => dispatch(openModalLogin())}
                                startIcon={<AccountCircleIcon />}
                            >
                                Đăng nhập
                            </Button>
                            <Modal
                                open={modalLogin}
                                onClose={() => { dispatch(closeModalLogin()) }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box>
                                    <UserLogin />
                                </Box>
                            </Modal>
                            <Modal
                                open={modalSignup}
                                onClose={() => { dispatch(closemodalSignup()) }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box>
                                    <UserSignup />
                                </Box>
                            </Modal>
                            <Modal
                                open={modalForgetpass}
                                onClose={() => { dispatch(closemodalForgetpass()) }}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box>
                                    <UserForgetPass />
                                </Box>
                            </Modal>
                            <Modal
                                open={userSignupValidate}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box>
                                    <UserSignupModal />
                                </Box>
                            </Modal>
                        </Box>)}
                        <Modal
                            open={modalResetpass}
                            onClose={() => { dispatch(closemodalResetpass()) }}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box>
                                <UserResetPass />
                            </Box>
                        </Modal>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
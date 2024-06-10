import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuDataAction } from './action';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Modal } from '@mui/material';

function MenuBaiBao() {

    const dispatch = useDispatch()
    const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getMenuDataAction())
    }, [dispatch])

    return (
        <div className='menu-container'>
            <div
                className='menu-desktop'>
                {danhMucBaiBao.map((item) => (
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button className='menu-item' {...bindTrigger(popupState)}>
                                    {item.tenDanhMuc}
                                </Button>
                                <Menu  {...bindMenu(popupState)}>
                                    {
                                        item.danhMucCon.map((child) => (
                                            <MenuItem className='menu-item-child'
                                                onClick={popupState.close}
                                            >
                                                {child.tenDanhMucCon}
                                            </MenuItem>
                                        ))
                                    }
                                </Menu>
                            </React.Fragment>
                        )}
                    </PopupState>
                ))}
            </div>
            <Button onClick={handleOpen} className='menu-mobile-icon' endIcon={<MenuIcon />}></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <div
                        className='menu-mobile'>

                        {danhMucBaiBao.map((item) => (
                            <PopupState variant="popover" popupId="demo-popup-menu">
                                {(popupState) => (
                                    <React.Fragment>
                                        <Button className='menu-item' {...bindTrigger(popupState)}>
                                            {item.tenDanhMuc}
                                        </Button>
                                        <Menu  {...bindMenu(popupState)}>
                                            {
                                                item.danhMucCon.map((child) => (
                                                    <MenuItem className='menu-item-child'
                                                        onClick={popupState.close}
                                                    >
                                                        {child.tenDanhMucCon}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Menu>
                                    </React.Fragment>
                                )}
                            </PopupState>
                        ))}
                    </div>
                </Box>
            </Modal>

        </div>
    );
}

export default MenuBaiBao;
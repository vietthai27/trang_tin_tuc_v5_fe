import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuDataAction } from './action';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { MenuOutlined } from '@mui/icons-material';
import { Box, Drawer } from '@mui/material';

function MenuBaiBao() {

    const dispatch = useDispatch()
    const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)

    useEffect(() => {
        dispatch(getMenuDataAction())
    }, [dispatch])

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className='menu-container'>
            <div
                className='menu-desktop'>
                {danhMucBaiBao.map((item) => (
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <React.Fragment>
                                <Button className='menu-desktop-item' {...bindTrigger(popupState)}>
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
            <div
                className='menu-mobile'>
                <Button
                    onClick={toggleDrawer(true)}
                    className='menu-mobile-icon'
                    variant='contained'>
                    <MenuOutlined />
                </Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                            {danhMucBaiBao.map((text) => (
                                <div className='menu-mobile-item-container'>
                                    <b className='menu-mobile-item'>{text.tenDanhMuc}</b>
                                    <div className='menu-mobile-item-child-container'>
                                        {text.danhMucCon.map((item) => (
                                            <p className='menu-mobile-item-child'>{item.tenDanhMucCon}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                    </Box>
                </Drawer>
            </div>
        </div>
    );
}

export default MenuBaiBao;
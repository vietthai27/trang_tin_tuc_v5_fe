import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuDataAction } from './action';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { useNavigate } from 'react-router-dom';

function MenuBaiBao() {

    const dispatch = useDispatch()
    const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getMenuDataAction())
    }, [dispatch])

    return (
        <div
            className='menu-container'>
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
                                            onClick={() => {
                                                popupState.close();
                                                navigate(`/newsBySubmenu/${child.id}/${child.tenDanhMucCon}`);
                                            }}
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
    );
}

export default MenuBaiBao;
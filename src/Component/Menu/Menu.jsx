import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuDataAction } from './action';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { menuButton } from '../../StyleConfig';

function MenuBaiBao() {

    const dispatch = useDispatch()
    const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)

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
                                <Button style={menuButton} {...bindTrigger(popupState)}>
                                    {item.tenDanhMuc}
                                </Button>
                                <Menu  {...bindMenu(popupState)}>
                                    {
                                        item.danhMucCon.map((child) => (
                                            <MenuItem style={{
                                                width: "200px",
                                                fontSize: "16px",
                                                padding: "10px"
                                            }}
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
        </div>
    );
}

export default MenuBaiBao;
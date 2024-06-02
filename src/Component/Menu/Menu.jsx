import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMenuDataAction } from './action';


function Menu() {

    const dispatch = useDispatch()
    const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)

    useEffect(() => {
        
        dispatch(getMenuDataAction())
        
    }, [dispatch])

    return (
        <div className="menu">
            <div className="menu_list">
                {danhMucBaiBao.map((item) => (
                    <div className="parent_box" key={item.id}>
                        <p className="parent">{item.tenDanhMuc}</p>
                        <div className="child_box">
                            {item.danhMucCon.map((item) => (
                                <div className="child_contain" key={item.id}>
                                    <Link to={`/baibaoByDMC/${item.id}`}>
                                        <p className="child">{item.tenDanhMucCon}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
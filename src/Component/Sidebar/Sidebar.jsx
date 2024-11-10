import { Sidenav, Nav, Dropdown } from 'rsuite';
import TrendIcon from '@rsuite/icons/Trend';
import PeoplesIcon from '@rsuite/icons/Peoples';
import ListIcon from '@rsuite/icons/List';
import TextImageIcon from '@rsuite/icons/TextImage';
import FunnelTimeIcon from '@rsuite/icons/FunnelTime';
import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { changeTab } from './reducer';
import { changeSubMenuTitle } from '../../Pages/SubMenuListPage/redux';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const dispatch = useDispatch()

  const { tab } = useSelector(state => state.sideBar)
  const danhMucBaiBao = useSelector(state => state.menu.danhMucBaiBao)


  return (
    <div className='sidebar-container'>
      <Sidenav appearance='subtle' expanded={expanded} defaultOpenKeys={['3', '4']}>
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
        <Sidenav.Body>
          <Nav activeKey={tab} onSelect={(eventKey) => dispatch(changeTab(eventKey))}>
            <Nav.Item eventKey="0" icon={<TrendIcon />}>
              Báo cáo
            </Nav.Item>
            <Nav.Item eventKey="1" icon={<PeoplesIcon />}>
              Quản lý người dùng
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<ListIcon />}>
              Quản lý danh mục
            </Nav.Item>
            <Nav.Menu title="Quản lý danh mục con" icon={<FunnelTimeIcon />}>
              {danhMucBaiBao.map((item) => (<Nav.Item eventKey={"4-" + item.id} onClick={() =>{dispatch(changeSubMenuTitle(item.tenDanhMuc))}}>{item.tenDanhMuc} </Nav.Item>))}
            </Nav.Menu>
            <Nav.Item eventKey="3" icon={<TextImageIcon />}>
              Quản lý bài báo
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}

export default Sidebar
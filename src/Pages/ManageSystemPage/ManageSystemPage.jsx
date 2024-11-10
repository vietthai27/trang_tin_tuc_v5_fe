import { useSelector } from 'react-redux';
import Sidebar from '../../Component/Sidebar/Sidebar';
import UserList from '../UserListPage/UserList';
import MenuListPage from '../MenuListPage/MenuListPage';
import ReportPage from '../ReportPage/ReportPage';
import NewsListPage from '../NewsListPage/NewsListPage';
import SubMenuListPage from '../SubMenuListPage/SubMenuListPage';
import AddNewsListPage from '../NewsListPage/AddNewsListPage';
import EditNewsListPage from '../NewsListPage/EditNewsListPage';

const ManageSystemPage = () => {




  const { tab } = useSelector(state => state.sideBar)

  return (
    <div className='manage-system-container'>
      <Sidebar />
      {
        tab === '0' ? <ReportPage />
          : tab === '1' ? <UserList />
            : tab === '2' ? <MenuListPage />
              : tab === '3' ? <NewsListPage />
                : tab === '3-add' ? <AddNewsListPage />
                  : tab.includes('3-edit-') ? <EditNewsListPage idBaiBao={tab.slice(-1)}/>
                    : tab.includes('4-') ? <SubMenuListPage data={tab.slice(-1)} />
                      : null
      }
    </div>
  );
}

export default ManageSystemPage
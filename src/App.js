import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import '../src/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSessionRequest, setLoginState } from './rootReducer';
import Header from './Component/Header/Header';
import Loading from './Component/Loading/Loading'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './ProtectedRoute';
import BankListPage from './Pages/BankListPage/BankListPage';
import UserList from './Pages/UserListPage/UserList';

function App() {

  const dispatch = useDispatch()

  const loadingCount = useSelector(state => state.app.loadingCount)

  useEffect(() => {
    const currentSession = localStorage.getItem("token")
    if (currentSession === null) {
      dispatch(setLoginState(false))
    } else {
      dispatch(checkUserSessionRequest(currentSession))
    }
  }, [dispatch])

  return (
    <div className="app">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-body">
        <Routes>
          {routes.map((r, i) => (
            <Route key={i} path={r.path} element={r.element} />
          ))}
          <Route path="/bank-list" element={<ProtectedRoute role={["ADMIN", "MODER"]} element={<BankListPage />} />} />
          <Route path="/user-list" element={<ProtectedRoute role="ADMIN" element={<UserList />} />} />
        </Routes>
      </div>
      <ToastContainer />
      {loadingCount === 0 ? null : <Loading />}
    </div >
  );
}

export default App;

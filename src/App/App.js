import './AppStyle.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSessionRequest, setLoginState } from './rootReducer';
import Header from '../Components/Header/Header';
import Loading from '../Components/Loading/Loading'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { protectedRoutes, publicRoutes } from './Routes';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';

function App() {

  const dispatch = useDispatch()

  const loadingCount = useSelector(state => state.app.loadingCount)

  useEffect(() => {
    const currentSession = localStorage.getItem("token")
    if (currentSession) {
      dispatch(checkUserSessionRequest(currentSession))
    } else {
      dispatch(setLoginState(false))
    }
  }, [dispatch])

  return (
    <Box>
      <Header />
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: '100%', sm: '600px', md: '800px' },
          mx: 'auto',
          px: { xs: 2, sm: 2, md: 4, lg: 6 }
        }}
      >
        <Routes>
          {publicRoutes.map(r => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
          {protectedRoutes.map(r => (
            <Route
              key={r.path}
              element={<ProtectedRoute allowedRoles={r.roles} />}
            >
              <Route path={r.path} element={r.element} />
            </Route>
          ))}
        </Routes>
      </Box>
      <ToastContainer />
      {loadingCount === 0 ? null : <Loading />}
    </Box >
  );
}

export default App;

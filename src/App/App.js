import './AppStyle.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSessionRequest, setLoginState } from './rootReducer';
import Header from '../Components/Header/Header';
import Loading from '../Components/Loading/Loading'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Box } from '@mui/material';

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
      <ToastContainer />
      {loadingCount === 0 ? null : <Loading />}
    </Box >
  );
}

export default App;

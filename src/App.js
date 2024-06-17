import { Route, Routes } from 'react-router-dom';
import { routes, protectedRoutes } from './Routes';
import '../src/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  checkUserSessionRequest, setLoginState } from './rootReducer';
import Header from './Component/Header/Header';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import Loading from './Component/Loading/Loading'

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
        <Routes >
          {
            routes.map((element, index) => {
              return (
                <Route
                  path={element.path}
                  element={element.element}
                  key={index}
                />
              )
            })
          }
          <Route element={<ProtectedRoute />}>
          {
            protectedRoutes.map((element, index) => {
              return (
                <Route
                  path={element.path}
                  element={element.element}
                  key={index}
                />
              )
            })
          }
          </Route>
        </Routes>
      </div>
      <ToastContainer />
      {loadingCount === 0 ? null :  <Loading/> }
    </div >
  );
}

export default App;

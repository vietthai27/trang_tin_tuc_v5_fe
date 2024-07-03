import { Route, Routes } from 'react-router-dom';
import { routes, protectedRoutesAdmin, protectedRoutesModer } from './Routes';
import '../src/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSessionRequest, setLoginState } from './rootReducer';
import Header from './Component/Header/Header';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import Loading from './Component/Loading/Loading'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Component/Footer/Footer';

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
        <div className='app-component'>
          <Routes>
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
            <Route element={<ProtectedRoute role={"ADMIN"} />}>
              {
                protectedRoutesAdmin.map((element, index) => {
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
            <Route element={<ProtectedRoute role={"MODER"} />}>
              {
                protectedRoutesModer.map((element, index) => {
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
        <Footer />
      </div>
      <ToastContainer />
      {loadingCount === 0 ? null : <Loading />}
    </div >
  );
}

export default App;

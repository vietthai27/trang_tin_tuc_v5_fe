import { Route, Routes, useNavigate } from 'react-router-dom';
import routes from './Routes';
import '../src/style.css'
import Loading from './Component/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiCheckToken, apiUser, host } from './ultil';
import { setLoginState } from './Component/UserLogin/reducer';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const currentSession = localStorage.getItem("User token")
    if (currentSession !== null) {
      await axios.post(
        host + apiUser + apiCheckToken + "?token=" + localStorage.getItem("User token")).
        then().catch(err => toast.error(err.response.data.message));
      localStorage.removeItem("Username")
      localStorage.removeItem("User token")
      dispatch(setLoginState(false))
    } else return
  }

  return (
    <div className="App">
      <Routes >
        {
          routes.map((element, index) => {
            return (
              <Route
                path={element.path}
                element={element.element}
                key={index} />
            )
          })
        }
      </Routes>
      {/* {
        loadingMenu === true || loadingLogin === true ?
          (<Loading />) : (null)
      } */}
      <ToastContainer />
    </div>
  );
}

export default App;

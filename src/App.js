import { Route, Routes } from 'react-router-dom';
import routes from './Routes';
import '../src/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { apiCheckToken, apiUser, host } from './ultil';
import { setLoginState } from './Component/UserLogin/reducer';
import { useDispatch } from 'react-redux';

function App() {

  useEffect(() => {
    checkToken()
  }, [])

  const dispatch = useDispatch()

  const checkToken = async () => {
    if (localStorage.getItem("Is login") === "true") {
      await axios.post(
        host + apiUser + apiCheckToken + "?token=" + localStorage.getItem("User token")).then().catch(err => {
          localStorage.removeItem("Username")
          localStorage.removeItem("User token")
          localStorage.removeItem("Is login")
          dispatch(setLoginState(false))
          toast.error(err.response.data.message);
        })

    };
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
      <ToastContainer />
    </div>
  );
}

export default App;

import { Route, Routes } from 'react-router-dom';
import routes from './Routes';
import '../src/style.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState } from './rootReducer';
import { checkTokenAction } from './ultil';
import Loading from './Component/Loading/Loading';

function App() {

  const dispatch = useDispatch()

  const loading = useSelector(state => state.app.loading);

  useEffect(() => {
    const currentSession = localStorage.getItem("User token")
    if (currentSession === null) {
      dispatch(setLoginState(false))
    } else {
      dispatch(checkTokenAction(currentSession))
    }
  }, [])

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
      {
        loading === true ? (<Loading />) : null
      }
    </div>
  );
}

export default App;

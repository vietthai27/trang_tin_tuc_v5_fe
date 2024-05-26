import { Route, Routes } from 'react-router-dom';
import routes from './Routes';
import '../src/style.css'
import Loading from './Component/Loading/Loading';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const loadingMenu = useSelector(state => state.menu.loading)
  const loadingLogin = useSelector(state => state.userLogin.loading)
  console.log(loadingLogin);

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
      {
        loadingMenu === true || loadingLogin === true ? 
        (<Loading />) : (null)
      }
      <ToastContainer />
    </div>
  );
}

export default App;

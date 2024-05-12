import { Route, Routes } from 'react-router-dom';
import routes from './Routes';
import '../src/style.css'
import Loading from './Component/Loading';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { loading } = useSelector((reduxData) => reduxData.menuReducer)

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
        loading === true ? (<Loading />) : (null)
      }
      <ToastContainer />
    </div>
  );
}

export default App;

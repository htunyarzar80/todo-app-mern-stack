import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Todo from './components/Todo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <ToastContainer/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Todo/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

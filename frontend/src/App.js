import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateModal from './components/CreateModal';
import './index.css';


function App() {
  return (
    <>
     <ToastContainer/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Todo/>} />
      <Route path='/create' element={<CreateModal/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

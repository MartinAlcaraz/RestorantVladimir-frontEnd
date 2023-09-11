import ErrorBoundary from './components/ErrorBoundary';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Main from './Pages/Main';
import Dashboard from './Pages/Dashboard';
import ModalExpiredLoggin from './components/ModalExpiredLoggin';
import { useState, useContext, useEffect, useCallback } from 'react';
import { UserContext } from './context/UserContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import ModalMenu from './components/ModalMenu';
import Productos from './Pages/Productos';
import ErrorPage from './Pages/ErrorPage';
import Search from './Pages/Search';
import AddProduct from './Pages/AddProduct';
import AddUser from './Pages/AddUser';
import RemoveUser from './Pages/RemoveUser';

function App() {

  const { user, showModalExpiredLoggin, setShowModalExpiredLoggin, setUnloggedUser } = useContext(UserContext);
  const [onLine, setOnLine] = useState(true);
  const [classShowMessageOffLine, setClassShowMessageOffLine] = useState('hidden');
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [allPaths, setAllPaths] = useState([]);


  // OFFLINE Checker
  useEffect(() => {
    setOnLine(navigator.onLine);

    if (!navigator.onLine) {  // si está offline se muestra el mensaje
      setClassShowMessageOffLine('block');
    }

    if (navigator.onLine) { // si esta onLine se oculta el mensaje, si no, no se oculta.
      setTimeout(() => {
        setClassShowMessageOffLine('hidden');
      }, 3000);
    }
  }, [navigator.onLine]);

  const toggleMenu = () => {
    setShowModalMenu(!showModalMenu);
  }

  const hideMenu = () => {
    setShowModalMenu(false);
  }

  const allRoutes = (
    <Routes>
      <Route path='/' element={<Main user={user} setUnloggedUser={setUnloggedUser} />} />

      <Route path='/platos' element={<Productos categoria='platos' user={user} />} />
      <Route path='/bebidas' element={<Productos categoria='bebidas' user={user} />} />

      <Route path='/postres' element={<Productos categoria='postres' user={user} />} />

      <Route path='/search' element={<Search />} />

      <Route path='/login' element={<Login />} />

      <Route path="/error" element={<ErrorPage />} />

      <Route path='/*' element={<NotFound />} />

      <Route element={<ProtectedRoutes user={user} />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addProduct' element={<AddProduct />} />
        {/* <Route path='/editProduct' element={<EditProduct editmode={true}/>} /> */}
        <Route path='/addUser' element={<AddUser user={user} />} />
        <Route path='/removeUser' element={<RemoveUser user={user} />} />

      </Route>

    </Routes>);

  // se crea un array con las rutas creadas en Routes 
  useEffect(() => {
    let array = [];
    allRoutes.props.children.forEach(e => {
      if (e.props.path != "/*") {
        array.push(e.props.path);
      }
    });
    setAllPaths(array);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className='h-full w-full relative min-h-[98vh] bg-white sm:w-[540px] sm:mx-auto'>
          <div id="portal"></div>

          {showModalMenu ? <ModalMenu hideMenu={hideMenu} onLine={onLine} /> : <></>}

          {/* si expira la sesion se cierra la misma y se muestra el mensaje de cierre de sesion. */}
          {showModalExpiredLoggin ? <ModalExpiredLoggin setShowModalExpiredLoggin={setShowModalExpiredLoggin} /> : <></>}

          <div className={classShowMessageOffLine + " fixed top-0 left-0 w-full z-20"}>
            {
              onLine ?
                <div className='bg-green-400 text-gray-50 text-center p-2'> Online!!!</div>
                :
                <div className='bg-red-500 text-gray-50 font-medium p-2'>You are offline...</div>
            }
          </div>

          <NavBar toggleMenu={toggleMenu} hideMenu={hideMenu} allPaths={allPaths} user={user} onLine={onLine} />
          <div className='mt-10'>

            {allRoutes}  {/* rutas */}

            <Footer user={user} setUnloggedUser={setUnloggedUser} />
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App;

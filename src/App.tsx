import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import useUserStore from './states/user.state'
import Login from './pages/auth/Login'
import { Home } from './pages/home/Home'
import Register from './pages/auth/Register'

function App() {
  const { isLoggedIn } = useUserStore()


  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn ? <Home /> : <Login />} />
        <Route path='/login' element={isLoggedIn ? <Home /> : <Login />} />
        <Route path='/register' element={isLoggedIn ? <Home /> : <Register />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

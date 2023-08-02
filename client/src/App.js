import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar'
import Landing from './pages/Landing/Landing';
import Login from './pages/AuthTest/Login/Login'
import Register from './pages/AuthTest/Register/Register'
import AdminPanel from './pages/AdimPanel/AdminPanel';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="" element={<Landing/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/Register'element={<Register/>}/>
        <Route path='/AdminPanel'element={<AdminPanel/>}/>
      </Routes>

    </div>
  );
}

export default App;

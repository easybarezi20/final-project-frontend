import './App.css';
import { Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Home from './pages/Home'
import Explore from './pages/Explore'
import Post from './pages/Post'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Profile from './pages/Profile';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/post' element={<Post/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

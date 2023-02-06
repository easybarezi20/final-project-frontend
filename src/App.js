import './App.css';
import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './pages/Home'
import Explore from './pages/Explore'
import Post from './pages/Post'
import Login from './pages/Login'
import Signup from './pages/Signup';
import Profile from './pages/Profile';

import { reducer, initialState } from './reducers/userReducer'
import Footer from './components/Footer';
import UserProfile from './pages/UserProfile';


export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"))

    if(user){
      dispatch({type:"USER", payload:user})
      navigate('/')
    }else{
      navigate("/login")
    }
  },[])
  return(
      <Routes>
        <Route path='/profile/:id' element={<UserProfile/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/post' element={<Post/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
  )

}

function App() {
  const [ state, dispatch ] = useReducer(reducer,initialState)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <div className="App">
        <Routing/>
        <Footer/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
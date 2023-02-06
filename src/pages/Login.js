import React, {useState, useContext} from 'react'
import { UserContext } from '../App'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const {state, dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const testURL = "https://radiant-harbor-76606.herokuapp.com/user/signin"
    const deployURL = ""

    const loginAuth = () => {
        fetch(testURL, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              email:email,
              password:password
            })
        }).then(res => res.json())
        .then(data =>{
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            dispatch({type:"USER", payload:data.user})
            console.log(localStorage.getItem("jwt"));
            if(data.token === undefined){
              localStorage.clear()
              navigate('/login')
            }else{
              navigate('/')
            }
        })
        
          
        
    }

  return (
    <div className='signup'>
        <div className='signup-form'>
            <h2 className='home-title'>Finstagram</h2>
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              onClick={() => loginAuth()}
            >
                Login
            </button>
            <Link to='/signup' className='link-tag'>
                Signup
            </Link>
        </div>
    </div>
  )
}

export default Login
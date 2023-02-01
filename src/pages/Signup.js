import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState("")

    const testURL = "http://www.localhost:4000/user/signup"
    const deployURL = ""

    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            console.log("invalid email");
            return
        }
        fetch(testURL, {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                password:password,
                email:email
            })
        }).then(res => res.json())
        .then(data =>{
            console.log(data);
            navigate('/login')
        })
    }

  return (
    <div className='signup'>
        <div className='signup-form'>
            <h2 className='home-title'>Finstagram</h2>
            <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
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
                onClick={() => postData()}
            >
                Signup
            </button>
            <Link to='/login' className='link-tag'>
                Login
            </Link>
        </div>
    </div>
  )
}

export default Signup
import React, {useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate()
    const [ name, setName ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ image, setImage ] = useState("")
    const [ url, setURL ] = useState(undefined)

    const testURL = "http://www.localhost:4000/user/signup"
    const deployURL = ""

    useEffect(() =>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = () =>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "final-project")
        data.append("cloud_name", "dayu9uhsv")
        fetch("http://api.cloudinary.com/v1_1/dayu9uhsv/image/upload", {
            method:"POST",
            body:data
        })
        .then(res => res.json())
        .then(data => {
            setURL(data.url)
        })
        .catch(err => {
            console.log(err);
        }) 
    }
    const uploadFields = () => {
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
                email:email,
                pic:url
            })
        }).then(res => res.json())
        .then(data =>{
            console.log(data);
            navigate('/login')
        })
    }

    const postData = () => {
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
        
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
            <h3>Profile Image</h3>
            <input 
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
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
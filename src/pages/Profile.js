import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../App'
import './Profile.css'

function Profile() {
    const { state, dispatch } = useContext(UserContext)
    const [ myposts, setMyPosts ] = useState([])
    const [ image, setImage ] = useState("")
    const [ url, setURL ] = useState("")

    const updatePhoto = (file) =>{
        setImage(file) 
    }

    useEffect(() => {
        if(image){
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
                fetch("http://localhost:4000/getuser/updatepic",{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer " + localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res => res.json())
                .then(result =>{
                    console.log(result);
                    localStorage.setItem("user", JSON.stringify({...state, pic:result.pic}))
                    dispatch({type:"UPDATEPIC", payload:result.pic})
                })
            })
            .catch(err => {
                console.log(err);
            }) 
            }
    },[image])


    useEffect(() => {
        fetch("http://localhost:4000/posts/mypost",{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result.mypost);
            setMyPosts(result.mypost)
        })
    },[])
    // const objLen = Object.keys(myposts).length
  return (
    <div className='profile'>
        <div className='username'>
            {state != null ? state.name : "Loading"}
        </div>
        <div className='information-box'>
            <div className='profile-image'>
                <img src={state ? state.pic : "loading"} className='image'/>
            </div>
            <div>
                <p>{myposts.length}</p>
                Posts
            </div>
            <div>
                <p>{state.followers != undefined && null ?state.followers.length : "0"}</p>
                Followers
            </div>
            <div>
                <p>{state.following != undefined && null ?state.following.length : "0"}</p>
                Following
            </div>
        </div>
        <div className='profile-buttons'>
                <input
                    type="file"
                    onChange={(e) => updatePhoto(e.target.files[0])}
                />
                
        </div>
        <div className='posts'>
            {
                myposts.map(item => {
                    return(
                        <div className='posts-container'>
                            <img key={item._id} src={item.photo} className="posts-photo" alt={item.title}/>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Profile
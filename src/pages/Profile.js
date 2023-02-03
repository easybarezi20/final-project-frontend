import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import './Profile.css'

function Profile() {
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()
    const [ myposts, setMyPosts ] = useState([])

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
            {state.name}
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
                <p>{state?state.followers.length : "0"}</p>
                Followers
            </div>
            <div>
                <p>{state?state.following.length : "0"}</p>
                Following
            </div>
        </div>
        <div className='profile-buttons'>
                <button
                    
                >
                    Edit Profile
                </button>
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
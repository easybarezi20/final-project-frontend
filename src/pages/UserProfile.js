import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../App'
import './Profile.css'

function UserProfile() {
    const { state, dispatch } = useContext(UserContext)
    const [ userProfile, setUserProfile ] = useState(null)
    const { id } = useParams()
    const [ showFollow, setShowFollow ] = useState(state? !state.following.includes(id) : true)
    useEffect(() => {
        fetch(`http://localhost:4000/getuser/user/${id}`,{
            method:"GET",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(result => {
            
            setUserProfile(result)
        })
    },[])

    const followUser = () => {
        fetch('http://localhost:4000/getuser/follow',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId: id,
            })   
        }).then(res => res.json())
        .then(data => {
            
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setUserProfile(prevState =>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }
    const unfollowUser = () => {
        fetch('http://localhost:4000/getuser/unfollow',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId: id,
            })   
        }).then(res => res.json())
        .then(data => {
            
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data)) 
            setUserProfile(prevState =>{
                const newFollower = prevState.user.followers.filter(item => item !== data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
        })
    }
    console.log(showFollow);
  return (
    <>
    {
        userProfile ? 
        <div className='profile'>
        <div className='username'>
            {userProfile.user.name}
        </div>
        <div className='information-box'>
            <div className='profile-image'>
                <img src={userProfile.user.pic} className='image'/>
            </div>
            <div>
                <p>{userProfile.posts.length}</p>
                Posts
            </div>
            <div>
                <p>{userProfile.user.followers.length}</p>
                Followers
            </div>
            <div>
                <p>{userProfile.user.following.length}</p>
                Following
            </div>
        </div>
        <div>
            {showFollow ?
                <button
                    onClick={() => followUser()}
                    className="follow-button"
                >
                    Follow
                </button>
                :
                <button
                    onClick={() => unfollowUser()}
                    className="follow-button"
                >
                    Unfollow
                </button>
                }
        </div>
        <div className='posts'>
            {
                userProfile.posts.map(item => {
                    return(
                        <div className='posts-container'>
                            <img key={item._id} src={item.photo} className="posts-photo" alt={item.title}/>
                        </div>
                    )
                })
            }
        </div>
        </div>
        :
        <h2>Loading.....</h2>
    }
    </>
  )
}

export default UserProfile
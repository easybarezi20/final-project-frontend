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

  return (
    <div className='profile'>
        <div className='username'>
            {state.name}
        </div>
        <div className='information-box'>
            <div className='profile-image'>
                <img src='https://images.squarespace-cdn.com/content/v1/53ed0e3ce4b0c296acaeae80/1584577511464-8FDZYWQVXUI1OBS4VTZP/Bonneville14082-Edit-DHWEB%2BNick%2BFerguson%2BDenver%2BBroncos%2BHeadshot%2BPhotography%2Bby%2BAaron%2BLucy%2BDenver%2BColorado%2BHeadshots%2BPhotographer.jpg?format=2500w' className='image'/>
            </div>
            <div>
                Posts
            </div>
            <div>
                Followers
            </div>
            <div>
                Following
            </div>
        </div>
        <div className='profile-buttons'>
                <button
                    onClick={() => {
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        navigate('/login')
                    }}
                >
                    Logout
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
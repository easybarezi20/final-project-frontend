import React,{ useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'

import './Explore.css'

function Explore() {
    const [ posts, setPosts ] = useState([])
    const {state, dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch('https://radiant-harbor-76606.herokuapp.com/posts/allpost',{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setPosts(result.posts)
        })
    },[])


  return (
    <div className='home'>
    <div className='home-title'>
        <p>Explore</p>
    </div>
    <div className='explore-content'>
        {
            posts.map((item) =>{
                return(
                    <div key={item._id} className="content-container">
                        <img src={item.photo} className="image-photo-explore"/>
                    </div>
                )
            })
        }
    </div>
</div>
  )
}

export default Explore
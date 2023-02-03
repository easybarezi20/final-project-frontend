import React,{ useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import './Home.css'


function Home() {
    const [ posts, setPosts ] = useState([])
    const {state, dispatch} = useContext(UserContext)

    const getFollowingPosts = () => {
        fetch('http://localhost:4000/posts/getfollowpost',{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result);
            setPosts(result.posts)
        })
    }
    const getAllPosts = () => {
        fetch('http://localhost:4000/posts/allpost',{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            setPosts(result.posts)
        })
    }

    const likePost = (id) =>{
        fetch("http://localhost:4000/posts/like",{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            const newData = posts.map(item =>{
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setPosts(newData)
        }).catch(err => {
            console.log(err);
        })
    }
    const unlikePost = (id) =>{
        fetch("http://localhost:4000/posts/unlike",{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
        .then(result => {
            // console.log(result);
            const newData = posts.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setPosts(newData)
        }).catch(err => {
            console.log(err);
        })
    }

    const makeComment = (text, postId) => {
        fetch("http://localhost:4000/posts/comment",{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res => res.json())
        .then(result => {
            console.log(result)
            const newData = posts.map(item => {
                if(item._id == result._id){
                    return result
                }else{
                    return item
                }
            })
            setPosts(newData)
        }).catch(err => {
            console.log(err);
        })
    }

    const deletePost = (postId) => {
        fetch(`http://localhost:4000/posts/deletepost/${postId}`,{
            method:"DELETE",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
            }).then(res => res.json())
            .then(result =>{
                console.log(result)
                const newData = posts.filter(item =>{
                    return item._id !== result._id

                })
                setPosts(newData)
        })
    }
    console.log(state);
    useEffect(() => {
        if(state.following.length === 0 && state != null){
            getAllPosts()
        }else{
            getFollowingPosts()
        }
    },[])
  return (
    <div className='home'>
        <div className='home-title'>
            <p>Finstagram</p>
        </div>
        <div className='home-content'>
            {
                posts.map((item) =>{
                    return(
                        <div key={item._id}>
                            <div className='home-header'>
                                <div>
                                <h4>Title: {item.title} </h4>
                                </div>
                                {item.postedBy._id == state._id
                                && 
                                <div className='delete-button'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/542/542724.png'
                                    className='icon-image icons'
                                    onClick={() => deletePost(item._id)}
                                    />  
                                </div>
                                }
                            </div>
                            <img src={item.photo} className="image-photo"/>
                            <div className='icons'>
                                {item.likes.includes(state._id)
                                ?
                                    <img src='https://cdn-icons-png.flaticon.com/512/1634/1634070.png'
                                    className='icon-image'
                                    onClick={() => {
                                        unlikePost(item._id) 
                                    }}
                                    />
                                :
                                    <img src='https://cdn-icons-png.flaticon.com/512/4477/4477657.png'
                                    className='icon-image'
                                    onClick={() => {
                                        likePost(item._id) 
                                    }}
                                    />
                                }
                            </div>
                            <h5>{item.likes.length} likes</h5>
                            <h4>
                                <Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : "/profile"}>
                                    {item.postedBy.name}
                                </Link>
                                
                                :
                                 {item.body}</h4>
                            {
                                item.comments.map(comment =>{
                                    return(
                                        <h6>{comment.postedBy.name}- {comment.text}</h6>
                                    )
                                })
                            }
                            <form onSubmit={(e) =>{
                                e.preventDefault()
                                makeComment(e.target[0].value, item._id);
                            }}>
                                <input type="text" placeholder='add a comment'/>
                            </form>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home
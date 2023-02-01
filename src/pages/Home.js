import React,{ useState, useEffect } from 'react'
import './Home.css'


function Home() {
    const [ posts, setPosts ] = useState([])
    useEffect(() => {
        fetch('http://localhost:4000/posts/allpost',{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
        .then(result => {
            // console.log(result);
            setPosts(result.posts)
        })
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
                            <h4>Title: {item.title}</h4>
                            <img src={item.photo} className="image-photo"/>
                            <div className='icons'>
                                <img src='https://cdn-icons-png.flaticon.com/512/1077/1077086.png'
                                className='icon-image'
                                />
                            </div>
                            <h4>{item.postedBy.name}: {item.body}</h4>
                            <input type="text" placeholder='add a comment'/>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Home
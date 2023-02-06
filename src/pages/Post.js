import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Post.css'


function Post() {
    const navigate = useNavigate()
    const [ title, setTitle ] = useState("")
    const [ body, setBody ] = useState("")
    const [ image, setImage ] = useState("")
    const [ url, setURL ] = useState("")
    
    const postDetails = () => {
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
    useEffect(() => {
        if(url){
            fetch('https://radiant-harbor-76606.herokuapp.com/posts/createpost',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:url,
                })
            }).then(res => res.json())
            .then(data =>{
                console.log(data);
                navigate('/')
            })
        }
    }, [url])
  return (
    <div className='post'>
        <div className='post-container'>
            <h3>Title</h3>
            <input
                type='text'
                placeholder="Type here"
                className='create-post-input'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <h3>Caption</h3>
            <input 
                type='text'
                placeholder="Type here"
                className='create-post-input caption'
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <h3>Image</h3>
            <input 
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button 
                onClick={() => postDetails()}
            >
                Submit Post
            </button>
        </div>
    </div>
  )
}

export default Post
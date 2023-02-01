import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Post.css'


function Post() {
    const navigate = useNavigate()
    const [ title, setTitle ] = useState("")
    const [ body, setBody ] = useState("")
    const [ image, setImage ] = useState("")
    const [ url, setURL ] = useState("")
    useEffect(() => {
        if(url){
            fetch('http://localhost:4000/posts/createpost',{
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
  return (
    <div className='post'>
        <div className='post-container'>
            <input
                type='text'
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input 
                type='text'
                placeholder="caption"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <input 
                type='file'
                onChange={(e) => setImage(e.target.files[0])}
            />
            <div>
                <input type="text"/>
            </div>
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
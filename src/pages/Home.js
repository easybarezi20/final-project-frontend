import React from 'react'
import './Home.css'
import { useState, useEffect } from 'react'

function Home() {
    const [ content, setContent ] = useState(null)
    
    async function getContent(){
        const url = 'http://www.localhost:4000/posts'
        let response = await fetch(url);
        let data = await response.json()
        setContent(data)
        console.log(data)
    }
    useEffect(() => {
        getContent()
    }, [])

    const loaded = () => {
        return (
            <>
                {content.map((e, idk) => {
                    return (
                        <div>
                            <p>{e.userName}</p>
                            <img src={e.image} className='content-image' key={idk} />
                            <img src='https://cdn-icons-png.flaticon.com/512/151/151910.png' className='image-button' key={idk} />
                            <img src='https://cdn-icons-png.flaticon.com/512/3114/3114810.png' className='image-button' key={idk} />
                            <p>{e.caption}</p>
                        </div>
                    )
                })}
            </>
        )
    }
  return (
    <div className='home-container'>
        <div className='home-logo'>
            <p className='home-logo'>Finstagram</p>
        </div>
        <div className='home-content'>
            {content ? loaded() : <p>Loading...</p>}
        </div>
    </div>
  )
}

export default Home
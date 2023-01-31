import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
        <div className='home-button'>
            <img src='https://cdn-icons-png.flaticon.com/128/3405/3405771.png' alt='home' className='footer-button'/>
        </div>
        <div className='explore-button'>
            <img src='https://cdn-icons-png.flaticon.com/128/3031/3031293.png' alt='home' className='footer-button'/>
        </div>
        <div className='post-button'>
            <img src='https://cdn-icons-png.flaticon.com/128/3161/3161837.png' alt='home' className='footer-button'/>
        </div>
        <div className='profile-button'>
            <img src='https://cdn-icons-png.flaticon.com/128/3405/3405771.png' alt='home' className='footer-button'/>
        </div>
    </div>
  )
}

export default Footer
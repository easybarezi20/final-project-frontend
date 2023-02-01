import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer-container'>
        <div className='home-button'>
            <Link to='/'>
                <img src='https://cdn-icons-png.flaticon.com/128/3405/3405771.png' alt='home' className='footer-button'/>
            </Link>
        </div>
        <div className='explore-button'>
            <Link to='/explore'>
                <img src='https://cdn-icons-png.flaticon.com/128/3031/3031293.png' alt='home' className='footer-button'/>
            </Link>
        </div>
        <div className='post-button'>
            <Link to='/post'>
                <img src='https://cdn-icons-png.flaticon.com/128/3161/3161837.png' alt='home' className='footer-button'/>
            </Link>
        </div>
        <div className='profile-button'>
            <Link to='/login'>
                <img src='https://cdn-icons-png.flaticon.com/128/3405/3405771.png' alt='home' className='footer-button'/>
            </Link>
        </div>
    </div>
  )
}

export default Footer
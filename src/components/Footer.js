import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(UserContext)
    const renderList = () => {
        if(state){
            return [
                <div className='home-button' key="home">
                    <Link to='/'>
                        <img src='https://cdn-icons-png.flaticon.com/128/3405/3405771.png' alt='home' className='footer-button'/>
                    </Link>
                </div>,
                <div className='explore-button' key="explore">
                    <Link to='/explore'>
                        <img src='https://cdn-icons-png.flaticon.com/128/3031/3031293.png' alt='home' className='footer-button'/>
                    </Link>
                </div>,
                <div className='post-button' key="post">
                    <Link to='/post'>
                        <img src='https://cdn-icons-png.flaticon.com/128/3161/3161837.png' alt='home' className='footer-button'/>
                    </Link>
                </div>,
                <div className='profile-button' key="profile">
                    <Link to='/profile'>
                        <img src='https://cdn-icons-png.flaticon.com/128/1077/1077114.png' alt='home' className='footer-button'/>
                    </Link>
                </div>,
                <div className='profile-button' key="logout">
                    <img src='https://cdn-icons-png.flaticon.com/128/660/660350.png' alt='home' className='footer-button'
                    onClick={() => {
                        localStorage.clear()
                        dispatch({type:"CLEAR"})
                        navigate('/login')
                    }}
                    />
                    
                </div>,
            ]
        }
    }
  return (
    <div className='footer-container'>
        {renderList()}
    </div>
  )
}

export default Footer
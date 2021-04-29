import React from 'react'
import "../assets/css/navbar.css"
import {Link} from "react-router-dom"
function Navbar() {
    return (
        <nav className="navbar">
                <Link to="/promotions">Endirimlər</Link>
                <Link to="/suppliers">Tədarükçülər</Link>
                <div className='dropCont'> 
                    <p className='dropTitle'>Haqqımızda</p>
                    <div className='dropMenu'> 
                        <Link to='/who' className='dropSubTitle'>Biz kimik</Link>
                        <Link to='/suppliers' className='dropSubTitle'>Tədarükçülər</Link>
                        <Link to='/quality' className='dropSubTitle'>Keyfiyyət</Link>
                        <Link to='/reviews' className='dropSubTitle'>Şərhlər</Link>
                    </div>
                </div>
                <a href="/elaqe">Əlaqə</a>
        </nav>
    )
}

export default Navbar

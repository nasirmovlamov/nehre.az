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
                        <p className='dropSubTitle'>Salam1</p>
                        <p className='dropSubTitle'>Salam2</p>
                        <p className='dropSubTitle'>Salam3</p>
                    </div>
                </div>
                <a href="/elaqe">Əlaqə</a>
        </nav>
    )
}

export default Navbar

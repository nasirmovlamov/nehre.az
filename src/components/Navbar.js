import React from 'react'
import "../assets/css/navbar.css"
import {Link} from "react-router-dom"
function Navbar() {
    return (
        <nav className="navbar">
                <a href="/">Əsas Səhifə </a>
                <Link to="/promotions">Endirimlər</Link>
                <Link to="/suppliers">Tədarükçülər</Link>
                <a href="#">Haqqımızda</a>
                <a href="/elaqe">Əlaqə</a>
        </nav>
    )
}

export default Navbar

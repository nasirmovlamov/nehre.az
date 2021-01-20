import React from 'react'
import "../assets/css/navbar.css"
import {Link} from "react-router-dom"
function Navbar() {
    return (
        <nav className="navbar">
                <a href="/">Əsas Səhifə </a>
                <a href="/endirimler">Endirimlər</a>
                <Link to="/suppliers">Tədarükçülər</Link>
                <a href="#">Haqqımızda</a>
                <a href="/elaqe">Əlaqə</a>
        </nav>
    )
}

export default Navbar

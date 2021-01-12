import React from 'react'
import "../assets/css/navbar.css"
function Navbar() {
    return (
        <nav className="navbar">
                <a href="/">Əsas Səhifə </a>
                <a href="/endirimler">Endirimlər</a>
                <a href="/tedarukculer">Tədarükçülər</a>
                <a href="#">Haqqımızda</a>
                <a href="/elaqe">Əlaqə</a>
        </nav>
    )
}

export default Navbar

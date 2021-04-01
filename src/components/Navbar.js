import React from 'react'
import "../assets/css/navbar.css"
import {Link} from "react-router-dom"
function Navbar() {
    return (
        <nav className="navbar">
                <Link to="/promotions">Endirimlər</Link>
                <Link to="/suppliers">Tədarükçülər</Link>
                <div>Haqqımızda</div>
                <a href="/elaqe">Əlaqə</a>
        </nav>
    )
}

export default Navbar

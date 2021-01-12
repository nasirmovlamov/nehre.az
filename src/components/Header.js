import React from 'react'
import "../assets/css/header.css"
import HomePage from '../pages/HomePage'
import DownNavbar from './DownNavbar'
import Navbar from './Navbar'
import TopNavbar from './TopNavbar'
function Header() {
    return (
        <div className="AllCont">
            <header className="header">
                <TopNavbar/>
                <Navbar/>
                <DownNavbar/>
            </header>
            <HomePage/>
        </div>
    )
}

export default Header

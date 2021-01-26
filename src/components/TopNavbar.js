import React from 'react'
import "../assets/css/topNavbar.css"
import logoNehre from "../assets/images/Loqo_nehre.png"
import element from "../assets/images/element.png"
import azn from "../assets/images/azn.png"
import dil from "../assets/images/dil.png"
import member from "../assets/images/member.png"
import sebet from "../assets/images/Sebet.png"
import searchIcon from "../assets/images/searchIcon.png"
import {Link} from "react-router-dom"
function TopNavbar() {
    return (
        <div className="topNavbar">
            <Link to="/"><img src={logoNehre} alt="" width="200" height="auto"/></Link>
            <div>
                <div className="searchAndSelection">
                    <div className="selection">
                     {/*  */}
                        <Link to="/">
                        </Link>
                        {/*  */}
                        <Link to="/">
                        </Link>
                    {/*  */}
                        <Link to="/memberarea">
                        </Link>
                        {/*  */}
                        <Link to="/">     
                        </Link>
                    </div>
                    <div className="inputAndIcon">
                        <button className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button>
                        <input type="text" placeholder="Axtarış"/>
                    </div>
                   
                </div>
            </div>
            <img src={element} alt="" width="200" height="auto"/>
        </div>
    )
}

export default TopNavbar

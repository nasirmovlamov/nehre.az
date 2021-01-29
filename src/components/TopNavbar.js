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
import PhoneIcon from '@material-ui/icons/Phone';
function TopNavbar(props) {
    return (
        <div className="topNavbar">
            <Link to="/"><img src={logoNehre} alt="" width="200" height="auto"/></Link>
                
                
            <div className="searchAndLogo">    
            <div className="searchAndPhone">
                    <p className="phone"> <PhoneIcon/> <a href="tel:012 00 0000">012 00 0000</a></p>
                    <div className="inputAndIcon">
                        <button className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button>
                        <input type="text" placeholder="Axtarış"/>
                    </div>
                   
            </div>
            
            <div className="imgAndLinks">
                <img src={element} alt="" width="200" height="auto"/>
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
                            <button className="shoppingBtn" onClick={() => props.modalOpener()}></button>        
                    </Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default TopNavbar

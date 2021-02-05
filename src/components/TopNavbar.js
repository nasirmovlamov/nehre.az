import React from 'react'
import "../assets/css/topNavbar.css"
import logoNehre from "../assets/images/Loqo_nehre.png"
import logoNehre2 from "../assets/images/logoNehre2.png"
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
                    
                    
                <div className="topPart">    
                    <Link to="/"><img src={logoNehre} alt="" width="150" height="auto"/></Link>
                    
                    <div className="imgAndLinks">
                        <div className="searchAndPhone">
                                <p className="phone"> <PhoneIcon/> <a href="tel:012 00 0000">012 00 0000</a></p>
                                <p className="phone"> <PhoneIcon/> <a href="tel:012 00 0000">012 00 0000</a></p>
                        </div>
                        <img src={element} alt="" width="150" height="auto"/>
                    </div>
                </div>
                
        </div>
    )
}

export default TopNavbar

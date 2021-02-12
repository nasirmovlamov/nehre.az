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
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PersonIcon from '@material-ui/icons/Person';
function TopNavbar(props) {
    return (
        <div className="topNavbar">
                <div className="topPart">    
                    <Link to="/"><img src={logoNehre} alt="" width="140" height="auto"/></Link>
                    <div className="phoneAndSearch">

                        <div className="phoneCont">
                                <p className="phone"> <PhoneIcon/> <a href="tel:012 00 0000">012 00 0000</a></p>
                                <p className="phone"> <PhoneIcon/> <a href="tel:012 00 0000">012 00 0000</a></p>
                        </div>

                        <div className="searchAndIcons">
                            <div className="inputAndIcon">
                                <input type="text" placeholder="Axtarış"/>
                                <button className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button>
                            </div>
                            <div className="selection">
                                {/*  */}
                                <Link to="/">
                                </Link>
                                {/*  */}
                                <Link to="/">
                                </Link>
                                {/*  */}
                                <Link to="/login">
                                    <button className="shoppingBtn" onClick={() => props.modalOpener3()}><PersonIcon/></button>     
                                </Link>
                                {/*  */}
                                <Link to="/memberarea/favorites">
                                    <StarBorderIcon/> 
                                </Link>
                                <Link to="/">  
                                    <button className="shoppingBtn" onClick={() => props.modalOpener()}></button>     
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="imgAndLinks">
                        
                        <img src={element} alt="" width="150" height="auto"/>
                    </div>
                </div>
                
        </div>
    )
}

export default TopNavbar

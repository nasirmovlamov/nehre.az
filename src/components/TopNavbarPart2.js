import React from 'react'
import "../assets/css/topNavbarPart2.css"
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
function TopNavbarPart2(props) {
    return (
        <div className="downPart" id="downPart">
            <div className="downCont" id="downCont">
                    <Link to="/"  id="logoNehre"><img src={logoNehre2} alt="" width="100" height="auto"/></Link>
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
                                <button className="shoppingBtn" onClick={() => props.modalOpener3()}></button>     
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
        </div>
    )
}

export default TopNavbarPart2

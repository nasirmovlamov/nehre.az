import React, { useState } from 'react'
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
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
function TopNavbar(props) {
    const [drop1, setdrop1] = useState(false)
    const [drop2, setdrop2] = useState(false)
    function myFunction1(num) {
        if (num === false) {
            setdrop1(true)
        }
        else{
            setdrop1(false)
        }
    }
    function myFunction2(num) {
        if (num === false) {
            setdrop2(true)
        }
        else{
            setdrop2(false)
        }
    }
    function myFunctionBlur1()
    {
        setdrop1(false)

    }
    function myFunctionBlur2()
    {
        setdrop2(false)

    }
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
                                <Link to="/">
                                    <div class="shoppingBtnDiv">
                                        <button onClick={() => myFunction1(drop1)} onBlur={() => myFunctionBlur1(drop1)} class="shoppingBtn1 dropbtn">$</button>
                                        {drop1 && 
                                            <div id="myDropdown" class="dropdown-content">
                                                <button href="#">₼</button>
                                                <button href="#">$</button>
                                            </div>
                                        }
                                    </div>
                                </Link>
                                {/*  */}
                                <Link to="/">
                                <div class="shoppingBtnDiv2">
                                        <button onClick={() => myFunction2(drop2)} onBlur={() => myFunctionBlur2(drop1)} class="shoppingBtn2">AZ</button>
                                        {drop2 && <div id="myDropdown" class="dropdown-content">
                                            <button href="#">AZ</button>
                                            <button href="#">EN</button>
                                            <button href="#">RU</button>
                                        </div>}
                                    </div>
                                </Link>
                                {/*  */}
                                <Link to="/">
                                    <button className="shoppingBtn shoppingBtn3" onClick={() => props.modalOpener3()}><PersonIcon/></button>     
                                </Link>
                                {/*  */}
                                <Link to="/memberarea/favorites">
                                    <StarBorderIcon/> 
                                </Link>
                                <Link to="/">  
                                    <button className="shoppingBtn shoppingBtn4" onClick={() => props.modalOpener()}><ShoppingCartIcon/></button>     
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

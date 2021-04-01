import React, { useEffect, useState } from 'react'
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
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
function TopNavbar(props) {
    const [UserData, setUserData] = useState(0)
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    })
    

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
    }
    function myFunctionBlur2()
    {
    }

    const [moneyType, setmoneyType] = useState("₼")

    const moneyChanger = () => {
        if(moneyType === "₼")
        {
            setmoneyType("$")
            setdrop1(false)
        }
        else 
        {
            setmoneyType("₼")
            setdrop1(false)
        }
    }

    
    
    var lang = ["AZ" , "EN" , "RU"]
    const [langM, setlangM] = useState(lang[0])
    const languageChanger = (lang) => {
        setlangM(lang)
    }
    
    const langChangerMouseLeave1 = () => {
        setdrop1(false)
    }
    const langChangerMouseLeave2 = () => {
        setdrop2(false)
    }
    const [searchResult, setsearchResult] = useState('')
    const searchChange = (e) => {
        setsearchResult(e.target.value)
    }
    const searchHandler = () => {
        if(searchResult !== "")
        {
            sessionStorage.setItem('searchResult' , searchResult)
            window.location.href = '/search'
        }
    }
    return (
        <div className="topNavbar">
                <div className="topPart">    
                    <Link to="/"><img src={logoNehre} alt="" width="140" height="auto"/></Link>
                    <div className="phoneAndSearch">

                        

                        <div className="searchAndIcons">
                            <div className="inputAndIcon">
                                <input onChange={(e) => searchChange(e)} type="text" placeholder="Axtarış"/>
                                <button onClick={() => searchHandler()} className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button>
                            </div>

                            <div className="phoneCont">
                                <p className="phone"> <PhoneIcon/> <a href={`tel:${props.number1}`}>{props.number1}</a> </p>
                                <p className="phone"> <PhoneIcon/> <a href={`tel:${props.number2}`}>{props.number2}</a></p>
                            </div>

                            <div className="selection">
                                <Link to="/">
                                    <div className="shoppingBtnDiv" onMouseLeave={() => langChangerMouseLeave1()}> 
                                        <button onClick={() => myFunction1(drop1)} onBlur={() => myFunctionBlur1(drop1)} className="shoppingBtn1 dropbtn">{moneyType}</button>
                                        {drop1 && 
                                            <div id="myDropdown" className="dropdown-content">
                                                <button onClick={() => moneyChanger()}>{moneyType === "₼" ? "$" : "₼"}</button>
                                            </div>
                                        }
                                    </div>
                                </Link>
                                {/*  */}
                                <Link to="/">
                                <div className="shoppingBtnDiv2" onMouseLeave={() => langChangerMouseLeave2()}>
                                        <button onClick={() => myFunction2(drop2)} onBlur={() => myFunctionBlur2(drop1)} className="shoppingBtn2">{langM}</button>
                                        {drop2 && <div id="myDropdown" className="dropdown-content">
                                            {langM === "AZ" ? "" : <button onClick={() => languageChanger(lang[0])}>{lang[0]}</button>}
                                            {langM === "EN" ? "" : <button onClick={() => languageChanger(lang[1])}>{lang[1]}</button>}
                                            {langM === "RU" ? "" : <button onClick={() => languageChanger(lang[2])}> {lang[2]}</button>}
                                        </div>}
                                    </div>
                                </Link>
                                {/*  */}
                                <Link to={`/`}>
                                     <button className="shoppingBtn shoppingBtn3" onClick={() => props.modalOpener3()}>{props?.UserData?.name !== undefined ? <Avatar  src={`https://nehra.az/${props?.UserData?.image}`} />  : <PersonIcon/> } </button>    
                                </Link>
                                {/*  */}
                                <Link to="/memberarea/bookmarks">
                                    <StarBorderIcon/> 
                                </Link>
                                <Link to="/">  
                                    <button className="shoppingBtn shoppingBtn4" onClick={() => props.modalOpener()}><ShoppingCartIcon/></button>    <span className="price">{props.PaymentPrice }    </span>
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

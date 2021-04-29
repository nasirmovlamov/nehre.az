import React, {useEffect, useState, useContext} from 'react'
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
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import {ProductListingContext} from '../components/ProductListingProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery';

function TopNavbarPart2(props) {
    const elements = useMediaQuery('(min-width:650px)') 

    const phoneNumbersMQ = useMediaQuery('(min-width:1050px)');
    const searchBottomMQ = useMediaQuery('(min-width:786px)');


    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)
    const [drop1, setdrop1] = useState(false)
    const [drop2, setdrop2] = useState(false)
    const [number1, setNumber1] = useState(0)
    const [number2, setNumber2] = useState(0)
    const sendGetRequest7 = async () => {
        try {
            const resp = await axios.get('https://nehra.az/public/api/settings')
            setNumber1(resp.data.phone1) 
            setNumber2(resp.data.phone2)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
    } , [] )
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


    const moneyChanger = () => {
        if(money === "₼")
        {
            sessionStorage.setItem('money' , "$")
            window.location.reload();
            setdrop1(false)
        }
        else 
        {
            sessionStorage.setItem('money' , "₼")
            window.location.reload();
            setdrop1(false)
        }
    }


    
    
    const languageChanger = (lang) => {
        sessionStorage.setItem('lang' , lang)
        window.location.href = `nehra.az/locale/${lang}`
        window.location.reload();
    }
    
    const langChangerMouseLeave1 = () => {
            setdrop1(false)
    }
    const langChangerMouseLeave2 = () => {
            setdrop2(false)
    }
   
    return (
        <div className="downPart" id="downPart">
            <div className="downCont" id="downCont">
                    <Link to="/"  id="logoNehre"><img src={logoNehre2} alt="" width="100" height="auto"/></Link>
                    <div className="searchAndIcons">
                        <div className="inputAndIcon">
                           {phoneNumbersMQ && 
                           <div className="phoneCont">
                                <p className="phone"> <PhoneIcon/> <a href={`tel:${props.number2}`}>{props.number2}</a></p>
                                <p className="phone"> <WhatsAppIcon/> <a href='https://api.whatsapp.com/send?phone=994556800055'>{props.number1} </a></p>
                            </div>}
                            {searchBottomMQ &&
                            <>
                            <input type="text" placeholder="Axtarış"/>
                            <button className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button>
                            </>}
                        </div>

                        <div className="selection">
                            {/*  */}
                            {elements && <Link to="/">
                                    <div className="shoppingBtnDiv" onMouseLeave={() => langChangerMouseLeave1()}>
                                        <button onClick={() => myFunction1(drop1)} onBlur={() => myFunctionBlur1(drop1)} className="shoppingBtn1 dropbtn">{money}</button>
                                        {drop1 && 
                                            <div id="myDropdown" className="dropdown-content">
                                                <button onClick={() => moneyChanger()}>{money === "₼" ? "$" : "₼"}</button>
                                            </div>
                                        }
                                    </div>
                                </Link>}
                                {/*  */}
                                {elements &&<Link to="/">
                                    <div className="shoppingBtnDiv2" onMouseLeave={() => langChangerMouseLeave2()}>
                                        <button onClick={() => myFunction2(drop2)} onBlur={() => myFunctionBlur2(drop1)} className="shoppingBtn2">{lang}</button>
                                        {drop2 && <div id="myDropdown" className="dropdown-content">
                                            {lang === "AZ" ? "" : <button onClick={() => languageChanger(langArr[0])}>{langArr[0]}</button>}
                                            {lang === "EN" ? "" : <button onClick={() => languageChanger(langArr[1])}>{langArr[1]}</button>}
                                            {lang === "RU" ? "" : <button onClick={() => languageChanger(langArr[2])}> {langArr[2]}</button>}
                                        </div>}
                                    </div>
                                </Link>}
                            {/*  */}
                            <Link to="/">
                                <button className="shoppingBtn shoppingBtn3" onClick={() => props.modalOpener3()}><PersonIcon/></button> 
                            </Link>
                            {/*  */}
                            {elements &&<Link to="/memberarea/bookmarks">
                                <StarBorderIcon/> 
                            </Link>}
                            {elements &&
                            <button className="shoppingBtn shoppingBtn4 BtnCheckout" onClick={() => props.modalOpener()} >  
                                    <button><ShoppingCartIcon/></button>    {FinalPrice > 0 &&<span className="price"> {FinalPrice + " " + money}</span>} 
                            </button>}
                        </div>
                    </div>
            </div>    
        </div>
    )
}

export default TopNavbarPart2

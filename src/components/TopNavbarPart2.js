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
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import Favorite from '@material-ui/icons/Favorite';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import {ProductListingContext} from '../components/ProductListingProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ContactsIcon from '@material-ui/icons/Contacts';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TopNavbarPart2(props) {
    const elements = useMediaQuery('(min-width:650px)') 

    const phoneNumbersMQ = useMediaQuery('(min-width:1050px)');
    const searchBottomMQ = useMediaQuery('(min-width:786px)');


    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    const [drop1, setdrop1] = useState(false)
    const [drop2, setdrop2] = useState(false)
    const [number1, setNumber1] = useState(0)
    const [number2, setNumber2] = useState(0)
    const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});
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
        window.location.href = `https://nehra.az/locale/${lang}`
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
            setTimeout(() => {
                window.location.href = '/search'
            }, 50);
        }
    }

    return (
        <div className="downPart" id="downPart">
            <div className="downCont" id="downCont">
                    <Link to="/"  id="logoNehre"><img src={logoNehre2} alt="" width="100" height="auto"/></Link>
                    <div className="searchAndIcons">
                        <form className="inputAndIcon" action='search' onSubmit={() => searchHandler()}> 
                           {phoneNumbersMQ && 
                           <div className="phoneCont">
                                <p className="phone"> <PhoneIcon/> <a href={`tel:${props.number2}`}>{props.number2}</a></p>
                                <p className="phone"> <WhatsAppIcon/> <a href='https://api.whatsapp.com/send?phone=994556800055'>{props.number1} </a></p>
                            </div>}
                            {searchBottomMQ &&
                            <>
                            <input  onChange={(e) => searchChange(e)} type="text" placeholder={(lang === "AZ" && `Axtarış`) || (lang === "EN" && `Search`) || (lang === "RU" && `Поиск`)}/>
                            <button type='submit' className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button>
                            </>}
                        </form>

                        <div className="selection">
                            {/*  */}
                            {elements && <a >
                                    <div className="shoppingBtnDiv" onMouseLeave={() => langChangerMouseLeave1()}>
                                        <button onClick={() => myFunction1(drop1)} onBlur={() => myFunctionBlur1(drop1)} className="shoppingBtn1 dropbtn">{money}</button>
                                        {drop1 && 
                                            <div id="myDropdown" className="dropdown-content">
                                                <button onClick={() => moneyChanger()}>{money === "₼" ? "$" : "₼"}</button>
                                            </div>
                                        }
                                    </div>
                                </a>}
                                {/*  */}
                                {elements &&<a >
                                    <div className="shoppingBtnDiv2" onMouseLeave={() => langChangerMouseLeave2()}>
                                        <button onClick={() => myFunction2(drop2)} onBlur={() => myFunctionBlur2(drop1)} className="shoppingBtn2 mainLang">{lang}</button>
                                        {drop2 && <div id="myDropdown" className="dropdown-content">
                                            {(lang === "AZ" || lang === "az")  ? "" : <button onClick={() => languageChanger(langArr[0])}><a className='btnInside' href='/locale/az'> {langArr[0]}  </a></button> }
                                            {(lang === "EN" || lang === "en")  ? "" : <button onClick={() => languageChanger(langArr[1])}><a className='btnInside' href='/locale/en'> {langArr[1]}  </a></button> }
                                            {(lang === "RU" || lang === "ru")  ? "" : <button onClick={() => languageChanger(langArr[2])}><a className='btnInside' href='/locale/ru'> {langArr[2]} </a></button>}
                                        </div>}
                                    </div>
                                </a>}
                            {/*  */}
                            <a >
                                <button className="shoppingBtn shoppingBtn3" onClick={() => props.modalOpener3()}>{ (JSON.parse(localStorage.getItem('LoginUserData'))?.id !== null && JSON.parse(localStorage.getItem('LoginUserData'))?.id !== undefined)  ?  <ContactMailIcon/> : <PersonIcon/> }</button> 
                            </a>
                            {/*  */}
                            {(elements && (JSON.parse(localStorage.getItem('LoginUserData'))?.id !== null && JSON.parse(localStorage.getItem('LoginUserData'))?.id !== undefined)) &&
                            <Link className='bookmarksLL' to={"/memberarea/bookmarks"}>
                                <StarIcon/> 
                            </Link>}
                            {elements &&
                            <button className="shoppingBtn shoppingBtn4 BtnCheckout" onClick={() => props.modalOpener()} >  
                                    <button><ShoppingCartIcon/></button>    {FinalPrice > 0 &&<span className="price"> {money === "₼" ? FinalPrice :(FinalPrice / 1.7).toFixed(1)} {money}</span>} 
                            </button>}
                        </div>
                    </div>
            </div>    
        </div>
    )
}

export default TopNavbarPart2

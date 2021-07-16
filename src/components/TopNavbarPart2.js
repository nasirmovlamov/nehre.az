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


    const context = useContext(ProductListingContext)
    const {UserData , setUserData , ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,setmoney, setItems, setMinOrder,loader, setloader , UserStatus, setUserStatus ,  setnumber2, setnumber1, number1, number2 , setTopCategory, TopCategory} = context

    
    const [drop1, setdrop1] = useState(false)
    const [drop2, setdrop2] = useState(false)
    const notifyLogin = () => toast.warning( ((lang === "AZ" && `Hesabınıza daxil olun!`) || (lang === "EN" && `Enter your account!`) || (lang === "RU" && `Войдите в свой аккаунт!`)) , {draggable: true,});
    
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
            
        </div>
    )
}

export default TopNavbarPart2

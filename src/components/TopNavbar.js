import React, { useEffect, useState, useContext} from 'react'
import "../assets/css/topNavbar.css"
import logoNehre from "../assets/images/Loqo_nehre.png"
import logoNehre3 from "../assets/images/logoNehre2.png"
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
import {ProductListingContext} from '../components/ProductListingProvider'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Hamburger  from 'hamburger-react'
import Drawer from '@material-ui/core/Drawer';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import WidgetsIcon from '@material-ui/icons/Widgets';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ContactMailIcon from '@material-ui/icons/ContactMail';

const stylesForSwiper = makeStyles({
    list: {
      width: "80%",
    },
    fullList: {
      width: "80%",
    },
}); 
  
const stylesForSwiper1 = makeStyles({
    list: {
      width: "100%",
    },
    fullList: {
      width: "100%",
    },
}); 
  


function TopNavbar(props) {
    const rightImgMQ = useMediaQuery('(min-width:1260px)');
    const leftImgMQ = useMediaQuery('(min-width:1100px)');
    const searchTopMQ = useMediaQuery('(min-width:1000px)');
    const enableMobile = useMediaQuery('(min-width:650px)') 
    const elements = useMediaQuery('(min-width:650px)') 
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)
    
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
        window.location.href = `https://nehra.az/${lang}`
        window.location.reload();
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




    const DrawerAssort = () => {
        if(document.querySelector('#assrtDrawId').style.height !== '' && document.querySelector('#assrtDrawId').style.height !== '0px')
        {
            document.querySelector('#assrtDrawId').setAttribute('style' , `transition:1s;height:0px !important;padding-top:0px;padding-bottom:0px;opacity:0;`);
        }
        else 
        {
            document.querySelector('#assrtDrawId').setAttribute('style' , `opacity:1;transition:1s;height:${props.assortmentArr.length * 35 + 'px'} !important;padding-top:5px;padding-bottom:5px;`);
        }
    }

    const classes = stylesForSwiper();
      const [state, setState] = React.useState({
        top: false,
      });
  
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
      const list = (anchor) => (
        <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
        <div className="swiperCont">
            <div>
                <div className='menu'> <p>Menyu</p>  <button onClick={toggleDrawer(anchor, false)}> &#10006;</button></div>  

                <div className="assortmentDrawer">
                        <button onClick={() => DrawerAssort()} className="title"><WidgetsIcon /> <p> Məhsul Çeşidləri </p> <ArrowDropUpIcon/></button>
                        <div className='assortmentCont' id='assrtDrawId'>
                            {props.TopCategory.map(element => <a href={`/category/${element.id}`}>{element.name}</a>)}
                        </div >
                </div>

                <div className="links">
                        <Link to="/" id="homepage">Əsas səhifə</Link>
                        <Link to="/promotions"  id="promotions">Endirimlər</Link>
                        <Link to="/about" id="about">Haqqımızda</Link>
                        <Link to="/contact" id="contact">Əlaqə</Link>
                </div>
                <div className="lang"> 
                        <button>AZ</button>
                        <button>EN</button>
                        <button>RU</button>
                </div>
            </div>

            <div className="drawerCard">
                <div className='phoneCont'>
                    <p className="phone">{props.number1}</p>
                    <p className="phone">{props.number2}</p>
                </div>
                <p className="location">Baku , Azerbaijan</p>
                <p className="email">nehra@info.az</p>
                <div className="social"> <FacebookIcon/> <InstagramIcon/> <TwitterIcon/>  </div>
            </div>


        </div>
    </div>
    );

    const classes1 = stylesForSwiper1();
      const [state1, setState1] = React.useState({
        top: false,
      });
  
      const toggleDrawer1 = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState1({ ...state, [anchor]: open });
      };
      const list1 = (anchor) => (
        <div
        className={clsx(classes1.list, {
          [classes1.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
        <div className="searchSwiperCont">  
            <div className='menu'> <p>Axtarış</p>  <button onClick={toggleDrawer1(anchor, false)}> &#10006;</button></div>  
            <div className='search'> <input onChange={(e) => searchChange(e)} type="text" placeholder={lang === "AZ" && `Axtarış` || lang === "EN" && `Search` || lang === "RU" && `Поиск`}/> <button onClick={() => searchHandler()} className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button></div> 
        </div>
    </div>
    );

    
    return (
        <div className="topNavbar">
                <div className="topPart">    
                    {leftImgMQ && <Link to="/" className='imgLinkTop'><img src={logoNehre} alt="" width="140" height="auto"/></Link>}
                    {!leftImgMQ && <Link to="/" ><img src={logoNehre3} alt="" width="100" height="auto"/></Link>}
                    <div className="phoneAndSearch">

                        

                        <div className="searchAndIcons">
                            {searchTopMQ && <div className="inputAndIcon">
                                <input onChange={(e) => searchChange(e)} type="text" placeholder={lang === "AZ" && `Axtarış` || lang === "EN" && `Search` || lang === "RU" && `Поиск`}/>
                                <button onClick={() => searchHandler()} className="searchIcon"> <img src={searchIcon} alt="" width="20" height="auto" /></button>
                            </div>}

                            {enableMobile && <div className="phoneCont">
                                <p className="phone"> <PhoneIcon/> <a href={`tel:${props.number1}`}>{props.number2}</a> </p>
                                <p className="phone"> <WhatsAppIcon/> <a href={`https://api.whatsapp.com/send/?phone=%2B994556800055&text&app_absent=0`}>{props.number1}</a></p>
                            </div>}

                            <div className="selection">
                                {elements &&<a>
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
                                            <button onClick={() => myFunction2(drop2)} onBlur={() => myFunctionBlur2(drop1)} className="shoppingBtn2">{lang}</button>
                                            {drop2 && <div id="myDropdown" className="dropdown-content">
                                                {lang === "AZ" ? "" : <button onClick={() => languageChanger(langArr[0])}>{langArr[0]}</button>}
                                                {lang === "EN" ? "" : <button onClick={() => languageChanger(langArr[1])}>{langArr[1]}</button>}
                                                {lang === "RU" ? "" : <button onClick={() => languageChanger(langArr[2])}> {langArr[2]}</button>}
                                            </div>}
                                    </div>
                                </a>}
                                {/*  */}

                                { 
                                    !elements && 
                                    <div>
                                        {
                                            <React.Fragment key={'top'}>
                                                <button className='searchIcon' onClick={toggleDrawer1('top', true)}><SearchIcon/></button>
                                                <Drawer anchor={'top'} open={state1['top']} onClose={toggleDrawer1('top', false)}>
                                                    {list1('top')}
                                                </Drawer> 
                                            </React.Fragment>
                                        }
                                    </div>
                                }
                                <Link to={`/`}>
                                     <button className="shoppingBtn shoppingBtn3" onClick={() => props.modalOpener3()}>{ (JSON.parse(localStorage.getItem('LoginUserData'))?.id !== null && JSON.parse(localStorage.getItem('LoginUserData'))?.id !== undefined)  ?  <ContactMailIcon/> : <PersonIcon/> }</button>    
                                </Link>
                                {/*  */}
                                {elements && <Link to="/memberarea/bookmarks">
                                    <StarBorderIcon/> 
                                </Link>}
                                {elements && <button className="shoppingBtn shoppingBtn4 BtnCheckout" onClick={() => props.modalOpener()} >  
                                    <button><ShoppingCartIcon/></button>    {FinalPrice > 0 &&<span className="price"> {FinalPrice + " " + money}</span>} 
                                </button>}
                                { 
                                    !elements && 
                                    <div>
                                        {
                                            <React.Fragment key={'right'}>
                                                <Hamburger color="#00252E" toggled={state['right']} toggle={state['right'] ? toggleDrawer('right', false) : toggleDrawer('right', true)} />
                                                <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                                                    {list('right')}
                                                </Drawer> 
                                            </React.Fragment>
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {rightImgMQ && <div className="imgAndLinks">
                        <img src={element} alt="" width="150" height="auto"/>
                    </div>}
                </div>
                
        </div>
    )
}

export default TopNavbar

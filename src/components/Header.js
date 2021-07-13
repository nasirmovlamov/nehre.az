import { useMediaQuery } from '@material-ui/core'
import React, { useEffect, useRef, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import DownNavbar from './DownNavbar'
import Navbar from './Navbar'
import TopNavbar from './TopNavbar'
import TopNavbarPart2 from './TopNavbarPart2'
import {ProductListingProvider} from './ProductListingProvider'
import {ProductListingContext} from '../components/ProductListingProvider'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
function Header() {
const context = useContext(ProductListingContext)


  const {UserData , setUserData , openBucketF, ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,setmoney, setItems, setMinOrder,loader, setloader , UserStatus, setUserStatus ,  setnumber2, setnumber1, number1, number2 , setTopCategory, TopCategory} = context

  const [scrollValue, setscrollValue] = useState(0)

    const styleScrollBtn = useRef(null);
    const  history = useHistory();

    const styleBtn =  {
        position: "fixed",
        width: "60px",
        height: "60px",
        backgroundColor: "#7dbf2a",
        bottom:"50px",
        right:"50px",
        border:'none',
        borderRadius: '50%',
        zIndex: 99
    }

    const checkMBtn =  {
        position: "fixed",
        width: "60px",
        height: "60px",
        backgroundColor: "#7dbf2a",
        bottom:"50px",
        left:"50px",
        border:'none',
        borderRadius: '50%',
        zIndex: 99
    }

    const MidNavbar = useMediaQuery('(min-width:622px)');
    useEffect(   () => {
        scrollChecker()
        window.onscroll = () => {
            setscrollValue(window.scrollY)
            if (window.scrollY > 0) {
                document?.querySelector('.pagescroll').setAttribute('style', 'margin-top:110px')
            }
            else 
            {
                document?.querySelector('.pagescroll').setAttribute('style', 'margin-top:0px')
            }
        }
    }, [])
  
    const scrollChecker =  () => {
    //   window.addEventListener("scroll", function(){
    //     // if (window.scrollY > 121)
    //     // {
    //     //     document?.getElementById('header').setAttribute('style' , 'height:0px;box-shadow: 0 2px 2px -2px rgba(0,0,0,.4);overflow:inherit;')
    //     //     document?.getElementById('downPart').setAttribute('style' , 'background:#f0f4f5;height:85.17px;overflow:inherit;')
    //     //     document?.getElementById('logoNehre').setAttribute('style' , 'opacity:1;pointer-events:all;')
    //     //     document?.getElementById('downCont').setAttribute('style' , 'padding-top: 30px;padding-bottom: 30px;')
    //     //     var downNavImgCont = document.querySelectorAll('#downNavImgCont')
    //     //     for (var i=0; i < downNavImgCont.length; i++) {
    //     //       downNavImgCont[i]?.setAttribute('style' , 'height:0px;')
    //     //     }
    //     //     var downImg = document.querySelectorAll('#downNavImg')
    //     //     for (var i=0; i < downImg.length; i++) {
    //     //       downImg[i]?.setAttribute('style' , 'height:0px;')
    //     //     }
    //     //     var buttonNav = document.querySelectorAll('.buttonNav')
    //     //     for (var i=0; i < buttonNav.length; i++) {
    //     //       buttonNav[i]?.setAttribute('style' , 'height:30px;padding-bottom:0px;')
    //     //     }
    //     //     styleScrollBtn?.current?.setAttribute('style' , 'display:flex;')
    //     //   }
    //     // else if (window.scrollY < 201)
    //     // {
    //     //   document?.getElementById('downPart')?.setAttribute('style' , 'background:transparent;height:0px;padding-top: 0px;padding-bottom: 0px;overflow:hidden;')
    //     //   document?.getElementById('logoNehre')?.setAttribute('style' , 'opacity:0;pointer-events:none;')  
    //     //   document?.getElementById('downCont')?.setAttribute('style' , 'padding-top: 0px;padding-bottom: 0px;')
    //     //   document?.getElementById('header')?.setAttribute('style' , 'height:110px;background:transparent; box-shadow: transparent;overflow:hidden;')
    //     //   styleScrollBtn?.current?.setAttribute('style' , 'display:none;')
    //     //   var downNavImgCont = document.querySelectorAll('#downNavImgCont')
    //     //   for (var i=0; i < downNavImgCont.length; i++) {
    //     //     downNavImgCont[i].setAttribute('style' , 'height:120px;')
    //     //   }
    //     //   var downImg = document.querySelectorAll('#downNavImg')
    //     //   for (var i=0; i < downImg.length; i++) {
    //     //     downImg[i].setAttribute('style' , 'height:70px;')
    //     //   }
    //     //   var buttonNav = document.querySelectorAll('.buttonNav')
    //     //   for (var i=0; i < buttonNav.length; i++) {
    //     //     buttonNav[i].setAttribute('style' , 'height:110px;')
    //     //   }
    //     // } 
    //   });
    } 

    const scrollStyle = {
        height:'105px',
        position:'fixed'
    }
    const scrollStaticStyle = {
        height:'310px',
    }

    const scrollBtnhide = {
        display: 'none',
    }
    const scrollBtnshow = {
        display: 'flex',
    }
    const scrolltoTop = () => {
        window.scrollTo(0,0)
    }

    return (
        <>
            <button type="button"  className='scrollToTop' style={scrollValue < 100 ? scrollBtnhide : scrollBtnshow} onClick={() => scrolltoTop()}><ExpandLessIcon/></button>
            {!MidNavbar &&  <button type="button"  onClick={openBucketF} className='checkMBtnC' style={checkMBtn} /*onClick={() => handleOpen()}*/><ShoppingBasketIcon width='60px' height='60px'/> {FinalPrice > 0 && (FinalPrice + " ₼")}</button> }
            <header style={scrollValue === 0 ? scrollStaticStyle : scrollStyle} id="header" className="header">
              <TopNavbar  scrollValue={scrollValue}/>
              {MidNavbar && <Navbar scrollValue={scrollValue}/>}
              {MidNavbar && <DownNavbar scrollValue={scrollValue} />}
            </header>
        </>
    )
}

export default Header

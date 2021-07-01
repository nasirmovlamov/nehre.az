import React, { useEffect, useState, useContext, useRef } from 'react'
import "../assets/css/header.css"
import HomePage from '../pages/HomePage'
import DownNavbar from './DownNavbar'
import Navbar from './Navbar'
import TopNavbar from './TopNavbar'
import TopNavbarPart2 from './TopNavbarPart2'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation,
    useHistory,
    Redirect
  } from "react-router-dom";
import ProductListingPage from '../pages/ProductListingPage'
import ProductModal from './ProductModal'
import ScrolltoTop from './ScrolltoTop'
import Suppliers from './Suppliers'
import SelectedSupplier from './SelectedSupplier'
import Footer from './Footer'
import SearchResult from './SearchResult'
import MemberArea from './MemberArea'
import CardPage from '../pages/CardPage'
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import About from '../pages/About'
import ReviewPage from '../pages/ReviewPage'
import CheckoutPage from '../pages/CheckoutPage'
import LoginPage from '../pages/LoginPage'
import Registration from '../pages/Registration'
import arrowScroll from '../assets/images/scrollArrow.png'
import F04 from '../pages/F04'
import axios from 'axios'
import AssortmentCard from './AssortmentCard'
import {ProductListingProvider} from './ProductListingProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthSmsL from '../components/AuthSmsL'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {ProductListingContext} from '../components/ProductListingProvider'
import Quality from '../pages/Quality'
import Who from '../pages/Who'
import Contacts from './Contacts'
import Cookies from 'js-cookie';
import Combo from '../pages/Combo'
import ForgetPassword from '../pages/ForgetPassword'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import Contact from '../pages/Contact'
import Loader from './Loader'



const Layout = ({ children }) => {
    const context = useContext(ProductListingContext)
  const {UserData , setUserData , ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,setmoney, setItems, setMinOrder,loader, setloader} = context
  const styleScrollBtn = useRef(null);
  // const TopNavbar = useMediaQuery('(min-width:600px)');
  const MidNavbar = useMediaQuery('(min-width:622px)');



  const notifyLOGIN = () => toast.warn("Hesabınıza daxil olun və yaxud yeni hesab yaradın!");
  const notifyTC = (till) => toast.warn(`${till/60} dəqiqə sonra yenidən cəhd edin`);


  const [tillCount, settillCount] = useState(null)
  const smsHandle = () => {
    axios.post('https://nehra.az/public/api/resendsms' , {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id})
    .then(res => (res.status ===200 && (((res.data !== ""  && res.data <= 0) && handleOpenSMS()) , ((res.data > 0) && notifyTC(res.data)) )) )
  }
  const logout = () => {
    localStorage.clear()
    window.location.reload()
  }
  const notifyAuth = () => toast.error(
    <div className="authCont">
      <p className="title">{ <>{"Hesabınızı təsdiqləyin !" }</>} </p>  
      <button onClick={() => smsHandle()} className='phoneAuth'>Telefonla təsdiqləmək</button>
      <button onClick={() => logout()} className='phoneAuth'>Çıxış</button>
      <p>{tillCount > 0 &&  <>{(tillCount/60)} dəqiqə sonra yenidən yoxlayın</> }</p>
    </div>
    , {
    position: "top-right",
    autoClose:8000,
    hideProgressBar: 100,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    width:"450px",
    progress: undefined,
    });




  const [TopCategory, setTopCategory] = useState([])
  
  
  

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
  
  const [open, setOpen]   = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    if(UserData?.id !== undefined)
    {
      setOpen2(true);
    }
    else 
    {
      notifyLOGIN()
      setTimeout(() => {
        handleClose()
        handleOpen3()
      }, 500);
    }
    
  }
  
  const handleClose2 = () => {
    setOpen2(false);
  };
  const  history = useHistory();

  const handleOpen3 = () => {
    if (UserData?.id !== undefined ) {
      axios.get(`https://nehra.az/public/api/checkstatus?user_id=${UserData?.id}`)
      .then(res => (res.data[0] == 1 ? window.location.href = '/memberarea'  : notifyAuth())) 
    }
    else 
    {
      setOpen3(true) 
      OpenLoginF()
    }
     
  }
  

  const handleClose3 = () => {
    setOpen3(false)  
    CloseLoginF()
  };
  const handleClose5 = () => {
    setOpen3(false)  
  };
  const handleOpen4 = () => {
      setOpen4(true);
  }
  const handleOpen5 = () => {
    setOpen5(true);
  }
  
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)
  
  
  
  
  const sendGetRequest10 = async () => {
    try {
      let resp = ""
      if(JSON.parse(localStorage.getItem('LoginUserData')) !== null)
      { 
        resp  = await axios.get(`https://nehra.az/public/api/settings?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
        setMinOrder(resp.data.min_order_amount)
        setNumber1(resp.data.phone1) 
        setNumber2(resp.data.phone2)
        setTopCategory(resp.data.featuredcats)
        setmoney(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
        setlang((resp.data.lang === "az" && "AZ") || (resp.data.lang === "en" && "EN") || (resp.data.lang === "ru" && "RU"))
        setSelectedsProduct(JSON.parse(resp.data.selected.text))

        if(resp.data.cart.text !== null)
        {
          const dataparsed = JSON.parse(resp.data.cart.text)
          setSelectedsProduct(sessionStorage.getItem('SecilmishProduct') !== null ? JSON.parse(sessionStorage.getItem('SecilmishProduct')) : [])
          setMinOrder()
          if(dataparsed !== undefined && dataparsed !== null && dataparsed !== "")
          {
            setProdutData((dataparsed.product      !== null  && dataparsed.product      !== undefined && dataparsed.product      !== "")   ?  dataparsed.product  : [])
            setFinalPrice((dataparsed.FinalPrice   !== null  && dataparsed.FinalPrice   !== undefined && dataparsed.FinalPrice   !== "")   ?  parseInt(dataparsed.FinalPrice)  : 0)
            setFinalWeight((dataparsed.FinalWeight !== null  && dataparsed.FinalWeight  !== undefined && dataparsed.FinalWeight  !== "")   ?  parseInt(dataparsed.FinalWeight)  : 0)
            setFinalGoods((dataparsed.FinalGoods   !== null  && dataparsed.FinalGoods   !== undefined && dataparsed.FinalGoods   !== "")   ?  parseInt(dataparsed.FinalGoods)  : 0)
            setFinalBonus((dataparsed.FinalBonus   !== null  && dataparsed.FinalBonus   !== undefined && dataparsed.FinalBonus   !== "")   ?  parseInt(dataparsed.FinalBonus)  : 0)
            setDateGoods((dataparsed.DateGoods     !== null  && dataparsed.DateGoods    !== undefined && dataparsed.DateGoods    !== "")   ?  dataparsed.DateGoods  : [])
            setItems((dataparsed.product      !== null  && dataparsed.product      !== undefined && dataparsed.product      !== "")   ?  dataparsed.product  : [])
          }
        }
        else 
        {
            setProdutData([])
            setFinalPrice(0)
            setFinalWeight(0)
            setFinalGoods(0)
            setFinalBonus(0)
            setDateGoods([])
            setItems([])
        }
      }
      else 
      {
        setProdutData(localStorage.getItem('ProdutData')  !== null   ?  JSON.parse(localStorage.getItem('ProdutData')) : [])
        setFinalPrice(localStorage.getItem('FinalPrice')!== null   ?  parseFloat(localStorage.getItem('FinalPrice')) : 0 )
        setFinalWeight(localStorage.getItem('FinalWeight') !== null ? parseFloat(localStorage.getItem('FinalWeight')) : 0)
        setFinalGoods(localStorage.getItem('FinalGoods')   !== null  ?  parseInt(localStorage.getItem('FinalGoods')) : 0)
        setFinalBonus(localStorage.getItem('FinalBonus')   !== null  ?  parseInt(localStorage.getItem('FinalBonus')) : 0)
        setDateGoods(localStorage.getItem('DateGoods')  !== null  ?  JSON.parse(localStorage.getItem('DateGoods')) : [])
        setItems(localStorage.getItem('ProdutData')  !== null   ?  JSON.parse(localStorage.getItem('ProdutData')) : [])
        resp = await axios.get(`https://nehra.az/public/api/settings/`)
        setTopCategory(resp.data.featuredcats)
        setMinOrder(resp.data.min_order_amount)
        setNumber1(resp.data.phone1) 
        setNumber2(resp.data.phone2)
        setSelectedsProduct(sessionStorage.getItem('SecilmishProduct') !== null ? JSON.parse(sessionStorage.getItem('SecilmishProduct')) : [])

        setlang((resp.data.lang === "az" && "AZ") || (resp.data.lang === "en" && "EN") || (resp.data.lang === "ru" && "RU"))
        setmoney(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
      }
      setloader(false)
    } 
    catch (err) {
      console.error(err);
      setTimeout(() => {
        sendGetRequest10()
      }, 60000);
    }
  };

  useEffect(async () => {
    setloader(true)
    if(JSON.parse(localStorage.getItem('LoginUserData')) !== null)
    {
      setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
      // const resp = await axios.get(`https://nehra.az/public/api/checkstatus?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
      // setstatusOK(resp.data[0])
    }
    sendGetRequest10()
    scrollChecker()
  } , [] )

  const scrollChecker = async () => {
    window.addEventListener("scroll", function(){
      if (window.scrollY > 121)
      {
          document?.getElementById('header').setAttribute('style' , 'height:0px;box-shadow: 0 2px 2px -2px rgba(0,0,0,.4);overflow:inherit;')
          document?.getElementById('downPart').setAttribute('style' , 'background:#f0f4f5;height:85.17px;overflow:inherit;')
          document?.getElementById('logoNehre').setAttribute('style' , 'opacity:1;pointer-events:all;')
          document?.getElementById('downCont').setAttribute('style' , 'padding-top: 30px;padding-bottom: 30px;')
          var downNavImgCont = document.querySelectorAll('#downNavImgCont')
          for (var i=0; i < downNavImgCont.length; i++) {
            downNavImgCont[i]?.setAttribute('style' , 'height:0px;')
          }
          var downImg = document.querySelectorAll('#downNavImg')
          for (var i=0; i < downImg.length; i++) {
            downImg[i]?.setAttribute('style' , 'height:0px;')
          }
          var buttonNav = document.querySelectorAll('.buttonNav')
          for (var i=0; i < buttonNav.length; i++) {
            buttonNav[i]?.setAttribute('style' , 'height:30px;padding-bottom:0px;')
          }
          styleScrollBtn?.current?.setAttribute('style' , 'display:flex;')
        }
      else if (window.scrollY < 201)
      {
        document?.getElementById('downPart')?.setAttribute('style' , 'background:transparent;height:0px;padding-top: 0px;padding-bottom: 0px;overflow:hidden;')
        document?.getElementById('logoNehre')?.setAttribute('style' , 'opacity:0;pointer-events:none;')  
        document?.getElementById('downCont')?.setAttribute('style' , 'padding-top: 0px;padding-bottom: 0px;')
        document?.getElementById('header')?.setAttribute('style' , 'height:110px;background:transparent; box-shadow: transparent;overflow:hidden;')
        styleScrollBtn?.current?.setAttribute('style' , 'display:none;')
        var downNavImgCont = document.querySelectorAll('#downNavImgCont')
        for (var i=0; i < downNavImgCont.length; i++) {
          downNavImgCont[i].setAttribute('style' , 'height:120px;')
        }
        var downImg = document.querySelectorAll('#downNavImg')
        for (var i=0; i < downImg.length; i++) {
          downImg[i].setAttribute('style' , 'height:70px;')
        }
        var buttonNav = document.querySelectorAll('.buttonNav')
        for (var i=0; i < buttonNav.length; i++) {
          buttonNav[i].setAttribute('style' , 'height:110px;')
        }
      } 
      
    });
  } 
  const handleClose4 = () => {
      setOpen4(false);
  };

  

  const [openSMS, setOpenSMS] = React.useState(false);

  const handleOpenSMS = () => {
      setOpenSMS(true);
  }

  const handleCloseSMS = () => {
      setOpenSMS(false);
  }
  


  const  scrolltoTop = () =>  {
    window.scroll(0,0)
  }




    return (
    <>
        {loader ? <Loader/> :
        <div className="AllCont">
          <button type="button" ref={styleScrollBtn} style={styleBtn} onClick={() => scrolltoTop()}><img src={arrowScroll} width="30px" height="auto"/></button>
          {!MidNavbar &&  <button type="button" className='checkMBtnC' style={checkMBtn} onClick={() => handleOpen()}><ShoppingBasketIcon width='60px' height='60px'/> {FinalPrice > 0 && (FinalPrice + " ₼")}</button> }

          <TopNavbar TopCategory={TopCategory} number2={number2} number1={number1} UserData={UserData}  modalOpener={handleOpen} modalOpener3={handleOpen3}/>
          {MidNavbar && <Navbar/>}
          <header id="header" className="header">
              <TopNavbarPart2  number2={number2} number1={number1} UserData={UserData}   modalOpener={handleOpen} modalOpener3={handleOpen3}/>
              {MidNavbar && <DownNavbar  TopCategory={TopCategory}/>}
          </header>
          <ScrolltoTop/>
              {children}
          <Footer/>

        <Modal  
            style={{display:"flex", justifyContent:"center",overflow:"auto"}}
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {<CardPage   functionOpenCheckoutPage={handleOpen2} functionClose={() => handleClose()}  />}
        </Modal>

        <Modal  
            style={{display:"flex", justifyContent:"center",overflow:"auto"}}
            open={open2}
            onClose={handleClose2}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {<CheckoutPage UserId={UserData?.id} functionClose={() => handleClose2()}  numberStar="3.5"/>}
        </Modal>

        <Modal  
            style={{display:"flex", justifyContent:"center",overflow:"auto"}}
            open={OpenLogin}
            // onClose={handleClose3}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {<LoginPage functionClose={() => handleClose3()}  registerFunc={() => handleOpen4()}/>}
        </Modal>

        <Modal  
            style={{display:"flex", justifyContent:"center",overflow:"auto"}}
            open={open4}
            // onClose={handleClose4}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {<Registration functionCloseReg={() => handleClose4()}  />}
        </Modal>
        
        <Modal  
            style={{display:"flex", justifyContent:"center",overflow:"auto"}}
            open={openSMS}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            {<AuthSmsL functionClose={() => handleCloseSMS() }  tillCount={tillCount}/>}
        </Modal>
        </div>
        }
        </>
    );
};
export default Layout;
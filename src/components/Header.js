import React, { useEffect, useState, useContext } from 'react'
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
import About from './About'
import ReviewPage from '../pages/ReviewPage'
import CheckoutPage from '../pages/CheckoutPage'
import LoginPage from '../pages/LoginPage'
import Registration from '../pages/Registration'
import arrowScroll from '../assets/images/scrollArrow.png'
import F04 from '../components/F04'
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

function Header() {
  const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang ,  money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)


  // const TopNavbar = useMediaQuery('(min-width:600px)');
  const MidNavbar = useMediaQuery('(min-width:622px)');



  const notifyLOGIN = () => toast.warn("Hesabınıza daxil olun və yaxud yeni hesab yaradın!");
  const notifyTC = (till) => toast.warn(`${till/60} dəqiqə sonra yenidən cəhd edin`);


  const [tillCount, settillCount] = useState(null)
  const smsHandle = () => {
    axios.post('https://nehra.az/public/api/resendsms' , {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id})
    .then(res => (res.status ===200 && ((res.data <= 0 && handleOpenSMS()) , notifyTC(res.data) , console.log(res.data))) )
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




  const [UserData, setUserData] = useState(0)
  const [Assortment, setAssortment] = useState([])
  const [TopCategory, setTopCategory] = useState([])
  const assortmentArr = []
  const sendGetRequest6 = async () => {
    try {
        const resp1 = await axios.get('https://nehra.az/public/api/assortment')
        setAssortment(resp1.data)
        const resp2 = await axios.get('https://nehra.az/public/api/featuredcats')
        setTopCategory(resp2.data)
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  };
  
  
  useEffect(() => {
    if (UserData?.id === undefined) {
      setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
    }
  })
  
  Assortment.map(assortment => ( assortmentArr.push( <AssortmentCard id={assortment.id} title={assortment.name} desc={assortment.count} image={assortment.thumb}/>)))
  const styleBtn =  {
    position: "fixed",
    width: "60px",
    height: "60px",
    backgroundColor: "#aebaa3",
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
    backgroundColor: "#aebaa3",
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

  const [statusOK, setstatusOK] = useState()
  const handleOpen3 = () => {
    UserData?.id !== undefined ? axios.get(`https://nehra.az/public/api/checkstatus?user_id=${UserData?.id}`)
                                      .then(res => (res.data == 1 ? window.location.href = '/memberarea'  : notifyAuth())) 
                                      :  setOpen3(true)
  }
  
  useEffect(() => {
    axios.get(`https://nehra.az/public/api/checkstatus?user_id=${JSON.parse(localStorage.getItem('LoginUserData'))?.id}` )
         .then(res =>  setstatusOK(res.data))
  }, []) 

  const handleClose3 = () => {
    setOpen3(false)  
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
      const resp = await axios.get('https://nehra.az/public/api/settings')
      setNumber1(resp.data.phone1) 
      setNumber2(resp.data.phone2)
      if (resp.data.lang === null || resp.data.lang === undefined || resp.data.lang === "" ) {
          sessionStorage.setItem('lang' , 'AZ')
      }
      setlang((resp.data.lang === "az" && "AZ") || (resp.data.lang === "en" && "EN") || (resp.data.lang === "ru" && "RU"))
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };

  useEffect(() => {
    sendGetRequest10()
    sendGetRequest6()
  } , [] )

  const handleClose4 = () => {
      setOpen4(false);
  };

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
          
      }
      else if (window.scrollY < 201)
      {
        document?.getElementById('downPart')?.setAttribute('style' , 'background:transparent;height:0px;padding-top: 0px;padding-bottom: 0px;overflow:hidden;')
        document?.getElementById('logoNehre')?.setAttribute('style' , 'opacity:0;pointer-events:none;')  
        document?.getElementById('downCont')?.setAttribute('style' , 'padding-top: 0px;padding-bottom: 0px;')
        document?.getElementById('header')?.setAttribute('style' , 'height:110px;background:transparent; box-shadow: transparent;overflow:hidden;')
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
  
  

  const  scrolltoTop = () =>  {
    window.scroll(0,0)
  }
  const [PaymentPrice, setPaymentPrice] = useState(0)
  const [NumberOfGoods, setNumberOfGoods] = useState(0)
  const [ParcelWeight, setParcelWeight] = useState(0)


  const [openSMS, setOpenSMS] = React.useState(false);

  const handleOpenSMS = () => {
      setOpenSMS(true);
  }

  const handleCloseSMS = () => {
      setOpenSMS(false);
  }
  



    return (
        <Router>
            <ScrolltoTop/>
            <div className="AllCont">
                <button type="button" style={styleBtn} onClick={() => scrolltoTop()}><img src={arrowScroll} width="30px" height="auto"/></button>
               { !MidNavbar &&  <button type="button" className='checkMBtnC' style={checkMBtn} onClick={() => handleOpen()}><ShoppingBasketIcon width='60px' height='60px'/> {FinalPrice > 0 && (FinalPrice + " ₼")}</button> }

                <TopNavbar TopCategory={TopCategory} assortmentArr={Assortment} PaymentPrice={PaymentPrice} number2={number2} number1={number1} UserData={UserData}  modalOpener={handleOpen} modalOpener3={handleOpen3}/>
                {MidNavbar && <Navbar/>}
                <header id="header" className="header">
                    <TopNavbarPart2 PaymentPrice={PaymentPrice} number2={number2} number1={number1} UserData={UserData}   modalOpener={handleOpen} modalOpener3={handleOpen3}/>
                    {MidNavbar && <DownNavbar  TopCategory={TopCategory}/>}
                </header>
                <Switch>
                    <Route  path="/combos/:slug" >                <Combo/>                                                                                      </Route>
                    <Route   path={`/category/:id`}>            <ProductListingPage  PaymentPrice={PaymentPrice} />                                               </Route>
                    <Route   path="/about" >                    <About/>                                                                                          </Route>
                    <Route   path="/contact" >                  <Contacts/>                                                                                       </Route>
                    <Route   path="/public/forgetpassword" >           <ForgetPassword/>                                                                                       </Route>
                    <Route   path="/who" >                      <Who/>                                                                                            </Route>
                    <Route   path="/quality" >                  <Quality/>                                                                                        </Route>
                    <Route   path="/reviews" >                  <ReviewPage/>                                                                                     </Route>
                    <Route   path="/search" >                   <SearchResult/>                                                                                   </Route>
                    <Route   path="/memberarea">                {(UserData?.id !== undefined  && parseInt(statusOK) === 1) &&  <MemberArea  UserData={UserData}/>  }               </Route>
                    <Route   path="/promotions" >                <ProductListingPage category="Promotional products" notags={1}/>                                  </Route>
                    <Route   path="/suppliers/:id" >             <SelectedSupplier/>                                                                               </Route>
                    <Route   path="/suppliers" >                 <Suppliers/>                                                                                      </Route>
                    <Route   exact path="/" >                          <HomePage assortmentArr={assortmentArr} modalOpener3={handleOpen3} productModal={handleOpen}/>                              </Route>
                    <Route   path="*"><F04 /></Route>
                </Switch>
                
                <Footer/>
            </div>
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
                open={open3}
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

        </Router>
    )
}

export default Header

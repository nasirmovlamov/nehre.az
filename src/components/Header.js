import React, { useEffect, useState } from 'react'
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
import ScrolltoTop from './ScrolltoTop'
import Suppliers from './Suppliers'
import SelectedSupplier from './SelectedSupplier'
import Footer from './Footer'
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
function Header() {
  
  const [UserData, setUserData] = useState(0)
  const [Assortment, setAssortment] = useState([])
  const [TopCategory, setTopCategory] = useState([])
  const assortmentArr = []
  const sendGetRequest6 = async () => {
    try {
        const resp = await axios.get('https://nehra.az/public/api/assortment')
        setAssortment(resp.data)
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
  };
  const sendGetRequestTopCategory = async () => {
    try {
        const resp = await axios.get('https://nehra.az/public/api/featuredcats')
        setTopCategory(resp.data)
    } catch (err) {
        console.error(err);
    }
  };
  
  useEffect(() => {
    if (UserData?.id === undefined) {
      setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
    }
  })
  Assortment.map(assortment => ( assortmentArr.push( <AssortmentCard title={assortment.name} desc={assortment.count} image={assortment.thumb}/>)))
  const styleBtn =  {
    position: "fixed",
    width: "60px",
    height: "60px",
    backgroundColor: "#285999",
    bottom:"50px",
    right:"50px",
    border:'none',
    borderRadius: '50%',
    zIndex: 99
  }
  const [open, setOpen]   = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  }
  
  const handleClose2 = () => {
    setOpen2(false);
  };
  const  history = useHistory();
  const handleOpen3 = () => {
    UserData?.id !== undefined ? window.location.href = '/memberarea'  : setOpen3(true);
  }
  
  const handleClose3 = () => {
    setOpen3(false)  
  };
  const handleOpen4 = () => {
    setOpen4(true);
  }
  
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)
  
  
  
  const sendGetRequest10 = async () => {
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
    sendGetRequest10()
    sendGetRequest6()
    sendGetRequestTopCategory()
  } , [] )
  const handleClose4 = () => {
        setOpen4(false);
    };

    window.addEventListener("scroll", function(){
        if (window.scrollY > 211)
        {
            document?.getElementById('header').setAttribute('style' , 'transition:  0.2s  height;height:115px;box-shadow: 0 2px 2px -2px rgba(0,0,0,.4);overflow:inherit;')
            document?.getElementById('downPart').setAttribute('style' , 'background:#f0f4f5;height:85.17px;transition:0.5s height padding;overflow:inherit;')
            document?.getElementById('logoNehre').setAttribute('style' , 'opacity:1;pointer-events:all;')
            document?.getElementById('downCont').setAttribute('style' , 'padding-top: 20px;padding-bottom: 20px;transition:0.5s height padding;')
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
          document?.getElementById('downPart')?.setAttribute('style' , 'background:transparent;height:0px;transition:0.3s;padding-top: 0px;padding-bottom: 0px;overflow:hidden;')
          document?.getElementById('logoNehre')?.setAttribute('style' , 'opacity:0;transition:0.1s opacity;pointer-events:none;')  
          document?.getElementById('downCont')?.setAttribute('style' , 'padding-top: 0px;padding-bottom: 0px;')
          document?.getElementById('header')?.setAttribute('style' , 'height:110px;background:transparent;transition:  0.5s  height; box-shadow: transparent;overflow:hidden;')
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
    return (
        <>

            <ScrolltoTop/>
           
            <div className="AllCont">
                <button type="button" style={styleBtn} onClick={() => scrolltoTop()}><img src={arrowScroll} width="30px" height="auto"/></button>
                <TopNavbar PaymentPrice={PaymentPrice} number2={number2} number1={number1} UserData={UserData}  modalOpener={handleOpen} modalOpener3={handleOpen3}/>
                <Navbar/>

                <header id="header" className="header">
                    <TopNavbarPart2 PaymentPrice={PaymentPrice} number2={number2} number1={number1} UserData={UserData}   modalOpener={handleOpen} modalOpener3={handleOpen3}/>
                    <DownNavbar  TopCategory={TopCategory}/>
                </header>


                <Switch>
                    <Route   path={`/category/:id`}>              <ProductListingPage  PaymentPrice={PaymentPrice} />                  </Route>
                    <Route   path="/about" >                   <About/>                                                                 </Route>
                    <Route   path="/reviews" >                 <ReviewPage/>                                                            </Route>
                    <Route   path="/memberarea">      { UserData?.id !== undefined  ?  <MemberArea  UserData={UserData}/> : <F04/> }    </Route>
                    <Route  path="/promotions" >              <ProductListingPage category="Promotional products" notags={1}/>          </Route>
                    <Route  path="/suppliers/:id" >      <SelectedSupplier/>                                                            </Route>
                    <Route  path="/suppliers" >               <Suppliers/>                                                              </Route>
                    <Route  path="/" >                        <HomePage NumberOfGoods={NumberOfGoods} setNumberOfGoods={setNumberOfGoods} ParcelWeight={ParcelWeight} setParcelWeight={setParcelWeight} setPaymentPrice={setPaymentPrice}  PaymentPrice={PaymentPrice} assortmentArr={assortmentArr} modalOpener3={handleOpen3}/>        </Route>
                </Switch>
                
                <Footer/>
            </div>
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<CardPage ParcelWeight={ParcelWeight} setParcelWeight={setParcelWeight} NumberOfGoods={NumberOfGoods} setNumberOfGoods={setNumberOfGoods} PaymentPrice={PaymentPrice} setPaymentPrice={setPaymentPrice} functionOpenCheckoutPage={handleOpen2} functionClose={() => handleClose()}  numberStar="3.5"/>}
            </Modal>

            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<CheckoutPage ParcelWeight={ParcelWeight} setParcelWeight={setParcelWeight} NumberOfGoods={NumberOfGoods} setNumberOfGoods={setNumberOfGoods} PaymentPrice={PaymentPrice} functionClose={() => handleClose2()}  numberStar="3.5"/>}
            </Modal>

            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open3}
                onClose={handleClose3}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<LoginPage functionClose={() => handleClose3()}  registerFunc={() => handleOpen4()}/>}
            </Modal>
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open4}
                onClose={handleClose4}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<Registration functionClose={() => handleClose4()}  />}
            </Modal>

        </>
    )
}

export default Header

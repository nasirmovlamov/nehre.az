import React from 'react'
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
    useLocation
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

function Header() {

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
    const [open, setOpen] = React.useState(false);
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
    const handleOpen3 = () => {
        setOpen3(true);
      }
      
    const handleClose3 = () => {
        setOpen3(false);
    };
    const handleOpen4 = () => {
        setOpen4(true);
      }
      
    const handleClose4 = () => {
        setOpen4(false);
    };

    window.addEventListener("scroll", function(){
        if (window.scrollY > 211)
        {
            document.getElementById('header').setAttribute('style' , 'transition:  0.2s  height;height:115px;box-shadow: 0 2px 2px -2px rgba(0,0,0,.4);overflow:inherit;')
            document.getElementById('downPart').setAttribute('style' , 'background:#f0f4f5;height:85.17px;transition:0.5s height padding;overflow:inherit;')
            document.getElementById('logoNehre').setAttribute('style' , 'opacity:1;pointer-events:all;')
            document.getElementById('downCont').setAttribute('style' , 'padding-top: 20px;padding-bottom: 20px;transition:0.5s height padding;')
            var downNavImgCont = document.querySelectorAll('#downNavImgCont')
            for (var i=0; i < downNavImgCont.length; i++) {
              downNavImgCont[i].setAttribute('style' , 'height:0px;')
            }
            var downImg = document.querySelectorAll('#downNavImg')
            for (var i=0; i < downImg.length; i++) {
              downImg[i].setAttribute('style' , 'height:0px;')
            }
            var buttonNav = document.querySelectorAll('.buttonNav')
            for (var i=0; i < buttonNav.length; i++) {
              buttonNav[i].setAttribute('style' , 'height:30px;padding-bottom:0px;')
            }
            
        }
        else if (window.scrollY < 201)
        {
          document.getElementById('downPart').setAttribute('style' , 'background:transparent;height:0px;transition:0.3s;padding-top: 0px;padding-bottom: 0px;overflow:hidden;')
          document.getElementById('logoNehre').setAttribute('style' , 'opacity:0;transition:0.1s opacity;pointer-events:none;')  
          document.getElementById('downCont').setAttribute('style' , 'padding-top: 0px;padding-bottom: 0px;')
          document.getElementById('header').setAttribute('style' , 'height:110px;background:transparent;transition:  0.5s  height; box-shadow: transparent;overflow:hidden;')
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
    return (
        <Router>

                    <ScrolltoTop/>
           
            <div className="AllCont">
                <button type="button" style={styleBtn} onClick={() => scrolltoTop()}></button>

                <TopNavbar modalOpener={handleOpen} modalOpener3={handleOpen3}/>
                <Navbar/>

                <header id="header" className="header">
                    <TopNavbarPart2 modalOpener={handleOpen} modalOpener3={handleOpen3}/>
                    <DownNavbar/>
                </header>


                <Switch>
                    <Route path="/milk-cheese">              <ProductListingPage category="Milk, cheese,  poultry"/>                  </Route>
                    <Route path="/meat" >                    <ProductListingPage category="Meat and poultry"/>                        </Route>
                    <Route path="/fruits" >                  <ProductListingPage category="Vegetables and fruits"/>                   </Route>
                    <Route path="/bread" >                   <ProductListingPage category="Cooking and bread"/>                       </Route>
                    <Route path="/fish" >                    <ProductListingPage category="Fish"/>                                    </Route>
                    <Route path="/freezed" >                 <ProductListingPage category="Freezed"/>                                 </Route>
                    <Route path="/non-food" >                <ProductListingPage category="Non food"/>                                </Route>
                    <Route path="/about" >                   <About/>                                                                 </Route>
                    <Route path="/reviews" >                 <ReviewPage/>                                                            </Route>
                    <Route path="/memberarea" >              <MemberArea/>                                                            </Route>
                    <Route path="/promotions" >              <ProductListingPage category="Promotional products" notags={1}/>         </Route>
                    <Route path="/suppliers/supplier" >      <SelectedSupplier/>                                                      </Route>
                    <Route path="/suppliers" >               <Suppliers/>                                                             </Route>
                    <Route path="/" >                        <HomePage/>                                                              </Route>
                </Switch>
                
                <Footer/>
            </div>
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<CardPage functionOpenCheckoutPage={handleOpen2} functionClose={() => handleClose()}  numberStar="3.5"/>}
            </Modal>

            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open2}
                onClose={handleClose2}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<CheckoutPage functionClose={() => handleClose2()}  numberStar="3.5"/>}
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

        </Router>
    )
}

export default Header

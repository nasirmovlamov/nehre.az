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
    Link
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

function Header() {
    
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

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
    window.addEventListener("scroll", function(){
        if (window.scrollY > 150)
        {
            document.getElementById('header').setAttribute('style' , 'transition:0.5s box-shadow;box-shadow: 0 2px 2px -2px rgba(0,0,0,.4);;')
        }
        else if (window.scrollY < 150)
        {
          document.getElementById('header').setAttribute('style' , 'background:transparent;transition:0.5s background;box-shadow: transparent;')
        } 
        if (window.scrollY > 150)
        {
          document.getElementById('downPart').setAttribute('style' , 'background:#f0f4f5;transition:0.5s background;')
          document.getElementById('logoNehre').setAttribute('style' , 'opacity:1;transition:1s opacity;pointer-events:all;')
        }
        else if (window.scrollY < 150)
        {
          document.getElementById('downPart').setAttribute('style' , 'background:transparent;transition:0.5s background;box-shadow: transparent;')
          document.getElementById('logoNehre').setAttribute('style' , 'opacity:1;transition:0.5s opacity;')
          document.getElementById('logoNehre').setAttribute('style' , 'opacity:0;transition:0.5s opacity;pointer-events:none;')  
        } 
      });
    return (
        <Router>
                    <ScrolltoTop/>
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

            <div className="AllCont">
            <TopNavbar />

                <header id="header" className="header">
                    <TopNavbarPart2 modalOpener={handleOpen}/>
                </header>
                <DownNavbar/>


                <Switch>
                    <Route path="/milk-cheese">           <ProductListingPage category="Milk, cheese,  poultry"/>        </Route>
                    <Route path="/meat" >                   <ProductListingPage category="Meat and poultry"/>              </Route>
                    <Route path="/fruits" >                  <ProductListingPage category="Vegetables and fruits"/>         </Route>
                    <Route path="/bread" >                  <ProductListingPage category="Cooking and bread"/>             </Route>
                    <Route path="/fish" >                    <ProductListingPage category="Fish"/>                             </Route>
                    <Route path="/freezed" >                <ProductListingPage category="Freezed"/>                         </Route>
                    <Route path="/non-food" >              <ProductListingPage category="Non food"/>                       </Route>
                    <Route path="/about" >                  <About/>                                                                </Route>
                    <Route path="/reviews" >                <ReviewPage/>                                                        </Route>
                    <Route path="/memberarea" >           <MemberArea/>                                                       </Route>
                    <Route path="/promotions" >            <ProductListingPage category="Promotional products" notags={1}/>                      </Route>
                    <Route path="/suppliers/supplier" >    <SelectedSupplier/>                                                    </Route>
                    <Route path="/suppliers" >               <Suppliers/>                                                   </Route>
                    <Route path="/" >                          <HomePage/>                                                    </Route>
                </Switch>
                
                <Footer/>
            </div>

        </Router>
    )
}

export default Header

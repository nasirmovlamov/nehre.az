import React from 'react'
import "../assets/css/header.css"
import HomePage from '../pages/HomePage'
import DownNavbar from './DownNavbar'
import Navbar from './Navbar'
import TopNavbar from './TopNavbar'
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

function Header() {
    
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      }
      
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Router>
                    <ScrolltoTop/>
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<CardPage functionClose={() => handleClose()}  numberStar="3.5"/>}
            </Modal>

            <div className="AllCont">
                <header className="header">
                    <TopNavbar modalOpener={handleOpen}/>
                    <Navbar/>
                    <DownNavbar/>
                </header>


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

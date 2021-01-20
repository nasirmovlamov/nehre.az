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
function Header() {
    return (
        <Router>
                    <ScrolltoTop/>

            <div className="AllCont">
                <header className="header">
                    <TopNavbar/>
                    <Navbar/>
                    <DownNavbar/>
                </header>


                <Switch>
                    <Route path="/milk-cheese">              <ProductListingPage category="Milk, cheese,  poultry"/>        </Route>
                    <Route path="/meat" >                    <ProductListingPage category="Meat and poultry"/>              </Route>
                    <Route path="/fruits" >                  <ProductListingPage category="Vegetables and fruits"/>         </Route>
                    <Route path="/bread" >                   <ProductListingPage category="Cooking and bread"/>             </Route>
                    <Route path="/fish" >                    <ProductListingPage category="Fish"/>                          </Route>
                    <Route path="/freezed" >                 <ProductListingPage category="Freezed"/>                       </Route>
                    <Route path="/non-food" >                <ProductListingPage category="Non food"/>                      </Route>
                    <Route path="/suppliers/supplier" >      <SelectedSupplier/>                                                    </Route>
                    <Route path="/suppliers" >               <Suppliers/>                                                   </Route>
                    <Route path="/" >                        <HomePage/>                                                    </Route>
                </Switch>
                
                <Footer/>
            </div>

        </Router>
    )
}

export default Header

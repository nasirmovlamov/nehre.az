import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ProductListingProvider} from './components/ProductListingProvider'
import Layout from './components/Layout';
import React, { useEffect, useState, useContext, useRef } from 'react'

import HomePage from './pages/HomePage';
import About from './pages/About';
import ProductListingPage from './pages/ProductListingPage';
import Combo from './pages/Combo';
import Contact from './pages/Contact';
import ForgetPassword from './pages/ForgetPassword';
import Who from './pages/Who';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Quality from './pages/Quality';
import ReviewPage from './pages/ReviewPage';
import F04 from './pages/F04';

import SearchResult from './components/SearchResult';
import SelectedSupplier from './components/SelectedSupplier';
import Suppliers from './components/Suppliers';
import Contacts from './components/Contacts';
import MemberArea from './components/MemberArea';



function App() {
  
  return (
    <ProductListingProvider>
      <Router>
          <Layout>
            <Switch>
              <Route   exact  path="/">                 <HomePage />                </Route>
              <Route   path="/memberarea">              <MemberArea  />               </Route>
              <Route   path="/combos/:slug" >           <Combo/>                    </Route>
              <Route   path="/category/:id">            <ProductListingPage />      </Route>
              <Route   path="/about" >                  <About/>                    </Route>
              <Route   path="/elaqe" >                  <Contact/>                  </Route>
              <Route   path="/public/forgetpassword" >  <ForgetPassword/>           </Route>
              <Route   path="/who" >                    <Who/>                      </Route>
              <Route   path="/privacy-policy" >         <PrivacyPolicy/>            </Route>
              <Route   path="/quality" >                <Quality/>                  </Route>
              <Route   path="/reviews" >                <ReviewPage/>               </Route>
              <Route   path="/search" >                 <SearchResult/>             </Route>
              <Route   path="/suppliers/:id" >          <SelectedSupplier/>         </Route>
              <Route   path="/suppliers" >              <Suppliers/>                </Route>
              <Route   path="*">                        <F04  />                    </Route>
            </Switch> 
          </Layout>
      </Router>
    </ProductListingProvider>

  );
}

export default App;

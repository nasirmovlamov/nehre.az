import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ProductListingProvider} from './components/ProductListingProvider'
import Layout from './components/Layout';
import React from 'react'

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
import { ProtectedRoute } from './pages/Protected';
import Routing from './pages/Routing';


function App() {
  
  return (
    <Router>
      <ProductListingProvider>
          <Routing/>
      </ProductListingProvider>
    </Router>

  );
}

export default App;

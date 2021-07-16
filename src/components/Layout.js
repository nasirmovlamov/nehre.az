import React, { useEffect, useState, useContext, useRef } from 'react'
import "../assets/css/header.css"
import ScrolltoTop from './ScrolltoTop'
import {ProductListingProvider} from './ProductListingProvider'
import {ProductListingContext} from '../components/ProductListingProvider'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  const context = useContext(ProductListingContext)
  const {UserData , setUserData , ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,setmoney, setItems, setMinOrder,loader, setloader , UserStatus, setUserStatus ,  setnumber2, setnumber1, number1, number2 , setTopCategory, TopCategory} = context
  
  const  scrolltoTop = () =>  {
    window.scroll(0,0)
  }

  return (
      <div className="AllCont">
        <ScrolltoTop/>
        <Header/>
            {children}
        <Footer/>
      </div>
  );
};
export default Layout;
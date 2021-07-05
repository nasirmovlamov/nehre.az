import React , {useContext, useState} from 'react'
import "../assets/css/navbar.css"
import {Link} from "react-router-dom"
import {ProductListingContext} from '../components/ProductListingProvider'
import { useEffect } from 'react'

function Navbar(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData , FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
    const styleHide = {
        height: '0px',
        paddingTop:'0px',
        paddingBottom:'0px',
        marginBottom:'0px',
        marginTop:'0px',
        overflow:'hidden'
    }
    const styleScale = {
        transform:'scale(0)'
    }
    


    return (
        <nav className="navbar" style={props.scrollValue > 0 ? styleHide : {}}>
                <Link style={props.scrollValue > 0 ? styleScale : {}} to="/category/999">{(lang === "AZ" && `Endirimlər`) || (lang === "EN" && `Discounts`) || (lang === "RU" && `Скидки`)}</Link>
                <Link style={props.scrollValue > 0 ? styleScale : {}} to="/suppliers">{(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Suppliers`) || (lang === "RU" && `Поставщики`)}</Link>
                <div className='dropCont'> 
                    <p style={props.scrollValue > 0 ? styleScale : {}} className='dropTitle'>{(lang === "AZ" && `Haqqımızda`) || (lang === "EN" && `About us`) || (lang === "RU" && `О нас`)}</p>
                    <div className='dropMenu'> 
                        <Link style={props.scrollValue > 0 ? styleScale : {}} to='/who' className='dropSubTitle'> {(lang === "AZ" && `Biz kimik`) || (lang === "EN" && `Who we are`) || (lang === "RU" && `Кто мы`)}</Link>
                        <Link style={props.scrollValue > 0 ? styleScale : {}} to='/suppliers' className='dropSubTitle'> {(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Suppliers`) || (lang === "RU" && `Скидки`)}</Link>
                        <Link style={props.scrollValue > 0 ? styleScale : {}} to='/quality' className='dropSubTitle'> {(lang === "AZ" && `Keyfiyyət`) || (lang === "EN" && `Quality`) || (lang === "RU" && `Качество`)}</Link>
                    </div>
                </div>
                <Link style={props.scrollValue > 0 ? styleScale : {}} to="/elaqe">{(lang === "AZ" && `Əlaqə`) || (lang === "EN" && `Contact`) || (lang === "RU" && `Контакт`)}</Link>
        </nav>
    )
}

export default Navbar

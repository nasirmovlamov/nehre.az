import React, {useEffect, useState, useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'

import "../assets/css/supplierCard.css"
import {
    Link,
  } from "react-router-dom";
function SupplierCard(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const imgHandler = {
        background: `url('https://nehra.az/storage/app/public/${props.image}') no-repeat`,
        backgroundPosition: "top",
        backgroundSize: "100%",
    }
    const imgHandler2 = {
        background: `url(${props.image2}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    const imgHandler3 = {
        background: `url(${props.image3}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <Link to={`/suppliers/${props.id}`} className="supplierCard">
            <div className="imgAndAbout">
                <div className="imgAvatar" style={imgHandler}></div>
                <div>
                    <p className="title">{props.title}</p>
                    <p className="subTitle">{props.supplier} <span style={{color:"rgba(0,0,0,0.5)"}}>  {(lang === "AZ" && `Kəndli`) || (lang === "EN" && `Supplier`) || (lang === "RU" && `Поставщик`)}</span> </p>    
                </div>    
            </div>

            <div className="twoImgCont">
                <div className="productImg" style={imgHandler2}></div>
                <div className="productImg" style={imgHandler3}></div>
            </div>
        </Link>
    )
}

export default SupplierCard

function Promotions() {
import React from 'react'
import "../assets/css/promotions.css"
import ItemCard from './ItemCard'    
import Products from './Products'    
    return (
        <div className="promotionsCont" >
            
            <div className="promotions">
                <p className="category"> <span> {(sessionStorage.getItem('lang') === "AZ" && `əsas səhifə`) || (sessionStorage.getItem('lang') === "EN" && `home`) || (sessionStorage.getItem('lang') === "RU" && `главная`)} •</span>   {(lang === "AZ" && `Endirimlər`) || (lang === "EN" && `Promotions`) || (lang === "RU" && `Акции`)}</p>
                <p className="suppliersTitle">{(lang === "AZ" && `Endirimlərlə tanış olun `) || (lang === "EN" && `Get acquainted with discounts`) || (lang === "RU" && `Ознакомьтесь со скидками`)}</p>
                <div className="products">
                    <Products/>
                </div>
            </div>
        </div>
    )
}

export default Promotions

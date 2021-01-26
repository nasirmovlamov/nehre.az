function Promotions() {
import React from 'react'
import "../assets/css/promotions.css"
import ItemCard from './ItemCard'    
import Products from './Products'    
    return (
        <div className="promotionsCont" >
            
            <div className="promotions">
                <p className="category"> <span>home •</span>  Promotions</p>
                <p className="suppliersTitle">Meet our suppliers</p>
                <div className="products">
                    <Products/>
                </div>
            </div>
        </div>
    )
}

export default Promotions

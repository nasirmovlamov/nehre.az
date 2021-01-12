import React from 'react'
import busket from "../assets/images/basket.svg"
import "../assets/css/buyButton.css"
function BuyButton() {
    return (
        <button className="buyButton">
            <img src={busket} alt="" width="30px" height="auto"/>
        </button>
    )
}

export default BuyButton

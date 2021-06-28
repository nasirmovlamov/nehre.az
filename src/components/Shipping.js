import React, {useEffect, useState, useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'

function Shipping() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    return (
        <div className="reviewCont aboutShipping">
            <p className="title">{(lang === "AZ" && `Çatdırılma haqqında`) || (lang === "EN" && `About delivery`) || (lang === "RU" && `О доставке`)} </p>
            <p className="subTitle"></p>
            <div className="aboutShippingText">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci libero possimus totam incidunt? Aut provident, quidem totam nesciunt qui repudiandae odio, officia, expedita veniam enim quisquam? Obcaecati magni blanditiis vel!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci libero possimus totam incidunt? Aut provident, quidem totam nesciunt qui repudiandae odio, officia, expedita veniam enim quisquam? Obcaecati magni blanditiis vel!</p>
            </div>
    </div>
    )
}

export default Shipping

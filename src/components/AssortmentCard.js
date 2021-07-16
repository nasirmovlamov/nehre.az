import React , {useContext} from 'react'
import "../assets/css/assortmentCard.css"
import {
    Link,
  } from "react-router-dom";
import {ProductListingContext} from '../components/ProductListingProvider'

function AssortmentCard(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const imgHandler = {
        background: `url('https://nehra.az/storage/app/public/${props.image}') no-repeat`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
    }
    return (
        <Link to={`/category/${props.id}`} className="assortmentCard" style={imgHandler}>
            <div  className="imgContAssortment"></div>
            <div className="overlay">
                <p className="assortSubTitle">{props.desc}  {(lang === "AZ" && `dan çox məhsulla xidmətinizdəyik`) || (lang === "EN" && ` with products , at your service`) || (lang === "RU" && ` с продуктами, к вашим услугам`)}</p>
                <p className="assortTitle">{props.title}</p>
            </div>
        </Link>
    )
}

export default AssortmentCard

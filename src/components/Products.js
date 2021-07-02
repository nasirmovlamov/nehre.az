import React, {useState , useContext} from 'react'
import "../assets/css/products.css"
import ItemCard from './ItemCard'
import xalisBal from "../assets/images/xalisBal.jpg"
import {ProductListingContext} from '../components/ProductListingProvider'

function Products(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  

    const ProductArr = []
    props.SupplierProduct.map(product => ProductArr.push(<ItemCard product={product !== undefined && product}/>)) 
    return (
        <div className="products">
            {props.SupplierProduct.length > 0 ? ProductArr : (lang === "AZ" && "Tədarükçünün məhsulu mövcud deyil" || lang === "EN" && `The supplier's product is not available` || lang === "RU" && `Товар поставщика недоступен`)}
        </div>
    )
}

export default Products

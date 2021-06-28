import React, {useState , useContext} from 'react'
import "../assets/css/products.css"
import ItemCard from './ItemCard'
import xalisBal from "../assets/images/xalisBal.jpg"
import {ProductListingContext} from '../components/ProductListingProvider'

function Products(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  

    const ProductArr = []
    if(props.SupplierProduct !== undefined)
    {
        props.SupplierProduct.map(product => ProductArr.push(<ItemCard delivery={product?.delivery} cardId={product?.id} image={product?.thumb}  title={product?.title}  desc={ (lang === "AZ" && product?.seller_data?.name) || (lang === "EN" && product?.seller_data?.name_en) || (lang === "RU" && product?.seller_data?.name_ru)}  unitType={product?.unit?.unit_id} unitId={product?.unit?.id}  unitAd={ (lang === "AZ" && product?.unit?.ad) || (lang === "EN" && product?.unit?.ad_en) || (lang === "RU" && product?.unit?.ad_ru)} price={Math.floor(product?.qiymet)} weight={product?.ceki_hecm}   discount={product?.discount} productModal={props?.productModal} bonus={product.cashback} star={product?.starsall}/>)) 
    }
    console.log(props.id)
    return (
        <div className="products">
            {props.SupplierProduct.length > 0 ? ProductArr : (lang === "AZ" && "Tədarükçünün məhsulu mövcud deyil" || lang === "EN" && `The supplier's product is not available` || lang === "RU" && `Товар поставщика недоступен`)}
        </div>
    )
}

export default Products

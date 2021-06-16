import React , {useContext} from 'react'
import "../assets/css/F04Page.css"
import F04img from '../assets/images/F04.svg'
import {ProductListingContext} from '../components/ProductListingProvider'

function F04() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    return (
        <div className="F04Page">
            <img src={F04img} alt="404" width="501"/>
            {(lang === "AZ" && `Axtarışınıza uyğun nəticə tapılmadı`) || (lang === "EN" && `No results found for your search`) || (lang === "RU" && `По вашему запросу ничего не найдено`)}</div>
    )
}

export default F04

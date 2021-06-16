import React , {useContext} from 'react'
import "../assets/css/navbar.css"
import {Link} from "react-router-dom"
import {ProductListingContext} from '../components/ProductListingProvider'

function Navbar() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId] = useContext(ProductListingContext)
    return (
        <nav className="navbar">
                <Link to="/promotions">{(lang === "AZ" && `Endirimlər`) || (lang === "EN" && `Discounts`) || (lang === "RU" && `Скидки`)}</Link>
                <Link to="/suppliers">{(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Suppliers`) || (lang === "RU" && `Поставщики`)}</Link>
                <div className='dropCont'> 
                    <p className='dropTitle'>{(lang === "AZ" && `Haqqımızda`) || (lang === "EN" && `About us`) || (lang === "RU" && `О нас`)}</p>
                    <div className='dropMenu'> 
                        <Link to='/who' className='dropSubTitle'> {(lang === "AZ" && `Biz kimik`) || (lang === "EN" && `Who we are`) || (lang === "RU" && `Кто мы`)}</Link>
                        <Link to='/suppliers' className='dropSubTitle'> {(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Suppliers`) || (lang === "RU" && `Скидки`)}</Link>
                        <Link to='/quality' className='dropSubTitle'> {(lang === "AZ" && `Keyfiyyət`) || (lang === "EN" && `Quality`) || (lang === "RU" && `Качество`)}</Link>
                        <Link to='/reviews' className='dropSubTitle'> {(lang === "AZ" && `Şərhlər`) || (lang === "EN" && `Comments`) || (lang === "RU" && `Комментарии`)}</Link>
                    </div>
                </div>
                <a href="/elaqe">{(lang === "AZ" && `Əlaqə`) || (lang === "EN" && `Contact`) || (lang === "RU" && `Контакт`)}</a>
        </nav>
    )
}

export default Navbar

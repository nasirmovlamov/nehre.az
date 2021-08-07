import React , {useContext} from 'react'
import "../assets/css/footer.css"
import logoFooter from "../assets/images/logo_footer.png"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import {ProductListingContext} from '../components/ProductListingProvider'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Footer() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    return (
        <footer>
            <div className="footerCont">
                <div className='elementsCont'> 
                    <h3>{(lang === "AZ" && `Müştərilər üçün`) || (lang === "EN" && `For customers`) || (lang === "RU" && `Заказчикам`)} </h3>
                    <Link to='/bonuses'>{(lang === "AZ" && `Bonuslar`) || (lang === "EN" && `Bonuses`) || (lang === "RU" && `Бонусы`)}  </Link>
                    <Link to='/privacy-policy' >{(lang === "AZ" && `Məxfilik Siyasəti`) || (lang === "EN" && `Privacy Policy`) || (lang === "RU" && `Политика конфиденциальности`)}  </Link>
                </div>
                
                <div className='elementsCont'>
                    <h3>{(lang === "AZ" && `Şirkət Haqqında`) || (lang === "EN" && `About the company`) || (lang === "RU" && `О компании`)}  </h3>
                    <Link to='/who'>{(lang === "AZ" && `Biz kimik ?`) || (lang === "EN" && `Who are we?`) || (lang === "RU" && `Кто мы?`)} </Link>
                    <Link to='/elaqe'>{(lang === "AZ" && `Əlaqə`) || (lang === "EN" && `Contact`) || (lang === "RU" && `Контакт`)} </Link>
                </div>
                    
                <div className='elementsCont'>
                    <h3>{(lang === "AZ" && `Partnyorlar`) || (lang === "EN" && `Partners`) || (lang === "RU" && `Партнеры`)} </h3>
                    <Link to='/suppliers'>{(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Suppliers`) || (lang === "RU" && `Поставщики`)}</Link>
                </div>
                
                <div className='elementsCont'>
                <h3>{(lang === "AZ" && `Əlaqə`) || (lang === "EN" && `Contact`) || (lang === "RU" && `Контакт`)}  </h3>
                    <a href='tel:012 310 00 65'>012 310 00 65</a>
                    <a href='tel:055 680 00 55'>055 680 00 55</a>
                    <a href='/google maps'>{(lang === "AZ" && `Siyəzən rayon Zarat kəndi`) || (lang === "EN" && `Zarat village of Siyazan region`) || (lang === "RU" && `Село Зарат Сиязанского района`)}</a>
                    <a href='mailto:info@nehra.az'>info@nehra.az</a>
                    <p  className="social"> <a href=""><FacebookIcon/></a>  <a href="https://www.instagram.com/nehra.az/"><InstagramIcon/></a>  <a href=""><TwitterIcon/></a> </p>
                </div>
                <img src={logoFooter} alt="" width="auto" height="120"/>
            </div>

        </footer>
    )
}

export default Footer

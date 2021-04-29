import React , {useContext} from 'react'
import "../assets/css/footer.css"
import logoFooter from "../assets/images/logo_footer.png"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import {ProductListingContext} from '../components/ProductListingProvider'


function Footer() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr] = useContext(ProductListingContext)

    return (
        <footer>
            <div className="footerCont">
                <div> 
                    <h3>{lang === "AZ" && `Müştərilər üçün` || lang === "EN" && `For customers` || lang === "RU" && `Заказчикам`} </h3>
                    <a href='/reviews'>{lang === "AZ" && `Rəylər` || lang === "EN" && `Reviews` || lang === "RU" && `Отзывы`} </a>
                    <a href='/bonuses'>{lang === "AZ" && `Bonuslar` || lang === "EN" && `Bonuses` || lang === "RU" && `Бонусы`}  </a>
                </div>
                
                <div>
                    <h3>{lang === "AZ" && `Şirkət Haqqında` || lang === "EN" && `About the company` || lang === "RU" && `О компании`}  </h3>
                    <a href='/who'>{lang === "AZ" && `Biz kimik ?` || lang === "EN" && `Who are we?` || lang === "RU" && `Кто мы?`} </a>
                    <a href='/elaqe'>{lang === "AZ" && `Əlaqə` || lang === "EN" && `Contact` || lang === "RU" && `Контакт`} </a>
                </div>
                    
                <div>
                    <h3>{lang === "AZ" && `Partnyorlar` || lang === "EN" && `Partners` || lang === "RU" && `Партнеры`} </h3>
                    <a href='/suppliers'>{lang === "AZ" && `Kəndlilər` || lang === "EN" && `The villagers` || lang === "RU" && `Сельчане`}</a>
                </div>
                
                <div>
                <h3>{lang === "AZ" && `Əlaqə` || lang === "EN" && `Contact` || lang === "RU" && `Контакт`}  </h3>
                    <a href='tel:+7 495  532 05 75'>+7 495  532 05 75 </a>
                    <a href='tel:+7 495  532 05 75'>+7 495  532 05 75 </a>
                    <a href='/google maps'>{lang === "AZ" && `Bakı, Qız qalası ev 6` || lang === "EN" && `Baku, Maiden Tower home 6 ` || lang === "RU" && `Баку, Девичья Башня, дом 6`}</a>
                    <a href='mailto:nehra.az@gmail.com'>nehra.az@gmail.com</a>
                    <p  className="social"> <a href=""><FacebookIcon/></a>  <a href=""><InstagramIcon/></a>  <a href=""><TwitterIcon/></a> </p>
                </div>
                <img src={logoFooter} alt="" width="auto" height="120"/>
            </div>

        </footer>
    )
}

export default Footer

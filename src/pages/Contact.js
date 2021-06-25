import React , {useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'
import '../assets/css/contactPage.css'
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
function Contact() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId] = useContext(ProductListingContext)

    return (
        <div className="productPage ContactPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`} • {lang === "AZ" && `Əlaqə` || lang === "EN" && `Contact` || lang === "RU" && `Контакт`}</span>  </p>
                        <h2 className="categoryName">{lang === "AZ" && `Əlaqə` || lang === "EN" && `Contact` || lang === "RU" && `Контакт`}</h2>
                </div>
            </div>

            <div className="contactPart">

                <div className="flex">
                    <div className="element">
                        <h2> {lang === "AZ" && `Müştəri Dəstəyi` || lang === "EN" && `Customer support` || lang === "RU" && `Служба поддержки`}</h2>
                        <a href="tel:+8 800 500 20 98">8 800 500 20 98</a>
                    </div>
                    
                    <div className="element">
                        <h2>{lang === "AZ" && `Poçt Ofisi` || lang === "EN" && `Post office` || lang === "RU" && `Почта России`}</h2>
                        <a href="mailto:feedback@esh-derevenskoe.ru">feedback@esh-derevenskoe.ru</a>
                    </div>
                </div>
                
                <div className="flex">
                    <div className="element">
                        <h2>{lang === "AZ" && `Sosial şəbəkələrdə bizimlə əlaqə saxlayın` || lang === "EN" && `Contact us on social networks` || lang === "RU" && `Свяжитесь с нами в социальных сетях`}</h2>
                        <div className="social">
                            <a href="#"><YouTubeIcon/></a>
                            <a href="#"><FacebookIcon/></a>
                            <a href="#"><TwitterIcon/></a>
                        </div>
                    </div>
                    
                    <div className="element">
                        <h2>{lang === "AZ" && `Tədarükçülər` || lang === "EN" && `Suppliers` || lang === "RU" && `Поставщики`}</h2>
                        <p>If you want to become our supplier, fill out the supplier's questionnaire and we will definitely contact you</p>
                    </div>
                </div>
                

                <div className="flexC">
                    <h2>{lang === "AZ" && `Bizim Ünvan` || lang === "EN" && `Our address` || lang === "RU" && `Наш адресс`}</h2>
                    <p>Moscow region, Dubna, Dmitrovskoe highway, 2a</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50813.48644554438!2d-115.83902651512547!3d37.251434614523255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80b81baaba3e8c81%3A0x970427e38e6237ae!2sArea%2051%2C%20NV%2C%20USA!5e0!3m2!1sen!2s!4v1624280403565!5m2!1sen!2s" width="100%" height="450" allowfullscreen="" loading="lazy"></iframe>
                </div>

                <div className="flexC">
                    <h2>{lang === "AZ" && `Hüquqi məlumatlar` || lang === "EN" && `Legal information` || lang === "RU" && `Легальная информация`}</h2>
                    <p>Limited Liability Company "Eish Derevenskoe" PSRN 1166952059284 INN 6910023032 KPP 501001001 Yur. address: 141985, Moscow region, Dubna, st. Builders, 12.</p>
                </div>
            </div>
        
        </div>
    )
}

export default Contact

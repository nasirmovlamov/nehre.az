import React , {useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'
import '../assets/css/contactPage.css'
import YouTubeIcon from '@material-ui/icons/YouTube';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

function Contact() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    return (
        <div className="productPage ContactPage pagescroll"> 
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
                        <a href="tel:+994123100065">  012 310 00 65</a>
                        <a href="tel:+994556800055">  055 680 00 55</a>
                    </div>  
                    <div className="element">
                        <h2>{lang === "AZ" && `Poçt Ofisi` || lang === "EN" && `Post office` || lang === "RU" && `Почта России`}</h2>
                        <a href="mailto:   info@nehra.az">   info@nehra.az</a>
                    </div>
                </div>
                
                <div className="flex">
                    <div className="element">
                        <h2>{lang === "AZ" && `Sosial şəbəkələrdə bizimlə əlaqə saxlayın` || lang === "EN" && `Contact us on social networks` || lang === "RU" && `Свяжитесь с нами в социальных сетях`}</h2>
                        <div className="social">
                            {/* <a href="#"><YouTubeIcon/></a>
                            <a href="#"><FacebookIcon/></a> */}
                            <a href="https://www.instagram.com/nehra.az/"><InstagramIcon/></a>
                        </div>
                    </div>
                    
                    <div className="element">
                        <h2>{lang === "AZ" && `Tədarükçülər` || lang === "EN" && `Suppliers` || lang === "RU" && `Поставщики`}</h2>
                        <p>{lang === "AZ" && `Təchizatçı olmaq istəyirsinizsə, təchizatçı anketini doldurun və mütləq sizinlə əlaqə quracağıq` || lang === "EN" && `If you want to become our supplier, fill out the supplier's questionnaire and we will definitely contact you` || lang === "RU" && `Если вы хотите стать нашим поставщиком, заполните анкету поставщика и мы обязательно с вами свяжемся.`}</p>
                    </div>
                </div>
                
                <div className="flexC">
                    <h2>{lang === "AZ" && `Bizim Ünvan` || lang === "EN" && `Our address` || lang === "RU" && `Наш адресс`}</h2>
                    <p>{lang === "AZ" && `Siyəzən rayon Zarat kəndi` || lang === "EN" && `Zarat village of Siyazan region` || lang === "RU" && `Село Зарат Сиязанского района`}</p>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13530.253397807128!2d49.27038622248594!3d40.948158636172046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403737e93831a7dd%3A0x96283791645b2572!2sZarat!5e0!3m2!1sen!2s!4v1626433915600!5m2!1sen!2s" width="100%" height="450" allowfullscreen="" loading="lazy"></iframe>
                </div>

                <div className="flexC">
                    <h2>{lang === "AZ" && `Hüquqi məlumatlar` || lang === "EN" && `Legal information` || lang === "RU" && `Легальная информация`}</h2>
                    <p>{lang === "AZ" && `Nehrə MMC` || lang === "EN" && `Nehra MMC` || lang === "RU" && `Nehra MMC`}</p>
                </div>
            </div>
        
        </div>
    )
}

export default Contact

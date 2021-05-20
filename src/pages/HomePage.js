import React, { useEffect ,useState, useContext} from 'react'
import "../assets/css/homePage.css"
import CardSlider1 from '../components/CardSlider1'
import assort1 from "../assets/images/assort1.jpg"
import assort2 from "../assets/images/assort2.jpg"
import assort3 from "../assets/images/assort3.png"
import assort4 from "../assets/images/assort4.png"
import assort5 from "../assets/images/assort5.png"
import assort6 from "../assets/images/assort6.jpg"
import assort7 from "../assets/images/assort7.png"
import assort8 from "../assets/images/assort8.png"
import assort9 from "../assets/images/assort9.jpg"
import assort10 from "../assets/images/assort10.jpg"
import assort11 from "../assets/images/assort11.jpg"
import assort12 from "../assets/images/assort12.jpg"
import gogerti from "../assets/images/gogerti.jpg"
import xalisBal from "../assets/images/xalisBal.jpg"
import topCard1 from "../assets/images/topCard1.jpg"
import topCard2 from "../assets/images/topCard2.jpg"
import topCard3 from "../assets/images/topCard3.jpg"
import videocover from "../assets/images/videocover.jpg"

import cardAboutImg1 from "../assets/images/cardAboutImg1.png"
import cardAboutImg2 from "../assets/images/cardAboutImg2.png"
import cardAboutImg3 from "../assets/images/cardAboutImg3.png"
import Button1 from '../components/Button1'
import AssortmentCard from '../components/AssortmentCard'
import testImg3 from "../assets/images/testImg3.jpg"    
import testImg4 from "../assets/images/testImg4.jpg"    
import testImg5 from "../assets/images/testImg5.jpg"    
import testVideo from "../assets/video/testVideo.mp4"
import avatar from "../assets/images/avatar.png"
import testImg6 from "../assets/images/testImg6.jpg"
import testImg7 from "../assets/images/testImg7.jpg"
import ItemCard from '../components/ItemCard'
import AnswersCard from '../components/AnswersCard'
import SupplierCard from '../components/SupplierCard'
import OurSlider from '../components/OurSlider'
import Footer from '../components/Footer'
import axios from 'axios'
import {Link} from "react-router-dom"
import CardPage from './CardPage'
import {ProductListingContext} from '../components/ProductListingProvider'


function HomePage(props) {
    
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr] = useContext(ProductListingContext)

    const topCards = []
    const newItems = []
    const specialOffers = []
    const suppliersCard = []
    const answerCard = []
    const [TopCards, setTopCards] = useState([])
    const [NewProducts, setProduct] = useState([])
    const [SpecialOffers, setSpecialOffers] = useState([])
    const [SuppliersCard, setSuppliersCard] = useState([])
    const [AnswerCard, setAnswerCard] = useState([])
    const [Banners1, setBanners1] = useState([])
    const [Banners2, setBanners2] = useState([])
    
    


    
    const sendGetRequest = async () => {
        try {
            const resp = await axios.get('https://nehra.az/public/api/newproducts')
            setProduct(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const sendGetRequest2 = async () => {
        try {
            const resp = await axios.get('https://nehra.az/public/api/specials')
            setSpecialOffers(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const sendGetRequest3 = async () => {
        try {
            const resp = await axios.get('https://nehra.az/public/api/manufacturerslider')
            setSuppliersCard(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    const sendGetRequest4 = async () => {
        try {
            const resp = await axios.get('https://nehra.az/public/api/slayder')
            setTopCards(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    const sendGetRequest5 = async () => {
        try {
            const resp = await axios.get('https://nehra.az/public/api/questions')
            setAnswerCard(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    
    const sendGetRequestBanners = async () => {
        try {
            const resp1 = await axios.get('https://nehra.az/public/api/banner/first_banner')
            setBanners1(resp1.data)
            const resp2 = await axios.get('https://nehra.az/public/api/banner/bonus_banner')
            setBanners2(resp2.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    
    useEffect(() => {
            sendGetRequest4();
            sendGetRequest5();
            sendGetRequest3();
            sendGetRequest();
            sendGetRequest2();
            sendGetRequestBanners()
    }, [])

    TopCards.map(bucket => ( topCards.push(             <CardSlider1 link={bucket.link} id={bucket.id} turndesc={bucket.turndesc} turnetrafli={bucket.turnetrafli}  turnoverlay={bucket.turnoverlay}  turntitle={bucket.turntitle}   name={bucket.name} image={bucket.image} desc={bucket.description}/>)))
    SuppliersCard.map(supply => ( suppliersCard.push(   <SupplierCard id={supply.id} image={supply.avatar} title={supply.name} supplier={supply.type_id} image2={testImg6} image3={testImg7}/>   )))
    AnswerCard.map(question => ( answerCard.push(       <AnswersCard  answer={question.description} question={question.name} />)))
    NewProducts.map(product =>  ( newItems.push(        <ItemCard delivery={product?.delivery} id={product?.id} NumberOfGoods={props?.NumberOfGoods}  modalOpener3={props.modalOpener3} cardId={product?.id} image={product?.thumb}  title={product?.title}  desc={product?.seller_id}  unitType={product?.unit.id} price={money === "₼" ? product?.qiymet : Math.floor(product?.qiymet / 1.7)} weight={product?.ceki_hecm}   discount={product?.discount} productModal={props?.productModal} id={product?.id}  star={product?.starsall}/>)))
    SpecialOffers.map(product =>( specialOffers.push(   <ItemCard delivery={product?.delivery} id={product?.id} NumberOfGoods={props?.NumberOfGoods}  modalOpener3={props.modalOpener3} cardId={product?.id} image={product?.thumb}  title={product?.title}  desc={product?.seller_id}  unitType={product?.unit.id} price={money === "₼" ? product?.qiymet : Math.floor(product?.qiymet / 1.7)}  weight={product?.ceki_hecm}  discount={product?.discount} productModal={props?.productModal}  id={product?.id}  star={product?.starsall}/>)))
    
    const bannerImg1 = {
        backgroundImage:`url(https://nehra.az/storage/app/public/${Banners1[0]?.image})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'top center',
    }
    const bannerImg2 = {
        backgroundImage:`url(https://nehra.az/storage/app/public/${Banners2[0]?.image})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'top center',
    }
    return (

        <div className="homePage">
            <div className="slider1">
               <OurSlider itemShow1={2} itemShow2={2} itemShow3={1} itemShow4={1} elements={topCards} speed={10000} numOfSld={2}/>
            </div>
            <p className="deliveryText">{lang === "AZ" && `Kəndlərimizdən evinizə təzə və təbii məhsulların çatdırılması!` || lang === "EN" && `Delivery of fresh and natural products from our villages to your home!` || lang === "RU" && `Доставка свежих и натуральных продуктов из наших деревень к вам домой!`}</p>
            
            <a href={`${Banners1[0]?.link}`}  className="videoHome"  style={bannerImg1}></a>

            <div className="aboutCards">
                <div className="aboutCard"> <p>{lang === "AZ" && `1500-dən çox məhsulla və 150-dən çox kəndlimizlə sizin qulluğunuzda hazırıq` || lang === "EN" && `We are at your service with more than 1,500 products and more than 150 villagers` || lang === "RU" && `Мы к вашим услугам с более чем 1500 продуктов и более чем 150 сельскими жителями.`}</p>  <img src={cardAboutImg1} alt="" className="aboutImg"/></div> 
                <div className="aboutCard"> <p>{lang === "AZ" && `Kəndlilər sizin üçün məhsulları aldığınız gün hazır edir və növbəti gün çatdırılma olur.` || lang === "EN" && `The villagers prepare the products for you the day you buy them and the next day the delivery takes place.` || lang === "RU" && `Жители деревни готовят продукты для вас в тот день, когда вы их покупаете, а на следующий день происходит доставка.`}</p> <img src={cardAboutImg2} alt="" className="aboutImg"/></div>
                <div className="aboutCard"> <p>{lang === "AZ" && `Keyfiyyətin bütün mərhələlərinə diqqətlə nəzarət edirik. Məhsullarımızın tərkibində heç bir əlavə qatqı və yaxud gmo mövcud deyildir.` || lang === "EN" && `We carefully monitor all stages of quality. Our products do not contain any additives or GMOs.` || lang === "RU" && `Мы внимательно следим за качеством на всех этапах. Наши продукты не содержат никаких добавок или ГМО.`}</p> <img src={cardAboutImg3} alt="" className="aboutImg"/></div>
            </div>
            
            <a href={`${Banners2[0]?.link}`} className='perectSetCont'>
                <div className="perfectSet" style={bannerImg2}>
                    <div className="textCont2">
                        <h4 className="title2">{lang === "AZ" && `İlk satış üçün əla səbət` || lang === "EN" && `Excellent basket for the first sale` || lang === "RU" && `Отличная корзина для первой продажи`}</h4>
                        <p className="desc">{lang === "AZ" && `Heç təbii kənd məhsullarından dadmısınız !? ` || lang === "EN" && `Have you ever tasted natural agricultural products !?` || lang === "RU" && `Вы когда-нибудь пробовали натуральные сельскохозяйственные продукты !?`}<br/> {lang === "AZ" && `Sizin üçün səbətdə ən təzə və ləziz məhsulları toplamışıq.` || lang === "EN" && `We have collected the freshest and most delicious products in the basket for you.` || lang === "RU" && `Мы собрали для вас в корзине самые свежие и вкусные продукты.`} <br/> {lang === "AZ" && `Sadəcə bir kliklə alın və dadın!` || lang === "EN" && `Just click and taste!` || lang === "RU" && `Просто нажмите и попробуйте!`}</p>
                        <Button1 value="Ətraflı" color="#285999"/>
                    </div>
                </div>
            </a>

            <div className="ourAssortment">
                <p className="title3">{lang === "AZ" && `Çeşidlərimiz` || lang === "EN" && `Наш ассортимент` || lang === "RU" && `Поиск`}</p>
                <div className="assortmentCont">
                    {props.assortmentArr}
                </div>
            </div>

            <div className="banner">
                <p className="typeBanner">{lang === "AZ" && `Bonuslar Haqqında` || lang === "EN" && `About Bonuses` || lang === "RU" && `О бонусах`}</p>
                <p className="titleBanner">{lang === "AZ" && `Aldığınız hər məhsula görə cashbacklar əldə edin $` || lang === "EN" && `Get cashback on every product you buy` || lang === "RU" && `Получайте кэшбэк за каждый купленный товар`}</p>
            </div>

            <div className="itemsCont">
                <Link to="/newitems"><p className="itemsTitle">{lang === "AZ" && `Yeni Məhsullarımız ` || lang === "EN" && `Our New Products` || lang === "RU" && `Наши новые продукты`}</p></Link>
                <div className="itemSlider">     
                    <OurSlider itemShow1={4} itemShow2={3} itemShow3={2} itemShow4={1} elements={newItems.map(item => item)} numOfSld={4}/>
                </div>
            </div>
            
            <div className="itemsCont">
                <Link to="/promotions"><p className="itemsTitle">{lang === "AZ" && `Xüsusi Təkliflərimiz ` || lang === "EN" && `Our Special Offers` || lang === "RU" && `Наши специальные предложения`}</p></Link>
                <div className="itemSlider"> 
                    <OurSlider itemShow1={4} itemShow2={3} itemShow3={2} itemShow4={1}  elements={specialOffers} numOfSld={4}/>
                </div>
            </div>

            <div className="itemsCont">
                <Link to="/suppliers"><p className="itemsTitle">{lang === "AZ" && `Bizim Kəndlilər ` || lang === "EN" && `Our Villagers` || lang === "RU" && `Наши жители`}</p></Link>
                <div className="itemSlider">
                    <OurSlider itemShow1={4} itemShow2={3} itemShow3={1} itemShow4={1}  elements={suppliersCard} numOfSld={3}/>
                </div>
            </div>
            
            <div className="itemsCont">
                <p className="itemsTitle">{lang === "AZ" && `Çox verilən suallara cavab` || lang === "EN" && `Answers to frequently asked questions` || lang === "RU" && `Ответы на часто задаваемые вопросы`}</p>
                <div className="itemSlider">
                    <OurSlider itemShow1={2} itemShow2={2} itemShow3={2} itemShow4={1} elements={answerCard} numOfSld={4}/>  
                </div>
            </div>

        </div>

    )
}

export default HomePage

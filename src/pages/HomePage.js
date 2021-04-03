import React, { useEffect ,useState} from 'react'
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

function HomePage(props) {
    

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
    
    if(JSON.parse(sessionStorage.getItem('orders'))?.length >= 0 || JSON.parse(sessionStorage.getItem('orders')) !== null)
    {
        
    }
    else 
    {
        const orders =   []
        sessionStorage.setItem('orders' ,  JSON.stringify(orders))
    }
    


    
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
    
    useEffect(() => {
            sendGetRequest4();
            sendGetRequest5();
            sendGetRequest3();
            sendGetRequest();
            sendGetRequest2();
    }, [])

    TopCards.map(bucket => ( topCards.push(<CardSlider1 id={bucket.id} turndesc={bucket.turndesc} turnetrafli={bucket.turnetrafli}  turnoverlay={bucket.turnoverlay}  turntitle={bucket.turntitle}   name={bucket.name} image={bucket.image} desc={bucket.description}/>)))
    SuppliersCard.map(supply => ( suppliersCard.push(  <SupplierCard image={supply.avatar} title={supply.name} supplier={supply.type_id} image2={testImg6} image3={testImg7}/>   )))
    AnswerCard.map(question => ( answerCard.push( <AnswersCard  answer={question.description} question={question.name} />)))
    NewProducts.map(product =>  ( newItems.push(       <ItemCard  id={product.id} ParcelWeight={props.ParcelWeight} setParcelWeight={props.setParcelWeight} NumberOfGoods={props.NumberOfGoods} setNumberOfGoods={props.setNumberOfGoods} setPaymentPrice={props.setPaymentPrice} PaymentPrice={props.PaymentPrice}  modalOpener3={props.modalOpener3} cardId={product.id} image={product.thumb}    title={product.title} desc={product.seller_id} price={product.qiymet} weight={product.ceki_hecm} discount={product.discount} id={product.id}  star={product.star_count}/>)))
    SpecialOffers.map(product =>( specialOffers.push(  <ItemCard  id={product.id} ParcelWeight={props.ParcelWeight} setParcelWeight={props.setParcelWeight} NumberOfGoods={props.NumberOfGoods} setNumberOfGoods={props.setNumberOfGoods} setPaymentPrice={ props.setPaymentPrice} PaymentPrice={props.PaymentPrice} modalOpener3={props.modalOpener3} cardId={product.id} image={product.thumb} title={product.title}   desc={product.seller_id} price={product.qiymet} weight={product.ceki_hecm} discount={product.discount}  id={product.id} star={product.star_count}/>)))
    
    return (

        <div className="homePage">
            


            <div className="slider1">
               <OurSlider elements={topCards} numOfSld={2}/>
            </div>
            <p className="deliveryText">Fermerlərdən evinizə təzə və təbii məhsulların çatdırılması!</p>
            <video  className="videoHome"  autoPlay  >
            </video>
            <div className="aboutCards">
                <div className="aboutCard"> <p>1500-dən çox məhsulla və 150-dən çox zəhmətkeşimizlə sizin qulluğunuzda hazırıq</p>  <img src={cardAboutImg1} alt="" className="aboutImg"/></div> 
                <div className="aboutCard"> <p>Zəhmətkeşlər sizin üçün məhsulları aldığınız gün hazır edir və növbəti gün çatdırılma olur.</p> <img src={cardAboutImg2} alt="" className="aboutImg"/></div>
                <div className="aboutCard"> <p>Keyfiyyətin bütün mərhələlərinə diqqətlə nəzarət edirik. Məhsullarımızın tərkibində heç bir əlavə qatqı və yaxud gmo mövcud deyildir.</p> <img src={cardAboutImg3} alt="" className="aboutImg"/></div>
            </div>

            <div className="perfectSet">
                <div className="textCont2">
                    <h4 className="title2">İlk satış üçün əla səbət</h4>
                    <p className="desc">Heç təbii ferma məhsullarından dadmısınız !? Sizin üçün səbətdə ən təzə və ləziz məhsulları toplamışıq. Sadəcə bir kliklə alın və dadın!</p>
                    <Button1 value="Ətraflı" color="#285999"/>
                </div>
            </div>

            <div className="ourAssortment">
                <p className="title3">Çeşidlərimiz</p>
                <div className="assortmentCont">
                    {props.assortmentArr}
                </div>
            </div>

            <div className="banner">
                <p className="typeBanner">Bonuslar Haqqında</p>
                <p className="titleBanner">Aldığınız hər məhsula görə cashbacklar əldə edin $</p>
            </div>

            <div className="itemsCont">
                <Link to="/newitems"><p className="itemsTitle">Yeni Məhsullarımız </p></Link>
                <div className="itemSlider">     
                    <OurSlider elements={newItems.map(item => item)} numOfSld={4}/>
                </div>
            </div>
            
            <div className="itemsCont">
                <Link to="/promotions"><p className="itemsTitle">Xüsusi Təkliflərimiz </p></Link>
                <div className="itemSlider"> 
                    <OurSlider elements={specialOffers} numOfSld={4}/>
                </div>
            </div>

            <div className="itemsCont">
                <Link to="/suppliers"><p className="itemsTitle">Bizim Zəhmətkeşlər </p></Link>
                <div className="itemSlider">
                    <OurSlider elements={suppliersCard} numOfSld={3}/>
                </div>
            </div>
            
            <div className="itemsCont">
                <p className="itemsTitle">Çox verilən suallara cavab</p>
                <div className="itemSlider">
                    <OurSlider elements={answerCard} numOfSld={4}/>  
                </div>
            </div>

        </div>

    )
}

export default HomePage

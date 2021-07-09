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
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Modal from '@material-ui/core/Modal';

function HomePage(props) {
    
    const context = useContext(ProductListingContext)
    const {setBanners1,setSuppliersCard,setProduct,SuppliersCard,NewProducts,Banners1,Banners2,setAssortment,Assortment,setAnswerCard,AnswerCard,setSpecialOffers,SpecialOffers,TopCards,setTopCards,setBanners2, ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,loader, setloader, StaticData,setStaticData} = context
    
    useEffect( async () => {
        if(TopCards.length === 0)
        {
            await   dataRenew()
        }
        console.log("%cDayan\u0131n!", "font-size: 50px; color: red; -webkit-text-stroke:1px black; font-weight: bold;")
        console.log("%cBrauzerin bu funksionall\u0131\u011f\u0131 proqram\xe7\u0131lar \xfc\xe7\xfcn n\u0259z\u0259rd\u0259 tutulmu\u015fdur. \u018fg\u0259r kimsl\u0259rs\u0259 siz\u0259 h\u0259r hans\u0131 bir funksionall\u0131\u011f\u0131 aktiv etm\u0259k v\u0259 ya kimins\u0259 hesab\u0131na m\xfcdaxil\u0259 etm\u0259k ad\u0131 il\u0259 bura n\u0259 is\u0259 kopyalay\u0131b yap\u0131\u015fd\u0131rma\u011f\u0131 deyibs\u0259, bu f\u0131r\u0131ldaq\xe7\u0131l\u0131qd\u0131r v\u0259 onlara sizin hesab\u0131n\u0131za m\xfcdaxil\u0259 etm\u0259k imkan\u0131 yaradacaqd\u0131r.", "font-size: 16px;")
    }, [])

    const topCards = []
    const newItems = []
    const specialOffers = []
    const suppliersCard = []
    const answerCard = []
    
    
    const dataRenew = async (data) => {
        try {
            const respData = await axios.get('https://nehra.az/api/static_data')
            respData.data.banners.map(banner => banner.key === "first_banner" ? setBanners1(banner) : setBanners2(banner))        
            setTopCards(respData.data.slayder)
            setAnswerCard(respData.data.questions)
            setSuppliersCard(respData.data.manufacturer_slider)
            setSpecialOffers(respData.data.specials)
            setAssortment(respData.data.assortment)
            setProduct(respData.data.newproducts)
        } catch (error) {
            console.log(error)
        }
    }

   
    
    TopCards.map(bucket => ( topCards.push(             <CardSlider1 link={bucket.link} id={bucket.id} turndesc={bucket.turndesc} turnetrafli={bucket.turnetrafli}  turnoverlay={bucket.turnoverlay}  turntitle={bucket.turntitle}   name={bucket.name} image={bucket.image} desc={bucket.description}/>)))
    SuppliersCard.map(supply => ( suppliersCard.push(   <SupplierCard id={supply.id} image={supply.avatar} title={supply.name} supplier={supply.type_id} image2={testImg6} image3={testImg7}/>   )))
    AnswerCard.map(question => ( answerCard.push(       <AnswersCard  answer={question.description} question={question.name} />)))
    NewProducts.map(product =>  ( newItems.push(        <ItemCard product={product} />)))
    SpecialOffers.map(product =>( specialOffers.push(   <ItemCard product={product} />)))
    
    const bannerImg1 = {
        backgroundImage:`url(https://nehra.az/storage/app/public/${Banners1.image})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'top center',
    }
    const bannerImg2 = {
        backgroundImage:`url(https://nehra.az/storage/app/public/${Banners2.image})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'top center',
    }

    const [open, setOpen]   = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
 
    const handleClose = () => {
        setOpen(false);
    };
    const [open2, setOpen2]   = React.useState(false);
    const handleOpen2 = () => {
        setOpen2(true);
    }
 
    const handleClose2 = () => {
        setOpen2(false);
    };



    return (

        <div className="homePage pagescroll">
            <div className="slider1">
               <OurSlider itemShow1={2} itemShow2={2} itemShow3={1} itemShow4={1} elements={topCards} speed={10000} numOfSld={2}/>
            </div>
            <p className="deliveryText">{lang === "AZ" && `Kəndlərimizdən evinizə təzə və təbii məhsulların çatdırılması!` || lang === "EN" && `Delivery of fresh and natural products from our villages to your home!` || lang === "RU" && `Доставка свежих и натуральных продуктов из наших деревень к вам домой!`}</p>
            
            <div className="perfectSet" style={bannerImg1}>
                <div className="textCont2">
                    <h4 className="title2">{Banners1?.title}</h4>
                    <p className="desc">{Banners1?.description}</p>
                    <a href={`${Banners1?.link}`} className='perectSetCont'><Button1 value={(lang === "AZ" && `Ətraflı`) || (lang === "EN" && `More`) || (lang === "RU" && `Eще`)} color="#285999"/></a>
                </div>
                {
                    Banners1?.video_switcher === 1 && 
                    <div className="videoModalBtn">
                        <button onClick={() => handleOpen2()}><PlayArrowRoundedIcon/></button>
                        <Modal  
                        style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        {
                            <div className='videoModalCont'>
                                <div className='videoModal'>
                                    <div className="btnCont"> <button onClick={() => handleClose2()} className="close">x</button></div>
                                    <iframe width="100%" height="600" src={`https://www.youtube.com/embed/${Banners1.video_link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                        }
                        </Modal>
                    </div>
                }
            </div>
            


            <div className="aboutCards">
                <div className="aboutCard"> <p>{lang === "AZ" && `1500-dən çox məhsulla və 150-dən çox kəndlimizlə sizin qulluğunuzda hazırıq` || lang === "EN" && `We are at your service with more than 1,500 products and more than 150 villagers` || lang === "RU" && `Мы к вашим услугам с более чем 1500 продуктов и более чем 150 сельскими жителями.`}</p>  <img src={cardAboutImg1} alt="" className="aboutImg"/></div> 
                <div className="aboutCard"> <p>{lang === "AZ" && `Kəndlilər sizin üçün məhsulları aldığınız gün hazır edir və növbəti gün çatdırılma olur.` || lang === "EN" && `The villagers prepare the products for you the day you buy them and the next day the delivery takes place.` || lang === "RU" && `Жители деревни готовят продукты для вас в тот день, когда вы их покупаете, а на следующий день происходит доставка.`}</p> <img src={cardAboutImg2} alt="" className="aboutImg"/></div>
                <div className="aboutCard"> <p>{lang === "AZ" && `Keyfiyyətin bütün mərhələlərinə diqqətlə nəzarət edirik. Məhsullarımızın tərkibində heç bir əlavə qatqı və yaxud gmo mövcud deyildir.` || lang === "EN" && `We carefully monitor all stages of quality. Our products do not contain any additives or GMOs.` || lang === "RU" && `Мы внимательно следим за качеством на всех этапах. Наши продукты не содержат никаких добавок или ГМО.`}</p> <img src={cardAboutImg3} alt="" className="aboutImg"/></div>
            </div>
            
           
            <div className="perfectSet" style={bannerImg2}>
                <div className="textCont2">
                    <h4 className="title2">{Banners2?.title}</h4>
                    <p className="desc">{Banners2?.description}</p>
                    <a href={`${Banners2?.link}`} className='perectSetCont'><Button1 value={(lang === "AZ" && `Ətraflı`) || (lang === "EN" && `More`) || (lang === "RU" && `Eще`)} color="#285999"/></a>
                </div>
                {
                    Banners2?.video_switcher === 1 && 
                    <div className="videoModalBtn">
                        <button onClick={() => handleOpen()}><PlayArrowRoundedIcon/></button>
                        <Modal  
                        style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        {
                            <div className='videoModalCont'>
                                <div className='videoModal'>
                                    <div className="btnCont"> <button onClick={() => handleClose()} className="close">x</button></div>
                                    <iframe width="100%" height="600" src={`https://www.youtube.com/embed/${Banners2.video_link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                        }
                        </Modal>
                    </div>
                }
            </div>
            

            <div className="ourAssortment">
                <p className="title3">{lang === "AZ" && `Çeşidlərimiz` || lang === "EN" && `Our assortments` || lang === "RU" && `Наш ассортимент`}</p>
                <div className="assortmentCont">
                    {Assortment.map(assortment=> <AssortmentCard id={assortment.id} title={assortment.name} desc={assortment.count} image={assortment.thumb}/>)}
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

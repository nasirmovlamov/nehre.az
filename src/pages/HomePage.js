import React from 'react'
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
function HomePage() {
    
    const topCards = []
    topCards.push(  <CardSlider1 image={topCard1}/> , <CardSlider1 image={topCard2}/>, <CardSlider1 image={topCard1}/> ,<CardSlider1 image={topCard2}/>)
    const newItems = []
    newItems.push(  <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={10}/> , <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/> , <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>)
    const specialOffers = []
    specialOffers.push(  <ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>,<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>)
    const suppliersCard = []
    suppliersCard.push(  <SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>)
    const answerCard = []
    answerCard.push( <AnswersCard/>,<AnswersCard/>,<AnswersCard/>,<AnswersCard/>,<AnswersCard/>)


    return (
        <div className="homePage">
            <div className="slider1">
                <OurSlider elements={topCards} numOfSld={2}/>
            </div>
            <p className="deliveryText">Delivery of products from farmers to your home!</p>
            <video  className="videoHome"  autoplay  >
            </video>
            <div className="aboutCards">
                <div className="aboutCard"> <p>More than 1500 products from 150 small manufacturers on one site.</p>  <img src={cardAboutImg1} alt="" className="aboutImg"/></div> 
                <div className="aboutCard"> <p>Farmers prepare all products only to order. Therefore, the next day delivery.</p> <img src={cardAboutImg2} alt="" className="aboutImg"/></div>
                <div className="aboutCard"> <p>We control quality at all stages. Therefore, there are no harmful ingredients in the products for taste, color and smell.</p> <img src={cardAboutImg3} alt="" className="aboutImg"/></div>
            </div>

            <div className="perfectSet">
                <div className="textCont2">
                    <h4 className="title2">Perfect set for first order</h4>
                    <p className="desc">Ever tried farm products? We have collected for you the most popular in one set. Easy to order in one click!</p>
                    <Button1 value="Ətraflı" color="#ff7a2c"/>
                </div>
            </div>

            <div className="ourAssortment">
                <p className="title3">Our assortment</p>
                <div className="assortmentCont">
                    <AssortmentCard title="Popular" desc="more than 85 types" image={assort1}/>
                    <AssortmentCard title="New Items" desc="more than 85 types" image={assort2}/>
                    <AssortmentCard title="Meat and Poultry" desc="more than 85 types" image={assort3}/>
                    <AssortmentCard title="Milk, cheese, eggs" desc="more than 85 types" image={assort4}/>
                    <AssortmentCard title="Vegetables and fruits" desc="more than 85 types" image={assort5}/>
                    <AssortmentCard title="Grocery" desc="more than 85 types" image={assort6}/>
                    <AssortmentCard title="Cooking and bread" desc="more than 85 types" image={assort7}/>
                    <AssortmentCard title="Sweets   " desc="more than 85 types" image={assort8}/>
                    <AssortmentCard title="Non-Food" desc="more than 85 types" image={assort9}/>
                    <AssortmentCard title="Presents" desc="more than 85 types" image={assort10}/>
                    <AssortmentCard title="Fish" desc="more than 85 types" image={assort11}/>
                    <AssortmentCard title="Freezing" desc="more than 85 types" image={assort12}/>
                </div>
            </div>

            <div className="banner">
                <p className="typeBanner">Bonus Program</p>
                <p className="titleBanner">Bring Your friends get money $</p>
            </div>

            <div className="itemsCont">
                <p className="itemsTitle">New Items </p>
                <div className="itemSlider">     
                    <OurSlider elements={newItems} numOfSld={4}/>
                </div>
            </div>
            
            <div className="itemsCont">
                <p className="itemsTitle">Special Offers </p>
                <div className="itemSlider"> 
                    <OurSlider elements={specialOffers} numOfSld={4}/>
                </div>
            </div>

            <div className="itemsCont">
                <p className="itemsTitle">Our Suppliers </p>
                <div className="itemSlider">
                    <OurSlider elements={suppliersCard} numOfSld={3}/>
                </div>
            </div>
            
            <div className="itemsCont">
                <p className="itemsTitle">Answers on questions</p>
                <div className="itemSlider">
                    <OurSlider elements={answerCard} numOfSld={4}/>  
                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default HomePage

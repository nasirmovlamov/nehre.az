import React from 'react'
import "../assets/css/homePage.css"
import CardSlider1 from '../components/CardSlider1'
import cardAboutImg1 from "../assets/images/cardAboutImg1.png"
import cardAboutImg2 from "../assets/images/cardAboutImg2.png"
import cardAboutImg3 from "../assets/images/cardAboutImg3.png"
import Button1 from '../components/Button1'
import AssortmentCard from '../components/AssortmentCard'
import testImg3 from "../assets/images/testImg3.jpg"    
import testImg4 from "../assets/images/testImg4.jpg"    
import testImg5 from "../assets/images/testImg5.jpg"    
import testVideo from "../assets/video/testVideo.mp4"
import ItemCard from '../components/ItemCard'
function HomePage() {
    




    return (
        <div className="homePage">
            <div className="slider1">
                <CardSlider1/>
            </div>
            <p className="deliveryText">Delivery of products from farmers to your home!</p>
            <video  className="videoHome" controls autoplay>
                <source src={testVideo} type="video/mp4"/>
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
                    <AssortmentCard title="Popular" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="New Items" desc="more than 85 types" image={testImg4}/>
                    <AssortmentCard title="Meat and Poultry" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Milk, cheese, eggs" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Vegetables and fruits" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Grocery" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Cooking and bread" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Sweets   " desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Non-Food" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Presents" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Fish" desc="more than 85 types" image={testImg3}/>
                    <AssortmentCard title="Freezing" desc="more than 85 types" image={testImg3}/>
                </div>
            </div>

            <div className="banner">
                <p className="typeBanner">Bonus Program</p>
                <p className="titleBanner">Bring Your friends get money $</p>
            </div>

            <div className="itemsCont">
                <p className="itemsTitle">New Items </p>
                <div className="itemSlider">
                    <ItemCard image={testImg5} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price="100$" weight="50gr" discount={"10%"}/>
                </div>
            </div>
            
            <div className="itemsCont">
                <p className="itemsTitle">Special Offers </p>
                <div className="itemSlider">

                </div>
            </div>

            <div className="itemsCont">
                <p className="itemsTitle">Our Suppliers </p>
                <div className="itemSlider">

                </div>
            </div>
            
            <div className="itemsCont">
                <p className="itemsTitle">Answers on questions</p>
                <div className="itemSlider">

                </div>
            </div>

            
        </div>
    )
}

export default HomePage

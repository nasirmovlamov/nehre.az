import React from 'react'
import "../assets/css/downNavbar.css"
import milkImg from "../assets/images/milk.png"
import meatImg from "../assets/images/meat.png"
import fruitsImg from "../assets/images/fruits.png"
import breadImg from "../assets/images/bread.png"
import conservImg from "../assets/images/conserv.png"
import fishImg from "../assets/images/seafood.png"
import freezedImg from "../assets/images/freezed.png"
import nonfoodImg from "../assets/images/nonFood.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/ourSlider.css"
import "../assets/css/ourSliderDownNavbar.css"
import Slider from "react-slick";

import {
    Link, 
    BrowserRouter as  Router
  } from "react-router-dom";
function DownNavbar(props) {
    const clickHandler = (num) => {
        for (let i = 1; i < props.TopCategory.length; i++) {
            document?.getElementById(`btnNav${i}`)?.setAttribute('style' , "border-bottom: 4px solid transparent;")
        }
        document?.getElementById(`btnNav${num}`)?.setAttribute('style' , "border-bottom: 4px solid #285999w;")
    }
    const TopCatArr = []
    if(props.TopCategory.length !== 0)
    {
        props.TopCategory.map(element  => TopCatArr.push(<a className='linkDrp' href={`/category/${element.id}`}><button  id={`btnNav${element.id}`} onClick={() => clickHandler(element.id)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={`https://nehra.az/storage/app/public/${element.image}`} alt="" width="70px" height="auto"/></div>  <span>{element.name}</span>  </button></a>))
    }
    var settings = {
        arrows:true,
        dots: false,
        infinite: true,
        speed: 250,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        draggable:false,
        autoplay:false,
        responsive: [
        {
            breakpoint: 1655,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
              initialSlide: 1
            }
        },
        {
            breakpoint: 1355,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              initialSlide: 1
            }
        },
        {
            breakpoint: 791,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 1
            }
        }
        ]
    };
    return (
        <div className="navCont">
            <nav className="downNavbar">
                <Slider {...settings}>
                    {TopCatArr.map(element => element)}
                </Slider>
            </nav>
        </div>
    )
}

export default DownNavbar

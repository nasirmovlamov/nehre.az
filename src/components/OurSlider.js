import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSlider1 from './CardSlider1';
import "../assets/css/ourSlider.css"
import CardSliderDefault from './CardSliderDefault';
function OurSlider(props) {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: props.numOfSld,
        slidesToScroll: 2,
        initialSlide: 0,
        draggable:true,
        autoplay:true,
        autoplaySpeed: props.speed !== undefined ? props.speed : 4500,
        responsive: [
            {
                breakpoint: 1655,
                settings: {
                slidesToShow: props.itemShow1,
                slidesToScroll: 2,
                initialSlide: 1
                }
            },
            {
                breakpoint: 1455,
                settings: {
                slidesToShow: props.itemShow2,
                slidesToScroll:2,
                initialSlide: 1
                }
            },
            {
                breakpoint: 1255,
                settings: {
                slidesToShow: props.itemShow3,
                slidesToScroll: 1,
                initialSlide: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: props.itemShow4,
                slidesToScroll:1,
                initialSlide: 1
                }
            },
            {
                breakpoint: 550,
                settings: {
                    arrows:false,
                    dots:false, 
                    slidesToShow: props.itemShow4,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
      };
      
    var new1 = [<CardSliderDefault name={"Loading"}   desc={"Loading"} /> , <CardSliderDefault name={"Loading"} i desc={"Loading"} />]
    return (
        <Slider {...settings}>
             {props.elements.length > 0 ? props.elements : (new1.map(element => element)) }
        </Slider>
    )
}

export default OurSlider

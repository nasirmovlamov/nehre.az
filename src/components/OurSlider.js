import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSlider1 from './CardSlider1';
import "../assets/css/ourSlider.css"
import CardSliderDefault from './CardSliderDefault';
function OurSlider(props) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: props.numOfSld,
        slidesToScroll: 1,
        initialSlide: 0,
        draggable:true,
        autoplay:true,
        autoplaySpeed: props.speed !== undefined ? props.speed : 4500,
      };
      
    var new1 = [<CardSliderDefault name={"Loading"}   desc={"Loading"} /> , <CardSliderDefault name={"Loading"} i desc={"Loading"} />]
    return (
        <Slider {...settings}>
             {props.elements.length > 0 ? props.elements : (new1.map(element => element)) }
        </Slider>
    )
}

export default OurSlider

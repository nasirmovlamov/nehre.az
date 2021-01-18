import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSlider1 from './CardSlider1';
import "../assets/css/ourSlider.css"
function OurSlider(props) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: props.numOfSld,
        slidesToScroll: 1,
        initialSlide: 0,
        draggable:false
      };
    return (
        <Slider {...settings}>
             {props.elements}
        </Slider>
    )
}

export default OurSlider

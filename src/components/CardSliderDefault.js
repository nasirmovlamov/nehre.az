import React from 'react'
import "../assets/css/cardSlider1.css"
import Button1 from './Button1'
function CardSliderDefault(props) {
    
    return (
        <div className="cardSlider1" >
            <div className="textCont">
                <h4 className="title">{props.name}</h4>
                <p className="desc">{props.desc}</p>
                <Button1 value="Ətraflı" />
            </div>
        </div>
    )
}

export default CardSliderDefault

import React from 'react'
import "../assets/css/cardSlider1.css"
import Button1 from './Button1'
function CardSlider1(props) {
    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
    }
    return (
        <div className="cardSlider1" style={imgHandler}>
            <div className="textCont">
                <h4 className="title">Trial milk basket</h4>
                <p className="desc">Farm Meat Sausage Farm Meat SausageFarm Meat Sausage Farm Meat Sausage</p>
                <Button1 value="Ətraflı" />
            </div>
        </div>
    )
}

export default CardSlider1

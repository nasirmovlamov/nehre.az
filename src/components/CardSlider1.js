import React from 'react'
import "../assets/css/cardSlider1.css"
import Button1 from './Button1'
function CardSlider1(props) {
    const imgHandler = {
        background: `url(https://nehra.az/storage/app/public/${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    return (
        <div className="cardSlider1" style={imgHandler}>
            <div className="cardSlider2" >
                <div className="textCont">
                    <h4 className="title">{props.name}</h4>
                    <p className="desc">{props.desc}</p>
                </div>
                    <Button1 value="Ətraflı" />
            </div>
        </div>
    )
}

export default CardSlider1

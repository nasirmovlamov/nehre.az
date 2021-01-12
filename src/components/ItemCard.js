import React from 'react'
import "../assets/css/itemCard.css"
import BuyButton from './BuyButton'
import StarSystem from './StarSystem'
function ItemCard(props) {
    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "200% auto",
    }
    return (
        <div className="itemCard">
            <div className="imgCont" style={imgHandler}>
                <div className="date">W</div>
                <div className="date">Wed</div>
                <div className="date">Th</div>
                <div className="date">Fri</div>
                <div className="date">Sat</div>
                <div className="date">Sun</div>
            </div>
            <p className="titleItem">{props.title}</p>
            <p className="subTitleItem">{props.desc}</p>
            <div className="textCont">
                <div className="starAndAbout">
                    {props.discount !== undefined && (<span className="priceStriked"><span className="priceUnderStrike">props.price</span></span>)}
                    <p className="priceAndWeightItem"><span className="element1">{props.price}</span> / <span className="element2">{props.weight}</span></p>
                    <StarSystem numberStar="3.5"/>
                </div>   
                <BuyButton/>
            </div>

            
        </div>
    )
}

export default ItemCard

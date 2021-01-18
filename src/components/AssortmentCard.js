import React from 'react'
import "../assets/css/assortmentCard.css"
function AssortmentCard(props) {
    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
    }
    return (
        <div className="assortmentCard">
            <div style={imgHandler} className="imgContAssortment"></div>
            <p className="assortTitle">{props.title}</p>
            <p className="assortSubTitle">{props.desc}</p>
        </div>
    )
}

export default AssortmentCard

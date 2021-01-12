import React from 'react'
import "../assets/css/assortmentCard.css"
function AssortmentCard(props) {
    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "cover",
        backgroundSize: "100% 100%",
    }
    return (
        <div className="assortmentCard">
            <div style={imgHandler} className="imgContAssortment"></div>
            <p>{props.title}</p>
            <p>{props.desc}</p>
        </div>
    )
}

export default AssortmentCard

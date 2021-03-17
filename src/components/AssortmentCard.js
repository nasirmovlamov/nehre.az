import React from 'react'
import "../assets/css/assortmentCard.css"
function AssortmentCard(props) {
    const imgHandler = {
        background: `url('https://nehra.az/storage/app/public/${props.image}') no-repeat`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
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

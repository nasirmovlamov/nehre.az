import React from 'react'
import "../assets/css/assortmentCard.css"
function AssortmentCard(props) {
    const imgHandler = {
        background: `url('https://nehra.az/storage/app/public/${props.image}') no-repeat`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
    }
    return (
        <div className="assortmentCard" style={imgHandler}>
            <div  className="imgContAssortment"></div>
            <div className="overlay">
                <p className="assortSubTitle">{props.desc}  çox məhsulla xidmətinizdəyik</p>
                <p className="assortTitle">{props.title}</p>
            </div>
        </div>
    )
}

export default AssortmentCard

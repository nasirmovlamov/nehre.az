import React from 'react'
import "../assets/css/assortmentCard.css"
import {
    Link,
  } from "react-router-dom";
function AssortmentCard(props) {
    const imgHandler = {
        background: `url('https://nehra.az/storage/app/public/${props.image}') no-repeat`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
    }
    return (
        <Link to={`/category/${props.id}`} className="assortmentCard" style={imgHandler}>
            <div  className="imgContAssortment"></div>
            <div className="overlay">
                <p className="assortSubTitle">{props.desc}  çox məhsulla xidmətinizdəyik</p>
                <p className="assortTitle">{props.title}</p>
            </div>
        </Link>
    )
}

export default AssortmentCard

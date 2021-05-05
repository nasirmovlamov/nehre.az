import React from 'react'
import "../assets/css/review.css"
import StarSystem from './StarSystem'
function Review(props) {
    return (
        <div className="review">
            <p className="name">{props.user_name !== null ? props.user_name : "İstifadəçi"}</p>
            <div className="dateAndStar">
                <p className="date">12/18/2020</p>
                {props.star_count !== null && <StarSystem numberStar={props.star_count}/>}
            </div>
            <p className="text">
                {props.review}
            </p>
        </div>
    )
}

export default Review

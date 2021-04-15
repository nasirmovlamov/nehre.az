import React from 'react'
import "../assets/css/review.css"
import StarSystem from './StarSystem'
function Review() {
    return (
        <div className="review">
            <p className="name">Oksana Olimpieva</p>
            <div className="dateAndStar">
                <p className="date">12/18/2020</p>
                <StarSystem numberStar="5"/>
            </div>
            <p className="text">
                - Not a bad mince. But a little dry. Taste good but not outstanding. There were no other unpleasant inclusions noticed.
            </p>
        </div>
    )
}

export default Review

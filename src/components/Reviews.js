import React from 'react'
import "../assets/css/reviews.css"
import Review from './Review'
import StarSystem from './StarSystem'

function Reviews() {
    return (
        <div className="reviews">
            <div className="reviewsCont">
                <Review/>
            </div>
        </div>
    )
}

export default Reviews

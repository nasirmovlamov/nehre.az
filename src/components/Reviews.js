import React from 'react'
import "../assets/css/reviews.css"
import Review from './Review'
import StarSystem from './StarSystem'

function Reviews() {
    return (
        <div className="reviews">
            <p className="titleReviews">Only the customer who ordered this product can leave a review.</p>
            <div className="reviewsCont">
                
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>



            </div>
        </div>
    )
}

export default Reviews

import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "../assets/css/reviews.css"
import Review from './Review'
import StarSystem from './StarSystem'

function Reviews(props) {
    const [reviews, setreviews] = useState([])
    useEffect(() => {
        axios.get(`https://nehra.az/api/reviews?post_id=${props.Product.id}`)
            .then(res => setreviews(res.data))
    }, [])
    return (
        <div className="reviews">
            <div className="reviewsCont">
                {reviews.map(element => <Review user_name={element.user_name} review={element.review} star_count={element.star_count}/>)}
            </div>
        </div>
    )
}

export default Reviews

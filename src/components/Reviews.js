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
            axios.get(`https://nehra.az/api/reviews?post_id=${props?.id}`)
                .then(res => setreviews(res.data))
    }, [])
    return (
        <div className="reviews">
            <div className="reviewsCont">
                {props.SSReviews !== undefined && ( props.SSReviews.length > 0 ?  props.SSReviews.map(element => <Review user_name={element.user_name} date={element.created_at.slice(0, 10).replaceAll('-' , '.')} review={element.review} star_count={element.star_count}/>) : "Bu Tədarükçüyə şərh yazılmayıb")}
                {reviews.map(element => ( reviews.length > 0 ?  <Review user_name={element.user_name} date={element.created_at.slice(0, 10).replaceAll('-' , '.')} review={element.review} star_count={element.star_count}/>: "Bu Tədarükçüyə şərh yazılmayıb"))}
            </div>
        </div>
    )
}

export default Reviews

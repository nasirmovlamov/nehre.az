import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Review from './Review'

function MemberAreaReviews(props) {
    const [reviews, setreviews] = useState([])
    useEffect(() => {
        axios.get(`https://nehra.az/api/reviews?user_id=${props.UserId}`)
            .then(res => setreviews(res.data))
    }, [])
    return (
        <div className="reviewCont">
            <p className="title">Leave your opinion about the product</p>
            <p className="subTitle">We have grouped here all products ordered in the last 30 days for which you have not yet had a review.</p>
            <div className="reviews">
                <p className='reviewNotFound'>{reviews.length === 0 && "Heç bir şərh mövcud deyil"}</p> 
                {reviews.map(element => <Review user_name={element.user_name} review={element.review} star_count={element.star_count}/>)}
            </div>
        </div>
    )
}

export default MemberAreaReviews

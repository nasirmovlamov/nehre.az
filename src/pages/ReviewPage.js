import React from 'react'
import "../assets/css/reviewPage.css"
import Review from "../components/Review"
function ReviewPage() {
    return (
        <div className="reviewPage">
            <p className="title">Feedback from our clients</p>
            <p className="subTitle">Every feedback is important to us, thank you</p>

            <div className="reviewCont">
                <div className="review">
                    <div className="supplierCont">
                        <div className="imgCont"></div>
                        <p className="name"></p>
                        <p className="type"></p>
                    </div>

                    <Review />
                    <Review />
                    <Review />
                    <Review />

                </div>

            </div>
        
        </div>
    )
}

export default ReviewPage

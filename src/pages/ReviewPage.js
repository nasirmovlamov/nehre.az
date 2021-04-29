import React from 'react'
import "../assets/css/reviewPage.css"
import Review from "../components/Review"
function ReviewPage() {
    return (
        <div className="reviewPage">
            <p className="title">Feedback from our clients</p>
            <p className="subTitle">Every feedback is important to us, thank you</p>

            <div className="reviewCont">
                <div className="reviewItem">
                    <div className="supplierCont">
                        <div className="imgCont"></div>
                        <p className="name">Akif Quliyev</p>
                        <p className="type">Qatiq satan</p>
                    </div>

                    <div className='reviews'> 
                        <Review />
                        <Review />
                        <a className='seeAllbutton' href="/suppliers">Bütün şərhləri gör</a>
                    </div>
                </div>
                
                <div className="reviewItem">
                    <div className="supplierCont">
                        <div className="imgCont"></div>
                        <p className="name">Akif Quliyev</p>
                        <p className="type">Qatiq satan</p>
                    </div>

                    <div className='reviews'> 
                        <Review />
                        <Review />
                        <a className='seeAllbutton' href="/suppliers">Bütün şərhləri gör</a>
                    </div>
                </div>

            </div>
        
        </div>
    )
}

export default ReviewPage

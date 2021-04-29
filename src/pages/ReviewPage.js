import React , {useContext} from 'react'
import "../assets/css/reviewPage.css"
import Review from "../components/Review"
import {ProductListingContext} from '../components/ProductListingProvider'

function ReviewPage() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)

    return (
        <div className="reviewPage">
            <p className="title">{lang === "AZ" && `Müştərilərimizin rəyləri` || lang === "EN" && `Feedback from our clients` || lang === "RU" && `Feedback from our clients`}</p>
            <p className="subTitle">{lang === "AZ" && `Hər bir rəy bizim üçün vacibdir, təşəkkür edirəm` || lang === "EN" && `Every feedback is important to us, thank you` || lang === "RU" && `Каждый отзыв важен для нас, спасибо`}</p>

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
                        <a className='seeAllbutton' href="/suppliers">{lang === "AZ" && `Bütün şərhləri gör` || lang === "EN" && `See all comments` || lang === "RU" && `Посмотреть все комментарии`}</a>
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
                        <a className='seeAllbutton' href="/suppliers">{lang === "AZ" && `Bütün şərhləri gör` || lang === "EN" && `See all comments` || lang === "RU" && `Посмотреть все комментарии`}</a>
                    </div>
                </div>

            </div>
        
        </div>
    )
}

export default ReviewPage

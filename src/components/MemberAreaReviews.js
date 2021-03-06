import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'
import Review from './Review'

function MemberAreaReviews(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData,UserData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const [reviews, setreviews] = useState([])
    useEffect(() => {
        axios.get(`https://nehra.az/api/reviews?user_id=${UserData.id}`)
            .then(res => setreviews(res.data.data))
    }, [])
    return (
        <div className="reviewCont">
            <p className="title">{(lang === "AZ" && `Məhsul haqqında düşüncənizi buraxın`) || (lang === "EN" && `Leave your opinion about the product `) || (lang === "RU" && `Оставьте свое мнение о продукте`)}</p>
            {/* <p className="subTitle"> {(lang === "AZ" && `Şərhlər`) || (lang === "EN" && `Comments`) || (lang === "RU" && `Комментарии`)}</p> */}
            <div className="reviews">
                <p className='reviewNotFound'>{reviews.length === 0 &&  ((lang === "AZ" && `Heç bir şərh mövcud deyil`) || (lang === "EN" && `No comments available`) || (lang === "RU" && `Нет комментариев`))}</p> 
                {reviews.map(element => <Review user_name={element.user_name} review={element.review} star_count={element.star_count}/>)}
            </div>
        </div>
    )
}

export default MemberAreaReviews

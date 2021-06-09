import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import "../assets/css/reviews.css"
import Review from './Review'
import StarSystem from './StarSystem'
import {ProductListingContext} from '../components/ProductListingProvider'


function Reviews(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId] = useContext(ProductListingContext)

    const [reviews, setreviews] = useState([])

    const [loader, setloader] = useState(false)
    useEffect(() => {
            axios.get(`https://nehra.az/api/reviews?post_id=${props?.id}`)
                .then(res => (setreviews(res.data) , setloader(true)))
    }, [])

    return (
        <div className="reviews">
            <div className="reviewsCont">
                {props.SSReviews !== undefined && ( props.SSReviews.length > 0 ?  props.SSReviews.map(element => <Review user_name={element.user_name} date={element.created_at.slice(0, 10).replaceAll('-' , '.')} review={element.review} star_count={element.star_count}/>) : "Bu Tədarükçüyə şərh yazılmayıb")}
                {loader && (props.product && (reviews.length > 0 ? reviews.map(element => <Review user_name={element.user_name} date={element.created_at.slice(0, 10).replaceAll('-' , '.')} review={element.review} star_count={element.star_count}/>) : (<p className='noReview'>{lang === "AZ" && "Bu məhsula şərh yazılmayıb" || lang === "EN" && `There are no comments for this product` || lang === "RU" && `К этому продукту нет комментариев`}</p>)))}
            </div>
        </div>
    )
}

export default Reviews

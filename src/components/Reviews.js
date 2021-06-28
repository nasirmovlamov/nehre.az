import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import Pagination from '@material-ui/core/Pagination';


import "../assets/css/reviews.css"
import Review from './Review'
import StarSystem from './StarSystem'
import {ProductListingContext} from '../components/ProductListingProvider'
import Data from '../assets/language/reviews.json'
import { Skeleton } from '@material-ui/core';

function Reviews(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const staticData = Data[`validation-${lang}`]
    const [reviews, setreviews] = useState([])
    const [loader, setloader] = useState(false)
    const [numberOfReview, setnumberOfReview] = useState(5)
    const [page, setPage] = React.useState(1);
    const [url, seturl] = useState(`https://nehra.az/api/reviews?${props?.post_id !== null ? `post_id=${props?.post_id}` : `manufacturer_id=${props?.manf_id}` }&page=${page}`) 
    const [count, setcount] = useState(0)
    const [currentposts, setcurrentposts] = useState([])
    const [totalReviewCont, settotalReviewCont] = useState(0)

    const getData = async () => {
        try {
            const res =  await axios.get(`https://nehra.az/api/reviews?${ props?.post_id !== null ? `post_id=${props?.post_id}` : `manufacturer_id=${props?.manf_id}` }&page=${page}`)
            setcount(Math.ceil(res.data.total /  numberOfReview))
            settotalReviewCont(res.data.total) 
            setcurrentposts(res.data.data)
            setloader(true)
        } catch (error) {
            setloader(true)
        }
    } 
    useEffect(() => {
        getData()
    }, [])
    
    const handleChange = async (event, value) => {
        setloader(false)
        setPage(value);
        seturl(`https://nehra.az/api/reviews?${ props?.post_id !== null ? `post_id=${props?.post_id}` : `manufacturer_id=${props?.manf_id}` }&page=${value}`)
        const res = await axios.get(`https://nehra.az/api/reviews?${ props?.post_id !== null ? `post_id=${props?.post_id}` : `manufacturer_id=${props?.manf_id}` }&page=${value}`)
        setcount(Math.ceil(res.data.total /  numberOfReview)) 
        setcurrentposts(res.data.data)
        settotalReviewCont(res.data.total)
        setloader(true)
    };
    

    return (
        <div className="reviews">
                    <div className="reviewsCont">
                        {loader ? 
                            ((currentposts.length > 0) ? currentposts.map(element =><Review user_name={element.user_name} date={element.created_at.slice(0, 10).replaceAll('-' , '.')} review={element.review} star_count={element.star_count}/>) : <p className='noReview'>{props?.post_id !== null ?  staticData.noProdReview : staticData.noManfReview}</p>)
                            :
                            <>
                                <div className="skeleton">
                                    <Skeleton variant="rect" width={"99%"} height={"102px"} />
                                </div>
                                <div className="skeleton">
                                    <Skeleton variant="rect" width={"100%"} height={"102px"} />
                                </div>
                                <div className="skeleton">
                                    <Skeleton variant="rect" width={"100%"} height={"102px"} />
                                </div>
                                <div className="skeleton">
                                    <Skeleton variant="rect" width={"100%"} height={"102px"} />
                                </div>
                                <div className="skeleton">
                                    <Skeleton variant="rect" width={"100%"} height={"102px"} />
                                </div>
                            </>
                        }
                    </div>
                    {(totalReviewCont > 5) && <div className="pagination"><Pagination    count={count} onChange={handleChange} page={props.page}  variant="outlined" shape="rounded" /></div>}
        </div>
    )
}

export default Reviews
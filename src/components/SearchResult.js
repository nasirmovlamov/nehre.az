import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import '../assets/css/searchResult.css'
import ReactLoading from 'react-loading';
import ItemCard from './ItemCard'

function SearchResult(props) {
    const [loader, setloader] = useState(true)
    const [SearchResult, setSearchResult] = useState([])

    useEffect(() => {
        setSearchResult()
        setloader(true)
        axios.get(`https://nehra.az/public/api/search/${sessionStorage.getItem('searchResult')}`)
        .then(res => (setSearchResult(res.data) , setloader(false)))
        .catch(err => (console.log(err) , setloader(false)))

    }, [])

    return (
        <div className="searchResult">
             <p className='resultTitle'>Axtarışınıza uyğun nəticələr</p>
            {
                  loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> : (  SearchResult?.length >= 1 ? <div className="items">{SearchResult.map(product =>  <ItemCard ParcelWeight={props.ParcelWeight} setParcelWeight={props.setParcelWeight} NumberOfGoods={props.NumberOfGoods} setNumberOfGoods={props.setNumberOfGoods} setPaymentPrice={props.setPaymentPrice} PaymentPrice={props.PaymentPrice}  modalOpener3={props.modalOpener3} cardId={product.id} image={product.thumb}    title={product.title} desc={product.seller_id} price={product.qiymet} weight={product.ceki_hecm} discount={product.discount} star={product.star_count}/>)}</div> : <p className='resultNot'>Axtarışınıza uyğun nəticə tapılmadı</p>)
            }
        </div>
    )
}

export default SearchResult

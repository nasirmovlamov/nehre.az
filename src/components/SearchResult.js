import axios from 'axios'
import React from 'react'
import { useState , useContext} from 'react'
import { useEffect } from 'react'
import '../assets/css/searchResult.css'
import ReactLoading from 'react-loading';
import ItemCard from './ItemCard'
import {ProductListingContext} from '../components/ProductListingProvider'

function SearchResult(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

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
            <p className='resultTitle'>{(lang === "AZ" && `Axtarışınıza uyğun nəticələr`) || (lang === "EN" && `Results matching your search`) || (lang === "RU" && `Результаты, соответствующие вашему поиску`)} </p>
            { loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> : (  SearchResult?.length >= 1 ? <div className="items">{SearchResult.map(product =>  <ItemCard delivery={product?.delivery}  NumberOfGoods={props?.NumberOfGoods}  modalOpener3={props.modalOpener3} cardId={product?.id} image={product?.thumb}  title={product?.title}  desc={product?.seller_data?.name}  unitType={product?.unit.id} price={money === "₼" ? product?.qiymet : Math.floor(product?.qiymet / 1.7)} weight={product?.ceki_hecm}   discount={product?.discount} productModal={props?.productModal}  star={product?.starsall}/>)}</div> : <p className='resultNot'>{lang === "AZ" && `Axtarışınıza uyğun nəticə tapılmadı` || lang === "EN" && `No results found for your search` || lang === "RU" && `По вашему запросу ничего не найдено`} </p>)}
        </div>
    )
}

export default SearchResult

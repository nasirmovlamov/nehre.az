import axios from 'axios'
import React from 'react'
import { useState , useContext} from 'react'
import { useEffect } from 'react'
import '../assets/css/searchResult.css'
import ReactLoading from 'react-loading';
import ItemCard from './ItemCard'
import {ProductListingContext} from '../components/ProductListingProvider'

function SearchResult(props) {
    const context = useContext(ProductListingContext)
    const {setSearchResult, SearchResult,ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const [loader, setloader] = useState(true)
    const [SearchResultData, setSearchResultData] = useState([])
    
    useEffect(async () => {
        setloader(true)
        if(SearchResult !== undefined && SearchResult !== null && SearchResult !== '')
        {
            try {
                const res = await  axios.get(`https://nehra.az/public/api/search/${SearchResult}`)
                console.log(res.data)
                setSearchResultData(res.data) 
                setloader(false)
            } catch (error) {
                setSearchResultData([])
            }
            
        }
        setloader(false)
    }, [SearchResult])

    return (
        <div className="searchResult pagescroll">
            <p className='resultTitle'>{(lang === "AZ" && `Axtarışınıza uyğun nəticələr`) || (lang === "EN" && `Results matching your search`) || (lang === "RU" && `Результаты, соответствующие вашему поиску`)} </p>
            { loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> : (  SearchResultData?.length > 0 ? <div className="items">{SearchResultData.map(product =>  <ItemCard product={product}/>)}</div> : <p className='resultNot'>{lang === "AZ" && `Axtarışınıza uyğun nəticə tapılmadı` || lang === "EN" && `No results found for your search` || lang === "RU" && `По вашему запросу ничего не найдено`} </p>)}
        </div>
    )
}

export default SearchResult

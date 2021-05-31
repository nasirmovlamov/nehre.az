import React , {useContext} from 'react'
import ItemCard from './ItemCard'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {ProductListingContext} from '../components/ProductListingProvider'

function Bookmarks() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    var bookmarks = JSON.parse(sessionStorage.getItem('SecilmishProduct'))
    return (
        <div className="cabinetCont bookmarks ">
            <p className="title">{lang === "AZ" && `Seçilmiş məhsullar` || lang === "EN" && `Selected Products` || lang === "RU" && `Избранные продукты`}</p>
            {/* <p className="selection"><button className="button"><HelpOutlineIcon/> Assortment for: <p>all dates <ArrowRightIcon/></p> </button></p> */}
            <div className="gridCont1">
                {bookmarks !== null && bookmarks.map(product => <ItemCard  delivery={product?.delivery} cardId={product?.id}   image={product?.thumb}  title={product?.title}  desc={product?.desc}  unitType={product?.unitType} price={money === "₼" ? product?.qiymet : Math.floor(product?.qiymet / 1.7)} weight={product?.ceki_hecm}   discount={product?.discount} star={product?.starsall}/>)}
            </div>
        </div>
    )
}

export default Bookmarks

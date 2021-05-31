import React , {useContext} from 'react'
import ItemCard from './ItemCard'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {ProductListingContext} from '../components/ProductListingProvider'

function Bookmarks() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)
    var bookmarks = JSON.parse(sessionStorage.getItem('SecilmishProduct'))
    return (
        <div className="cabinetCont bookmarks ">
            <p className="title">{lang === "AZ" && `Seçilmiş məhsullar` || lang === "EN" && `Selected Products` || lang === "RU" && `Избранные продукты`}</p>
            {/* <p className="selection"><button className="button"><HelpOutlineIcon/> Assortment for: <p>all dates <ArrowRightIcon/></p> </button></p> */}
            <div className="gridCont1">
                {bookmarks.map(product => <ItemCard  delivery={product?.delivery} id={product?.id}   image={product?.image}  title={product?.title}  desc={product?.desc}  unitType={product?.unitType} price={money === "₼" ? product?.price : Math.floor(product?.price / 1.7)} weight={product?.weight}   discount={product?.discount} productModal={product?.productModal} id={product?.id}  star={product?.star}/>)}
            </div>
        </div>
    )
}

export default Bookmarks

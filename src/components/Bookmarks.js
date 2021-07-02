import React , {useContext} from 'react'
import ItemCard from './ItemCard'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {ProductListingContext} from '../components/ProductListingProvider'

function Bookmarks() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    return (
        <div className="cabinetCont bookmarks ">
            <p className="title">{lang === "AZ" && `Seçilmiş məhsullar` || lang === "EN" && `Selected Products` || lang === "RU" && `Избранные продукты`}</p>
            {/* <p className="selection"><button className="button"><HelpOutlineIcon/> Assortment for: <p>all dates <ArrowRightIcon/></p> </button></p> */}
            <div className="gridCont1">
                {SelectedsProduct.map(product => <ItemCard product={product.product}/>)}
            </div>
        </div>
    )
}

export default Bookmarks

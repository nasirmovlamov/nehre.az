import React from 'react'
import ItemCard from './ItemCard'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
function Bookmarks() {
    var bookmarks = JSON.parse(sessionStorage.getItem('SecilmishProduct'))
    return (
        <div className="cabinetCont bookmarks ">
            <p className="title">Featured Products</p>
            {/* <p className="selection"><button className="button"><HelpOutlineIcon/> Assortment for: <p>all dates <ArrowRightIcon/></p> </button></p> */}
            <div className="gridCont1">
                {bookmarks.map(item => <ItemCard  id={item.id} ParcelWeight={item.ParcelWeight} setParcelWeight={item.setParcelWeight} NumberOfGoods={item.NumberOfGoods} setNumberOfGoods={item.setNumberOfGoods} setPaymentPrice={item.setPaymentPrice} PaymentPrice={item.PaymentPrice}  modalOpener3={item.modalOpener3} cardId={item.id} image={item.image}    title={item.title} desc={item.desc} price={item.price} weight={item.weight} discount={item.discount} id={item.id}  star={item.star}/>)}
            </div>
        </div>
    )
}

export default Bookmarks

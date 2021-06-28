import React, { useRef, useContext } from 'react'
import "../assets/css/cardSlider1.css"
import Button1 from './Button1'
import Skeleton from '@material-ui/lab/Skeleton';
import {ProductListingContext} from '../components/ProductListingProvider'

function CardSlider1(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const inputTitle = useRef(null);
    const inputDesc = useRef(null);
    const imgHandler = {
        background: `url(https://nehra.az/storage/app/public/${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",

    }
    // if ( parseInt(props?.turnoverlay) === 0) {
    //     inputTitle?.current?.setAttribute('style' , 'background-color:rgba(0,0,0,0);')
    //     inputDesc?.current?.setAttribute('style' , 'background-color:rgba(0,0,0,0);')
    // }
    return (
        <a href={`${props.link}`}>
            
                <div className="cardSlider1" style={imgHandler}>
                    <div className="cardSlider2"  >
                        <div className="textCont" ref={inputTitle}>
                            {parseInt(props?.turntitle) !== 0 ? <h4  className="title">{props.name}</h4> : ""}
                            {parseInt(props?.turndesc) !== 0 ? <p className="desc">{props.desc}</p> : ""}
                            {parseInt(props?.turnetrafli) !== 0 ?  <Button1 value={(lang === "AZ" && `Ətraflı`) || (lang === "EN" && `More`) || (lang === "RU" && `Eще`)} /> : "" }
                        </div>
                    </div>
                </div>
        </a>
    )
}

export default CardSlider1

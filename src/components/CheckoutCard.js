import React, {useEffect, useState, useContext} from 'react'
import "../assets/css/cardPage.css"
import clock from "../assets/images/clock.svg"
import Button1 from '../components/Button1'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import avatar from "../assets/images/avatar.jpg"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash'
import axios from 'axios';
import {ProductListingContext} from '../components/ProductListingProvider'
import {Link, useLocation } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/core/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';
import DateCropLang from './DateCropLang';
import DateSelect from './DateMoment'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useHistory } from 'react-router-dom';
function CheckoutCard(props) {
    const history = useHistory()
    const location = useLocation()
    
    const context = useContext(ProductListingContext)
    const {ProdutData, currency, setProdutData,closeBucketF, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,deleteCard,discountHandler} = context
    const {product} = props
    
    const checkoutMobile = useMediaQuery('(max-width:600px)');

    const DarkTT = withStyles((theme) => ({
        arrow: {
            color: theme.palette.common.black,
        },
        tooltip: {
            backgroundColor: "black",
            color: 'white',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }))(Tooltip);
    
    
    
    
    const imgHandler = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${product?.thumb})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
    }
   
    // console.log(props.delivery)
    const lookAt = (link) => {
        history.push({ ...location, pathname: `/${product?.slug}` }) 
        closeBucketF()
    }
    return (
        <>
        {console.log(ProdutData)}
            <div key={props.key} className="item">
                            {product?.thumb !== undefined ? 
                                <div className="imgCont" style={imgHandler}></div>
                            :
                                <Skeleton variant="rect" width={104} height={100} animation="wave"/>
                            }
                            <div className="aboutItem">
                            
                                <p className="title">{(lang === "AZ" && product.title  ) || (lang === "EN" && product.title_en) || (lang === "RU" && product.title_ru)}</p>
                                <p className="priceAndWeight">{ money === "₼" ? ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.cost  : (ProdutData[ProdutData.findIndex(x=>x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.cost  / currency).toFixed(1)} {money}  / {((product?.unit?.id === 2 || product?.unit?.id === 4 || product?.unit?.id === 1) ? product?.ceki_hecm : 1 ) + " " + (lang === "AZ" && product?.unit?.ad  ) || (lang === "EN" && product?.unit?.ad_en) || (lang === "RU" && product?.unit?.ad_ru)}</p>
                                <div className="dates">
                                {product.delivery?.map(delivery =>
                                <>
                                    {
                                        <DarkTT title={`${DateSelect(delivery)}`} placement="top" arrow>
                                            <div className="date"><DateCropLang day={delivery} /></div>
                                        </DarkTT>
                                    }
                                </>
                                )}  
                                </div>
                            </div>
                            {
                                !checkoutMobile &&
                                <>
                                    <div className="btnCont">
                                        {ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.count && <Button1 function={() => removeItem(product)} value={<RemoveIcon/>} color="#085096"/>}
                                        <p className="priceValue">{(ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.count)}</p>
                                        <Button1 function={() => addItem(product)} value={<AddIcon/>}  color="#085096"/>
                                    </div>

                                    <p className="price">{ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)] !== undefined ?  (ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.count *  (money === "₼" ? ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.cost : (ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.cost / currency))).toFixed(1) : 0}  {money}</p>
                                    <div className='eyeAndDelete'>
                                        {<button onClick={() => deleteCard(product)} className="delete"><DeleteIcon/></button>}
                                        {ProdutData[ProdutData.findIndex(x=> x.product.hasOwnProperty('combo_id') && x.product.combo_id === product?.id)] && <button  className="delete" onClick={() => lookAt(product.slug)}> <VisibilityIcon/> </button>}
                                    </div>
                                </>    
                            }

                            {/* //Mobile Version */}
                            {
                                checkoutMobile &&
                                <div className='mobileCheckout'>
                                    <div className="btnCont">
                                        <Button1 function={() => removeItem(product)} value={<RemoveIcon/>} color="#085096"/>
                                        <p className="priceValue">{product?.id !== undefined ? (ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.count) : 0}</p>
                                        <Button1 function={() => addItem(product)} value={<AddIcon/>}  color="#085096"/>
                                    </div>
                                    <p className="price">{ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)] !== undefined ?  (ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.count *  (money === "₼" ? ProdutData[ProdutData.findIndex(x=>  x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.cost : (ProdutData[ProdutData.findIndex(x=>  x.hasOwnProperty('combo_id') ? x.combo_id === product?.combo_id :  x.id === product?.id)]?.cost / currency))).toFixed(1) : 0}  {money}</p>
                                    <div className='eyeAndDelete'>
                                        {<button onClick={() => deleteCard(product)} className="delete"><DeleteIcon/></button>}
                                        {ProdutData[ProdutData.findIndex(x=> x.hasOwnProperty('combo_id') && x.combo_id === product?.combo_id)] && <button className="delete"  onClick={() => lookAt(product.slug)}> <VisibilityIcon/></button>}
                                    </div>
                                </div>    
                            }
                            
            </div>
            <hr/>
        </>
    )
}

export default CheckoutCard

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
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';
import DateCropLang from './DateCropLang';

function CheckoutCard(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus] = useContext(ProductListingContext)
    const checkoutMobile = useMediaQuery('(max-width:600px)');

    const [Product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/product/${props.id}`)
        .then(res => setProduct(res.data))
        .catch(err=> console.log(err))
    } , [])

    
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
    
    
    
    const discountHandler = (discount) => {
        if (discount !== 0 && discount !== null  && discount !== undefined) {
            var discountPrice = 0;
            discountPrice = parseInt(ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost)
            return discountPrice;         
        } 
        else {
            return ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost
        }
    }
    
    const imgHandler = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${Product?.thumb})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: "cover",
    }

//
    moment.locale(sessionStorage.getItem('lang'))
    //Date //Date //Date
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const monday = new Date(tomorrow)
    monday.setDate(tomorrow.getDate() + (1 + 7 - tomorrow.getDay()) % 7);
    const tuesday = new Date(tomorrow)
    tuesday.setDate(tomorrow.getDate() + (2 + 7 - tomorrow.getDay()) % 7);
    const wednesday = new Date(tomorrow)
    wednesday.setDate(tomorrow.getDate() + (3 + 7 - tomorrow.getDay()) % 7);
    const thursday = new Date(tomorrow)
    thursday.setDate(tomorrow.getDate() + (4 + 7 - tomorrow.getDay()) % 7);
    const friday = new Date(tomorrow)
    friday.setDate(tomorrow.getDate() + (5 + 7 - tomorrow.getDay()) % 7);
    const saturday = new Date(tomorrow)
    saturday.setDate(tomorrow.getDate() + (6 + 7 - tomorrow.getDay()) % 7);
    const sunday = new Date(tomorrow)
    sunday.setDate(tomorrow.getDate() + (7 + 7 - tomorrow.getDay()) % 7);
    var newmonday = moment(monday).format( 'dddd, D MMMM');
    var newtuesday = moment(tuesday).format( 'dddd, D MMMM');
    var newwednesday = moment(wednesday).format( 'dddd, D MMMM');
    var newthursday = moment(thursday).format( 'dddd, D MMMM');
    var newfriday = moment(friday).format( 'dddd, D MMMM');
    var newsaturday = moment(saturday).format( 'dddd, D MMMM');
    var newsunday = moment(sunday).format( 'dddd, D MMMM');
//







    // console.log(props.delivery)
    
    return (
        <>
            <div key={props.key} className="item">
                            {Product?.thumb !== undefined ? 
                                <div className="imgCont" style={imgHandler}></div>
                            :
                                <Skeleton variant="rect" width={104} height={100} animation="wave"/>
                            }
                            <div className="aboutItem">
                            
                                <p className="title">{(lang === "AZ" && Product?.title_az) || (lang === "EN" && Product?.title_en) || (lang === "RU" && Product?.title_ru)}</p>
                                <p className="priceAndWeight">{ money === "₼" ? ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost  : (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost  / 1.7).toFixed(1)} {money}  / {((Product?.unit?.id === 2 || Product?.unit?.id === 4 || Product?.unit?.id === 1) ? Product?.ceki_hecm : 1 ) + " " + (lang === "AZ" && Product?.unit?.ad  ) || (lang === "EN" && Product?.unit?.ad_en) || (lang === "RU" && Product?.unit?.ad_ru)}</p>
                                <div className="dates">
                                {props.delivery?.map(delivery =>
                                <>
                                    {
                                        <DarkTT title={`${
                                                        (delivery === "1" && newmonday) ||  
                                                        (delivery === "2" && newtuesday) ||  
                                                        (delivery === "3" && newwednesday) || 
                                                        (delivery === "4" && newthursday) || 
                                                        (delivery === "5" && newfriday) || 
                                                        (delivery === "6" && newsaturday) ||
                                                        (delivery === "7" && newsunday)}`} placement="top" arrow>
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
                                        {ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count && <Button1 function={() => removeItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm , Product?.unit?.unit_id , Product?.delivery , Product?.title , props.bonus)} value={<RemoveIcon/>} color="#085096"/>}
                                        <p className="priceValue">{Product?.id !== undefined ? (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count) : 0}</p>
                                        <Button1 function={() => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm , Product?.unit?.unit_id , Product?.delivery , Product?.title , props.bonus)} value={<AddIcon/>}  color="#085096"/>
                                    </div>

                                    <p className="price">{ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)] !== undefined ?  (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count *  (money === "₼" ? ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost : (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost / 1.7))).toFixed(1) : 0}  {money}</p>
                                    <button onClick={() => props.deleteCard(Product?.id , Product?.price , Product?.delivery ,  props.bonus)} className="delete"><DeleteIcon/></button>
                                </>    
                            }

                            {/* //Mobile Version */}
                            {
                                checkoutMobile &&
                                <div className='mobileCheckout'>
                                    <div className="btnCont">
                                        <Button1 function={() => removeItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm , Product?.unit?.unit_id , Product?.delivery , Product?.title, props.bonus)} value={<RemoveIcon/>} color="#085096"/>
                                        <p className="priceValue">{ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count}</p>
                                        <Button1 function={() => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm , Product?.unit?.unit_id , Product?.delivery , Product?.title , props.bonus)} value={<AddIcon/>}  color="#085096"/>
                                    </div>
                                    <p className="price">{Product?.id !== undefined  ? (money === "₼" ? (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count *  ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost) : (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count * ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost / 1.7).toFixed(1) ) : 0}   {money}</p>
                                    <button onClick={() => props.deleteCard(Product?.id , Product?.price)} className="delete"><DeleteIcon/></button>
                                </div>    
                            }
                            
                        </div>
                        <hr/>
        </>
    )
}

export default CheckoutCard

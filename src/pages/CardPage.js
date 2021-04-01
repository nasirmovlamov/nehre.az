import React, {useEffect, useState} from 'react'
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
import CheckoutCard from '../components/CheckoutCard';
import axios from 'axios';
import info from "../assets/images/info.svg"
import InfoIcon from '@material-ui/icons/Info';
function CardPage(props) {
    const imgHandler = {
        background: `url(${avatar}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    
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
    const colorChang = {
        color: ""
    }

    const functionHandler = () => {
        if(props.UserId)
        props.functionOpenCheckoutPage()
        props.functionClose()
    }
    const [Items, setItems] = useState(JSON.parse(sessionStorage.getItem('orders')))
    const [MinOrder, setMinOrder] = useState()
    
    useEffect(() => {
        axios.get('https://nehra.az/public/api/settings/')
             .then(res => setMinOrder(res.data.min_order_amount))
             .then(err => console.log(err))
    }, [])
    const clearBucket = () => {
        sessionStorage.removeItem('orders')
        sessionStorage.removeItem('ordersDetails')
        setItems([])
    }
    const [check, setcheck] = useState(false)
    
    const deleteCard = (num , price) => {
        console.log(num);
        var orders = JSON.parse(sessionStorage.getItem('orders'))
        setItems(Items.filter((item) => item.id !== num))
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].id === num ) {
                orders.splice(index , 1)
                sessionStorage.setItem('orders' , JSON.stringify(orders))
                return 0 
            }
        }
    }

    const [Product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/product/${props.id}`)
        .then(res => setProduct(res.data) )
        .catch(err=> console.log(err))
    } , [])
    
    return (
        <div className="cardCont">
            
            <main className="mainSide">
                <p className="title">
                    <p className="basketTitle">Basket {1 < MinOrder   ?  <div className="minOrder"> <InfoIcon/> Minimum sifariş qiyməti {MinOrder} ₼</div> : " " }</p>
                    <hr/>
                </p>
                <div className="gridCont1">
                    <div className="gridCont">
                        {Items.map( element => 
                            <div>
                                <div className="item">
                                    <CheckoutCard ParcelWeight={props.ParcelWeight} setParcelWeight={props.setParcelWeight} NumberOfGoods={props.NumberOfGoods} setNumberOfGoods={props.setNumberOfGoods} cost={element.cost} PaymentPrice={props.PaymentPrice} setPaymentPrice={props.setPaymentPrice} deleteCard={deleteCard}  id={element.id} count={element.count}/>
                                    <button onClick={() => deleteCard(element.id , Product?.price)} className="delete"><DeleteIcon/></button>
                                </div>
                                <hr/>
                            </div>
                        )}
                            
                    </div>
                </div>
            </main>
            
            <aside className="aside">
                <div className="mainPart">
                    <div className="topPart">
                        <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                        <p className="text1"><img width="12px" src={clock} alt=""/>  Delivery soon </p>
                        <p className="text">30 yanvar <div className="date">BC</div></p>
                    </div>
                    
                    <div className="downPart">

                        <div className="goods"><p className="key">Weight of Parcel</p> <p className="value ">{props.ParcelWeight}</p> </div> 
                        <div className="goods"><p className="key">Number of Goods</p> <p className="value ">{props.NumberOfGoods}</p> </div> 
                        <div className="cost"><p className="key">Product cost</p> <p className="value value2"> {props.PaymentPrice} AZN </p> </div> 
                        <Button1 disabled={props.PaymentPrice < MinOrder ? true : false} value="Checkout" color="#085096" function={functionHandler} /> 
                        <p className="cashback">There will be 10$ cashback</p>
                    </div>
                </div>
                    <button   className="clearBucket" onClick={clearBucket}><DeleteIcon/> Səbəti təmizlə</button>
                
            </aside>
        </div>
    )
}

export default CardPage

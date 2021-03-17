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
    const [Items, setItems] = useState(JSON.parse(localStorage.getItem('orders')))

    const [PaymentPrice, setPaymentPrice] = useState(JSON.parse(localStorage.getItem('ordersDetails'))?.cost)
    const [AllNumberOfGoods, setAllNumberOfGoods] = useState(JSON.parse(localStorage.getItem('ordersDetails'))?.numberOfGoods)
    const [MinOrder, setMinOrder] = useState()
    useEffect(() => {
        axios.get('https://nehra.az/public/api/settings/')
             .then(res => setMinOrder(res.data.min_order_amount))
             .then(err => console.log(err))
    }, [])
    const clearBucket = () => {
        localStorage.removeItem('orders')
        localStorage.removeItem('ordersDetails')
        setItems([])
        setPaymentPrice(0)
        setAllNumberOfGoods(0)
    }
    const [check, setcheck] = useState(false)
    
    const deleteCard = (num , price) => {
        var orders = JSON.parse(localStorage.getItem('orders'))
        console.log(num);
        console.log(orders);
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].id === num ) {
                console.log(index);
                orders.splice(index , 1)
                localStorage.setItem('orders' , JSON.stringify(orders))
                setItems([])
                setItems(JSON.parse(localStorage.getItem('orders')))
                return 0 
            }
        }
    }

    const itemsArr = []
    Items?.map(element => itemsArr.push(<CheckoutCard deleteCard={deleteCard} setAllNumberOfGoods={setAllNumberOfGoods} AllNumberOfGoods={AllNumberOfGoods} PaymentPrice={PaymentPrice} setPaymentPrice={setPaymentPrice}  id={element.id} count={element.count}/>))
    
    return (
        <div className="cardCont">
            
            <main className="mainSide">
                <p className="title">
                    <p className="basketTitle">Basket {PaymentPrice < MinOrder   ?  <div className="minOrder"> <InfoIcon/> Minimum sifariş qiyməti {MinOrder} ₼</div> : " " }</p>
                    <hr/>
                </p>
                <div className="gridCont1">
                    <div className="gridCont">
                        {itemsArr}
                        
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

                        <div className="goods"><p className="key">Number of Goods</p> <p className="value ">{AllNumberOfGoods}</p> </div> 
                        <div className="cost"><p className="key">Product cost</p> <p className="value value2">{PaymentPrice} AZN </p> </div> 
                        <Button1 disabled={PaymentPrice < MinOrder ? true : false} value="Checkout" color="#085096" function={functionHandler} /> 
                        <p className="cashback">There will be 10$ cashback</p>
                    </div>
                </div>
                    <button   className="clearBucket" onClick={clearBucket}><DeleteIcon/> Səbəti təmizlə</button>
                
            </aside>
        </div>
    )
}

export default CardPage

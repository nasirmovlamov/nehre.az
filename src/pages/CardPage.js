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
        props.functionOpenCheckoutPage()
        props.functionClose()
    }
    const [Items, setItems] = useState(JSON.parse(localStorage.getItem('items')))
    const deleteCard = (num) => {
        Items.splice( (Items.indexOf[num]-1)  , 1 ) 
        localStorage.setItem('items' , JSON.stringify(Items))
        console.log(Items)       
    }
    const [PaymentPrice, setPaymentPrice] = useState(0)
    const [AllNumberOfGoods, setAllNumberOfGoods] = useState(0)
    
    return (
        <div className="cardCont">
            
            <main className="mainSide">
                <p className="title">
                    Basket
                    <hr/>
                </p>
                <div className="gridCont1">
                    <div className="gridCont">
                        {Items?.map(element => <CheckoutCard setAllNumberOfGoods={setAllNumberOfGoods} AllNumberOfGoods={AllNumberOfGoods} PaymentPrice={PaymentPrice} setPaymentPrice={setPaymentPrice} deleteCard={deleteCard} id={element}/>)}
                    </div>
                </div>


            </main>
            
            
            
            <aside className="aside">
                <div className="topPart">
                    <p className="text1"><img width="12px" src={clock} alt=""/>  Delivery soon </p>
                    <p className="text">30 yanvar <div className="date">BC</div></p>
                </div>
                
                <div className="downPart">
                    <div className="goods"><p className="key">Number of Goods</p> <p className="value ">{AllNumberOfGoods}</p> </div> 
                    <div className="weight"><p className="key">Parcel  Goods</p> <p className="value value1" >28</p> </div> 
                    <div className="cost"><p className="key">Product cost</p> <p className="value value2">{PaymentPrice} </p> </div> 
                    <Button1 value="Checkout" color="#085096" function={functionHandler} />
                    <p className="cashback">There will be 10$ cashback</p>
                </div>

            </aside>
        </div>
    )
}

export default CardPage

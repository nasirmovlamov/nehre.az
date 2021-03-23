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
    

    const functionHandler = () => {
        if(props.UserId)
        props.functionOpenCheckoutPage()
        props.functionClose()
    }
    const [Items, setItems] = useState(JSON.parse(sessionStorage.getItem('orders')))
    const [MinOrder, setMinOrder] = useState()
    console.log(Items)
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
    
    const deleteCard = (num , price) => {
        var orders = JSON.parse(sessionStorage.getItem('orders'))
        setItems(Items.filter((item) => item.id !== num))
        console.log(Items)
        console.log(orders.filter((item) => item.id !== num))
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].id === num ) {
                orders.splice(index , 1)
                sessionStorage.setItem('orders' , JSON.stringify(orders))
                return 0    
            }
        }
    }





    const [Product, setProduct] = useState()

    
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
    
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/product/${props.id}`)
        .then(res => (setProduct(res.data) , setGeneralPrice(discountHandler(res?.data?.discount ))))
        .catch(err=> console.log(err))
    } , [])
    
    const [ProductData, setProductData] = useState(() => {})
    useEffect(() => {
        var orders = JSON.parse(sessionStorage.getItem('orders'))
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].id === Product?.id ) {
                setProductData(orders[index].count)
            }
        }   
    })

    const addItem = (num,price,numberOfElements , weight) => {
        setGeneralPrice(parseInt(price) * (numberOfElements+1))
        props.setNumberOfGoods(parseInt(props.NumberOfGoods) + 1)
        props.setPaymentPrice(parseInt(props.PaymentPrice) + parseInt(price))
        if(weight !== null)
        {
            props.setParcelWeight(parseInt(props.ParcelWeight) + parseInt(weight))
        }
        setProductData(1)
        var orders = JSON.parse(sessionStorage.getItem('orders'))
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].id === num ) {
                orders[index].count++
                setProductData(orders[index].count)
                sessionStorage.setItem('orders' , JSON.stringify(orders))
                return 0 
            }
        }    
        orders.push({id:num , count:1, cost:price})
        sessionStorage.setItem('orders' , JSON.stringify(orders))

    }

    const removeItem = (num,price,numberOfElements , weight) => {
        var orders = JSON.parse(sessionStorage.getItem('orders'))
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].id === num ) {
                if (orders[index].count > 0) {
                    orders[index].count--
                    setGeneralPrice(parseInt(price) * (numberOfElements-1))
                    props.setPaymentPrice(parseInt(props.PaymentPrice) - parseInt(price))
                    if(weight !== null)
                    {
                        props.setParcelWeight(parseInt(props.ParcelWeight) - parseInt(weight))
                    }
                    setProductData(orders[index].count)
                }
                if (orders[index].count === 0) {
                    orders.splice(index , 1)
                }
                sessionStorage.setItem('orders' , JSON.stringify(orders))
                return 0 
            }
        }    
        sessionStorage.setItem('orders' , JSON.stringify(orders))
    }

    const discountHandler = (discount , count , cost) => {
        if (discount !== 0 && discount !== null  && discount !== undefined) {
            var discountPrice = 0;
            discountPrice =  ((parseInt(cost) - (parseInt(count) * parseInt(discount)) / 100))
            return parseInt(discountPrice * parseInt(count));         
        } 
        else {
            return parseInt(cost) * parseInt(count)
        }
    }
    
    const imgHandler = {
        background: `url(https://nehra.az/storage/app/public/${Product?.thumb}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    
    const [GeneralPrice, setGeneralPrice] = useState(0)

    return (
        <div className="cardCont">
            
            <main className="mainSide">
                <p className="title">
                    <p className="basketTitle">Basket {1 < MinOrder   ?  <div className="minOrder"> <InfoIcon/> Minimum sifariş qiyməti {MinOrder} ₼</div> : " " }</p>
                    <hr/>
                </p>
                <div className="gridCont1">
                    <div className="gridCont">
                        {Items.map(element => 
                            <>
                                <div className="item">
                                    <div className="imgCont" style={imgHandler}></div>
                                    
                                    <div className="aboutItem">
                                    
                                        <p className="title">{Product?.title}</p>
                                        <p className="priceAndWeight">{element.cost} AZN  / 250 g.</p>
                                        <div className="dates">
                                            <DarkTT title="Delivery possible for" placement="top" arrow>
                                            <div className="date">Be</div>
                                            </DarkTT>
                                            <DarkTT title="Delivery possible for" placement="top" arrow>
                                                <div className="date">Ç</div>
                                            </DarkTT>
                                            <DarkTT title="Delivery possible for" placement="top" arrow>
                                                <div className="date">Ça</div>
                                            </DarkTT>
                                            <DarkTT title="Delivery possible for" placement="top" arrow>
                                                <div className="date">C</div>
                                            </DarkTT>
                                            <DarkTT title="Delivery possible for" placement="top" arrow>
                                                <div className="date">Ş</div>
                                            </DarkTT>
                                            <DarkTT title="Delivery possible for" placement="top" arrow>
                                                <div className="date">B</div>
                                            </DarkTT>
                                        </div>
                                    </div>
        
                                    <div className="btnCont">
                                        <Button1 function={() => removeItem(Product?.id ,Product?.qiymet, element.count , Product?.ceki_hecm)} value={<RemoveIcon/>} color="#085096"/>
                                        <p className="priceValue"> {element.count}</p>
                                        <Button1 function={() => addItem(Product?.id ,Product?.qiymet, element.count , Product?.ceki_hecm)} value={<AddIcon/>}  color="#085096"/>
                                    </div>
        
                                    <p className="price"> {parseInt(element.count) * parseInt(element.cost) } </p>
                                    <button onClick={() => deleteCard(element.id)} className="delete"><DeleteIcon/></button>
                                </div>
                                <hr/>
                            </>
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

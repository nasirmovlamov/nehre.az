import React, { useState, useEffect } from 'react'
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
function CheckoutCard(props) {
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
    
    var [numberOfElements, setnumberOfElements] = useState(parseInt(props.count))
    var [priceOfElements, setpriceOfElements] = useState(parseInt(props.cost))
    
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
        setnumberOfElements(numberOfElements+1)
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
                    props.setNumberOfGoods(parseInt(props.NumberOfGoods) - 1)
                    setnumberOfElements(numberOfElements-1)
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

    const discountHandler = (discount) => {
        if (discount !== 0 && discount !== null  && discount !== undefined) {
            var discountPrice = 0;
            discountPrice =  ((parseInt(priceOfElements) - (parseInt(priceOfElements) * parseInt(discount)) / 100))
            return parseInt(discountPrice * numberOfElements);         
        } 
        else {
            return priceOfElements * numberOfElements
        }
    }
    
    const imgHandler = {
        background: `url(https://nehra.az/storage/app/public/${Product?.thumb}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    
    const [GeneralPrice, setGeneralPrice] = useState(0)
    return (
        <>
            <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">{Product?.title}</p>
                                <p className="priceAndWeight">{discountHandler(Product?.discount)} AZN  / 250 g.</p>
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
                                <Button1 function={() => removeItem(Product?.id ,Product?.qiymet,numberOfElements , Product?.ceki_hecm)} value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> {ProductData}</p>
                                <Button1 function={() => addItem(Product?.id ,Product?.qiymet,numberOfElements , Product?.ceki_hecm)} value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> {GeneralPrice} </p>
                            <button onClick={() => props.deleteCard(Product?.id , Product?.price)} className="delete"><DeleteIcon/></button>
                        </div>
                        <hr/>
        </>
    )
}

export default CheckoutCard

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
    const colorChang = {
        color: ""
    }
    var [numberOfElements, setnumberOfElements] = useState(1)
    const increaseV = () => {
        setnumberOfElements(numberOfElements+1)
    }
    const decreaseV = () => {
        if(numberOfElements === 1) 
        {
            
        }
        else 
        {
            setnumberOfElements(numberOfElements-1)
        }
    }
    const discountHandler = (discount) => {
        if (discount !== 0 && discount !== null) {
            var discountPrice = 0;
            discountPrice =  ((Product?.qiymet - (Product?.qiymet * discount) / 100))
            colorChang.color = "red"
            return discountPrice.toFixed(2);         
        } 
        else {
            return Product?.qiymet
        }
    }
    const imgHandler = {
        background: `url(https://nehra.az/storage/app/public/${Product?.thumb}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    var GeneralPrice = (discountHandler(Product?.discount) * numberOfElements)
    useEffect(() => {
        console.log(props.AllNumberOfGoods)
        props.setAllNumberOfGoods(props.AllNumberOfGoods + numberOfElements)
    } , [])
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
                                <Button1 function={decreaseV} value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> {numberOfElements}</p>
                                <Button1 function={increaseV} value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> {GeneralPrice.toFixed(0)} </p>

                            <button onClick={() => props.deleteCard(props.id)} className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
        </>
    )
}

export default CheckoutCard

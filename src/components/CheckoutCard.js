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
    
    return (
        <>
            
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

            
        </>
    )
}

export default CheckoutCard

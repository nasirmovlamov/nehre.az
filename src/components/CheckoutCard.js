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

function CheckoutCard(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem] = useContext(ProductListingContext)

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
        background: `url(https://nehra.az/storage/app/public/${Product?.thumb}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    
    return (
        <>
            <div key={props.key} className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">{Product?.title}</p>
                                <p className="priceAndWeight">{ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost} AZN  / {Product?.ceki_hecm} g.</p>
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
                                <Button1 function={() => removeItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)} value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> {ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count}</p>
                                <Button1 function={() => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)} value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> {} </p>
                            <button onClick={() => props.deleteCard(Product?.id , Product?.price)} className="delete"><DeleteIcon/></button>
                        </div>
                        <hr/>
        </>
    )
}

export default CheckoutCard

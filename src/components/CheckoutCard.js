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

function CheckoutCard(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr] = useContext(ProductListingContext)
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
    
    return (
        <>
            <div key={props.key} className="item">
                            {Product?.thumb !== undefined ? 
                                <div className="imgCont" style={imgHandler}></div>
                            :
                                <Skeleton variant="rect" width={104} height={100} animation="wave"/>
                            }
                            <div className="aboutItem">
                            
                                <p className="title">{Product?.title}</p>
                                <p className="priceAndWeight">{ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost} {money}  / {Product?.ceki_hecm} g.</p>
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
                            {
                                !checkoutMobile &&
                                <>
                                    <div className="btnCont">
                                        <Button1 function={() => removeItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)} value={<RemoveIcon/>} color="#085096"/>
                                        <p className="priceValue">{Product?.id !== undefined ? (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count) : 0}</p>
                                        <Button1 function={() => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)} value={<AddIcon/>}  color="#085096"/>
                                    </div>

                                    <p className="price">{Product?.id !== undefined ?  (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count * ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost) : 0}  {money}</p>
                                    <button onClick={() => props.deleteCard(Product?.id , Product?.price)} className="delete"><DeleteIcon/></button>
                                </>    
                            }

                            {/* //Mobile Version */}
                            {
                                checkoutMobile &&
                                <div className='mobileCheckout'>
                                    <div className="btnCont">
                                        <Button1 function={() => removeItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)} value={<RemoveIcon/>} color="#085096"/>
                                        <p className="priceValue">{Product?.id !== undefined ? (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count) : 0}</p>
                                        <Button1 function={() => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)} value={<AddIcon/>}  color="#085096"/>
                                    </div>

                                    <p className="price">{Product?.id !== undefined ?  (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count * ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost) : 0}  ₼</p>
                                    <button onClick={() => props.deleteCard(Product?.id , Product?.price)} className="delete"><DeleteIcon/></button>
                                </div>    
                            }
                            
                        </div>
                        <hr/>
        </>
    )
}

export default CheckoutCard

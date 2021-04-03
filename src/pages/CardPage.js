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
import CheckoutCard from '../components/CheckoutCard';
import axios from 'axios';
import info from "../assets/images/info.svg"
import InfoIcon from '@material-ui/icons/Info';
import {ProductListingContext} from '../components/ProductListingProvider'


function CardPage(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem] = useContext(ProductListingContext)
    
    const functionHandler = () => {
        if(props.UserId)
        props.functionOpenCheckoutPage()
        props.functionClose()
    }
    const [Items, setItems] = useState(ProdutData)
    const [MinOrder, setMinOrder] = useState()
    const [Product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/product/${props.id}`)
        .then(res => setProduct(res.data) )
        .catch(err=> console.log(err))
    } , [])
    console.log(Items)
    useEffect(() => {
        axios.get('https://nehra.az/public/api/settings/')
             .then(res => setMinOrder(res.data.min_order_amount))
             .then(err => console.log(err))
    }, [])

    
    const clearBucket = () => {
        setFinalPrice(0)
        setFinalGoods(0)
        setFinalWeight(0)
        setProdutData([])
        setItems([])
    }
    
    const deleteCard = (num , price) => {
        var index = ProdutData.findIndex(x=> x.id === num);
        setFinalPrice(FinalPrice - (parseInt(price) * ProdutData[index].cost))
        setFinalGoods(FinalGoods - ProdutData[index].count )
        setFinalWeight(FinalWeight - (ProdutData[index].weight * ProdutData[index].count ) )
        var newArr = [...ProdutData]
        newArr.slice(index, 1)
        setProdutData(newArr)
        setItems(Items.filter((item) => item.id !== num))
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
                                    <CheckoutCard key={element.id} deleteCard={deleteCard}  id={element.id} />
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

                        <div className="goods"><p className="key">Weight of Parcel</p> <p className="value ">{FinalWeight}</p> </div> 
                        <div className="goods"><p className="key">Number of Goods</p> <p className="value ">{FinalGoods}</p> </div> 
                        <div className="cost"><p className="key">Product cost</p> <p className="value value2"> {FinalPrice} AZN </p> </div> 
                        <Button1 disabled={FinalPrice < MinOrder ? true : false} value="Checkout" color="#085096" function={props.functionOpenCheckoutPage} /> 
                        <p className="cashback">There will be {FinalPrice / 10} AZN cashback</p>
                    </div>
                </div>
                    <button   className="clearBucket" onClick={clearBucket}><DeleteIcon/> Səbəti təmizlə</button>
                
            </aside>
        </div>
    )
}

export default CardPage

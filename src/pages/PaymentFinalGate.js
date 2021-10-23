import React, { useContext, useEffect, useState } from 'react'
import "../assets/css/paymentFinalGate.css"
import doneIcon from "../assets/images/done.svg"
import ChevronRightIcon from '@material-ui/icons/ChevronRight';     
import {ProductListingContext} from '../components/ProductListingProvider'
import axios from 'axios';

function PaymentFinalGate() {
    const context = useContext(ProductListingContext)
    const {ProdutData,setUserData,openCheckoutF,UserData, closeCheckoutF, addCart, setProdutData, closeBucketF, openBucketF, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,clearBucket ,setItems, setMinOrder, Items, MinOrder} = context
    
    const [state, setstate] = useState()


    const sendPaymentUpdate = async () => {
        if(localStorage.getItem("LoginUserData") === null && localStorage.getItem("paymentType") === null)
        {
            window.location.href = '/'
            return 0
        }
        const paymentType = localStorage.getItem("paymentType")
        const order_id = localStorage.getItem("orderId")
        const id = JSON.parse(localStorage.getItem("LoginUserData")).id
        if(localStorage.getItem("paymentType") === "buyingstaff")
        {
            try {
                const resp = await axios.post("https://nehra.az/api/checkpayment" , {user_id: id, payment_type:paymentType , order_id:order_id})
                const {NewProducts ,uniqueDates , WholeCost , WholeCount , oldProductData , WholeWeight , WholeBonus} = JSON.parse(resp.data.ordered_products)
                const {payment_type} = resp.data
                
                if(payment_type === 1 ||  payment_type === 2)
                {
                    addCart(NewProducts , WholeCost , WholeWeight, WholeCount, WholeBonus, uniqueDates)
                    setDateGoods(uniqueDates)
                    setFinalPrice(WholeCost)
                    setFinalGoods(WholeCount)
                    setProdutData(NewProducts)
                    setFinalWeight(WholeWeight)
                    setFinalBonus(WholeBonus)
                }
            } catch (error) {
                window.location.href = '/'
            }
        }
        else 
        {
            try {
                const resp = await axios.post("https://nehra.az/api/checkpayment/balance" , {user_id: id})
                setUserData(resp.data)
            } catch (error) {
                window.location.href = '/'
            }
        }
    }

    useEffect(() => {
        sendPaymentUpdate()  
    }, [])



    return (
        <div className="PaymentFinalGatePage pagescroll">
            <div className="doneCont"> 
                <img src={doneIcon} width="400px" height="auto"/>
            </div>
            <div className="thankyouCont"> 
                Təşəkkürlər !
            </div>

            <div className="textCont"> 
                Ödənişiniz qəbul olundu. 
            </div>

            <a href="/" className="backToButtonDesign">
                <div className="circleForButton">
                    <div className="outlineButton"><ChevronRightIcon/></div>
                </div>
                <button className="backtoButton"> Geriyə qayıt</button>
            </a>
            
        </div>
    )
}

export default PaymentFinalGate

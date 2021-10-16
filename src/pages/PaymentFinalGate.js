import React, { useEffect, useState } from 'react'
import "../assets/css/paymentFinalGate.css"
import doneIcon from "../assets/images/done.svg"
import ChevronRightIcon from '@material-ui/icons/ChevronRight';     
import axios from 'axios';

function PaymentFinalGate() {
    
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
            } catch (error) {
                window.location.href = '/'
            }
        }
        else 
        {
            try {
                const resp = await axios.post("https://nehra.az/api/checkpayment/balance" , {user_id: id, payment_type:paymentType })
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

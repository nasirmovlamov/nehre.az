import React from 'react'
import "../assets/css/checkoutPage.css"

function CheckoutPage(props) {
    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
    }
    return (
        <div className="checkoutPage">
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <p className="title">CONTACT DETAILS</p>
            <div className="inputCont">
                <input type="text" value="Nail Aghaverdiyev"/>
                <input type="text" value="aqaverdiyev@gmail.com"/>
            </div>
            <div className="deliveryAddress">
                <p className="title">Delivery Address</p>
                <div className="address">Baku, st. Məşədi Əzizbəyov, house 1</div>
            </div>
                <p className="title">Payment Type</p>
            <div className="typeOfPayment">
                <div className="type1"><input type="checkbox"></input> <label>Cash payment </label></div>
                <div className="type2"><input type="checkbox"></input> <label>Card payment on door</label></div>
                <div className="type3"><input type="checkbox"></input> <label>Online payment </label></div>
            </div>
            <Button1 value="Submit" /> 
        </div>
    )
}

export default CheckoutPage

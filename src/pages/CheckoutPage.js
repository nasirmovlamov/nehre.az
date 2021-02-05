import React from 'react'
import "../assets/css/checkoutPage.css"
import Button1 from '../components/Button1'
function CheckoutPage(props) {
    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
    }

    const clickHandler = (num) => {
        for (var i =1; i<4; i++)
        {
            document.getElementById(`checkBox${i}`).checked = false
        }
        document.getElementById(`checkBox${num}`).checked  = true
    }


    return (
        
        <form className="checkoutPage">
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
                <div className="type1"><input  id="checkBox1" onClick={() => clickHandler(1)} type="checkbox"></input> <label>Cash payment </label></div>
                <div className="type2"><input  id="checkBox2" onClick={() => clickHandler(2)} type="checkbox"></input> <label>Card payment on door</label></div>
                <div className="type3"><input  id="checkBox3" onClick={() => clickHandler(3)} type="checkbox"></input> <label>Online payment </label></div>
            </div>
            <Button1 value="Submit" color="#285999"/> 
        </form>
    )
}

export default CheckoutPage

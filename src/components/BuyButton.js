import React, { useEffect,useState  } from 'react'
import busket from "../assets/images/basket.svg"
import "../assets/css/buyButton.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function BuyButton(props) {
    const [UserData, setUserData] = useState(0)
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    })
    const orderHandler = (num,price) => {
        var orders = JSON.parse(localStorage.getItem('orders'))
        var ordersDetails = JSON.parse(localStorage.getItem('ordersDetails'))
        var numberOfGoods = ordersDetails.numberOfGoods , cost = ordersDetails.cost , weight = ordersDetails.weight 
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].id === num ) {
                orders[index].count++
                localStorage.setItem('orders' , JSON.stringify(orders))
                numberOfGoods += 1
                weight += orders[index].count
                ordersDetails = { numberOfGoods:numberOfGoods, cost:parseInt(cost) + parseInt(price), weight:weight}
                localStorage.setItem('ordersDetails' , JSON.stringify(ordersDetails))
                return 0 
            }
        }    
        ordersDetails = { numberOfGoods:numberOfGoods+1, cost:parseInt(cost) + parseInt(price), weight:weight}
        orders.push({id:num , count:1, cost:cost})
        localStorage.setItem('orders' , JSON.stringify(orders))
        localStorage.setItem('ordersDetails' , JSON.stringify(ordersDetails))
    }
    return (
        <button onClick={() => orderHandler(props.cardId , props.cardPrice)} className="buyButton">
            <img src={busket} alt="" width="30px" height="auto"/>
        </button>
    )
}

export default BuyButton

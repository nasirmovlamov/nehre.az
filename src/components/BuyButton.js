import React, { useEffect,useState  } from 'react'
import busket from "../assets/images/basket.svg"
import "../assets/css/buyButton.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function BuyButton(props) {
    const [UserData, setUserData] = useState(0)
    // useEffect(() => {
    //     if (UserData?.id === undefined) {
    //         setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
    //     }
    // })
    const orderHandler = (num,price) => {
        props.functionAdd()
    }
    
    return (
        <button onClick={() => orderHandler(props.cardId , props.cardPrice)} className="buyButton">
            <img src={busket} alt="" width="30px" height="auto"/>
        </button>
    )
}

export default BuyButton

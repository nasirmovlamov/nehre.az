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
    const notify = () => toast.info("Məhsulunuz səbətə əlavə olundu!");
    const notifyW = () => toast.warn("Məhsulunuz səbətdə mövcuddur!");
    const orderHandler = () => {
        if(UserData?.id === undefined) 
        {
            props.modalOpener3() 
        }
        else
        {
            if(props.orders.includes(props.cardId))
            {
                localStorage.setItem('items' ,  JSON.stringify(props.orders))
                notifyW()
            }
            else
            {
                props.orders.push(props.cardId)
                localStorage.setItem('items' ,  JSON.stringify(props.orders))
                notify()
            }
        }
    }
    return (
        <button onClick={() => orderHandler()} className="buyButton">
            <img src={busket} alt="" width="30px" height="auto"/>
        </button>
    )
}

export default BuyButton

import axios from 'axios';
import React, {useEffect, useState, useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'
import Notification from './Notification';


function Reminders() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)

    const [Notfs, setNotfs] = useState([])
    const sendOrderRequest = async () => {
        try {
            const resp = await axios.get(`https://nehra.az/public/api/getnotification?user_id=${JSON.parse(localStorage.getItem("LoginUserData")).id}`)   
            setNotfs(resp.data);

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        sendOrderRequest()
    }, [])
    return (
        <div className="cabinetCont orders bookmarks reminders">
        <p className="title">{lang === "AZ" && `Bildirişlərim` || lang === "EN" && `Search` || lang === "RU" && `Мои уведомления`}</p>
        {/* <p className="subTitle">{lang === "AZ" && `E-poçt və ya SMS ilə bir xəbərdarlıq əlavə edin və sifariş verməyinizi xatırlatacağıq.` || lang === "EN" && `Add an alert by e-mail or SMS, and we will remind you to place an order. ` || lang === "RU" && `Добавьте оповещение по электронной почте или SMS, и мы напомним вам о размещении заказа.`}</p> */}
        <div className="gridCont1">
            <p className="alerts">{Notfs.length > 0 ? Notfs.map(notf =><Notification notf={notf}/>)  :     (lang === "AZ" && `Bildirişiniz yoxdur!` || lang === "EN" && `You have no notfications! ` || lang === "RU" && `У вас нет уведомлений!`)} </p>
        </div>
    </div>
    )
}

export default Reminders

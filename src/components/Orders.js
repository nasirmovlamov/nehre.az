import axios from 'axios';
import React from 'react'
import { useEffect  , useContext} from 'react';
import { useState } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'

function Orders() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const [Orders, setOrders] = useState([])
    const sendOrderRequest = async () => {
        try {
            const resp = await axios.post('https://nehra.az/public/api/getorder' , {user_id : JSON.parse(localStorage.getItem("LoginUserData")).id })   
            setOrders(resp.data);

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        sendOrderRequest()
    }, [])
    return (
        <div className="cabinetCont address deposites bonuses">
            <p className="title">{(lang === "AZ" && `Sifarişlər Tarixi`) || (lang === "EN" && `Orders' Date`) || (lang === "RU" && `Дата заказа`)}</p>
            <table>
                <tr className="start"> <td>{(lang === "AZ" && `Tarix`) || (lang === "EN" && `Date`) || (lang === "RU" && `Дата`)}</td> <td>{(lang === "AZ" && `Qiymət`) || (lang === "EN" && `Price`) || (lang === "RU" && `Цена`)}</td> </tr>
                {Orders.length > 0 ?
                    Orders.map( order => <> <tr> <td>{order.order_date}</td> <td>{order.total + " $"}</td> </tr> </>)
                :
                 <td colspan='2' className='OrderNotFound'>{(lang === "AZ" && `Sifarişiniz mövcud deyil`) || (lang === "EN" && `Your order is not available`) || (lang === "RU" && `Ваш заказ недоступен`)}</td>
                }
            </table>
        </div>
    )
}

export default Orders

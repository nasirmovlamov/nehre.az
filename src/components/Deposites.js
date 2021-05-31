import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import {  useContext} from 'react';

function Deposites() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    
    const [Deposites, setDeposites] = useState([])
    const sendOrderRequest = async () => {
        try {
            const resp = await axios.get(`https://nehra.az/public/api/getdeposit?user_id=${JSON.parse(localStorage.getItem("LoginUserData")).id}`)   
            console.log(resp.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        sendOrderRequest()
    }, [])


    return (
        <div className="cabinetCont address deposites">
        <p className="title"> {lang === "AZ" && `Depozitlər` || lang === "EN" && ` Deposites` || lang === "RU" && `Депозиты`}</p>
        <p className="myAdress "> {lang === "AZ" && `Sizin balansınız` || lang === "EN" && ` Your Current balance is` || lang === "RU" && `Ваш текущий баланс`}<span className="money"> 1300$ </span></p>
        <table>
            <tr className="start"> <td>{lang === "AZ" && `Tarix` || lang === "EN" && `Date` || lang === "RU" && `Дата`}</td> <td>{lang === "AZ" && `Qiymət` || lang === "EN" && `Price` || lang === "RU" && `Цена`}</td> </tr>
                {Deposites.length > 0 ?
                    Deposites.map( order => <> <tr> <td>{order.order_date}</td> <td>{order.amount + " m"}</td> </tr> </>)
                :
                 <td colspan='2' className='OrderNotFound'>{lang === "AZ" && `Sifarişiniz mövcud deyil` || lang === "EN" && `Your order is not available` || lang === "RU" && `Ваш заказ недоступен`}</td>
                }
        </table>
    </div>
    )
}

export default Deposites

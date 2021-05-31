import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import {  useContext} from 'react';



function Bonuses() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    
    const [Deposites, setDeposites] = useState([])
    const sendOrderRequest = async () => {
        try {
            const resp = await axios.get(`https://nehra.az/public/api/getbonus?user_id=${JSON.parse(localStorage.getItem("LoginUserData")).id}`)   
            console.log(resp.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        sendOrderRequest()
    }, [])

    return (
        <div className="cabinetCont address deposites bonuses">
        <p className="title"> {lang === "AZ" && `Bonuslar` || lang === "EN" && ` Bonuses` || lang === "RU" && `Бонусы`}</p>
        <p className="myAdress ">{lang === "AZ" && `Cari Bonusunuz ` || lang === "EN" && `Your Current Bonuse is  ` || lang === "RU" && `Ваш текущий бонус`}<span className="money"> 10$ </span></p>
        <table>
                <tr className="start"> <td>{lang === "AZ" && `Tarix` || lang === "EN" && `Date` || lang === "RU" && `Дата`}</td> <td>{lang === "AZ" && `Qiymət` || lang === "EN" && `Price` || lang === "RU" && `Цена`}</td> </tr>
                {Deposites.length > 0 ?
                    Deposites.map( order => <> <tr> <td>{order.date}</td> <td>{order.value + " m"}</td> </tr> </>)
                :
                 <td colspan='2' className='OrderNotFound'>{lang === "AZ" && `Sifarişiniz mövcud deyil` || lang === "EN" && `Your order is not available` || lang === "RU" && `Ваш заказ недоступен`}</td>
                }
        </table>
    </div>
    )
}

export default Bonuses

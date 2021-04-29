import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function Orders() {
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
            <p className="title">Sifarişlər Tarixi</p>
            <table>
                <tr className="start"> <td>Tarix</td> <td>Qiymət</td> </tr>
                {Orders.length > 0 ?
                    Orders.map( order => <> <tr> <td>{order.order_date}</td> <td>{order.total + " $"}</td> </tr> </>)
                :
                 <td colspan='2' className='OrderNotFound'>Sifarişiniz mövcud deyil</td>
                }
            </table>
        </div>
    )
}

export default Orders

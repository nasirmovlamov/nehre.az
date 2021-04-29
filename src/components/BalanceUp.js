import React from 'react'
import '../assets/css/balanceUp.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

function BalanceUp(props) {
    const [amount, setamount] = useState()
    const [error, seterror] = useState(false)
    const notify = () => toast.info("Sorğunuz göndərildi!");
    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setamount(value);
        if(amount !== "")
        {
            seterror(false)
        }
    }
    const onSubmit = (e) =>{
        if(amount !== '')
        {
            
            axios.post('https://nehra.az/public/api/topup', {user_id: props.userId , amount:amount} )
                .then(res=> (console.log(res) , res.status === 200 && (notify() , props.functionClose() , setTimeout(() => { window.location.href = '/payment'}, 3000) )) )
        }
        else 
        {
            seterror(true)
        }
    }

    return (
        <div className='balanceUp'>
            <div className='close'><button onClick={() => props.functionClose()}>&#10006;</button></div>
            <p className="title">Balans Artırma</p>
            <input value={amount} onChange={handleChange} />
            <button className='button' onClick={onSubmit}>Göndər</button>
        </div>
    )
}

export default BalanceUp

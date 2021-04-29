import React, {useContext} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'

function PasswordChanger(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)

    const [email, setemail] = useState()
    const changeEmail = (e) => {
        setemail(e.target.value)
    }
    return (
        <div className='authSms'>
            <div><button onClick={props.functionClose}>x</button></div>
            <p className="tit">{lang === "AZ" && `Şifrə yeniləmə` || lang === "EN" && `Password Update` || lang === "RU" && `Обновление пароля`} </p>
            <input onChange={(e) => changeEmail(e)} type="text" name="" id=""/>
            <input type="number" name="" id=""/>
            <button>{lang === "AZ" && `Daxil edin` || lang === "EN" && `Submit` || lang === "RU" && `Bходить`}</button>
        </div>
    )
}

export default PasswordChanger

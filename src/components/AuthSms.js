import axios from 'axios'
import React , {useContext} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import {ProductListingContext} from '../components/ProductListingProvider'
import Button1 from './Button1';

function AuthSms(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)

    const [Phone, setPhone] = useState(JSON.parse(localStorage.getItem('LoginUserData')).phone)
    const notify = () => toast.info(lang === "AZ" && `Hesabınız Təsdiqləndi!` || lang === "EN" && `Your account has been confirmed!` || lang === "RU" && `Ваш аккаунт подтвержден!`);
    
    const [code, setcode] = useState()
    const onChange = (e) => {
        setcode(e.target.value)
    }
    const onSubmit = () =>{
        axios.get(`https://nehra.az/qeydiyyat/sms/${code}`)
        .then(res=> (res.status === 200 && (notify() , props.functionClose() , props.functionCloseReg() , sessionStorage.setItem('status' , 1))) )
    }
    return (
        <form method='POTS' onSubmit={onSubmit} className='authSms'>
            <div className='closeBtn'><button onClick={props.functionClose}>&#10006;</button></div>
            <p className="tit">{lang === "AZ" && `Hesab Təsdiqləmə`    || lang === "EN" && `Account Verification` || lang === "RU" && `Верификация учетной записи`}</p>
            {Phone} <br/> {lang === "AZ" && `Nömrəsinə göndərilən kod` || lang === "EN" && `the code sent to the number` || lang === "RU" && `код, отправленный на номер`} 
            <input onChange={(e) => onChange(e)} value={code} type="text" maxLength="6"/>
            <Button1 type='submit' value='Təsdiqlə'/>
        </form>
    )
}

export default AuthSms

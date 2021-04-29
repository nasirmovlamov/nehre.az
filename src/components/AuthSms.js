import axios from 'axios'
import React , {useContext} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import {ProductListingContext} from '../components/ProductListingProvider'

function AuthSms(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)

    const [Phone, setPhone] = useState(JSON.parse(localStorage.getItem('LoginUserData')).phone)
    const notify = () => toast.info(lang === "AZ" && `Hesabınız Təsdiqləndi!` || lang === "EN" && `Your account has been confirmed!` || lang === "RU" && `Ваш аккаунт подтвержден!`);
    console.log(Phone);
    const onChange = (e) => {
        console.log(e.target.value)
        axios.get(`https://nehra.az/qeydiyyat/sms/${e.target.value}`)
            .then(res=> (console.log(res) , res.status === 200 && (notify() , props.functionClose() , props.functionCloseReg() , sessionStorage.setItem('status' , 1))) )
    }
    const onSubmit = () =>{
    }
    return (
        <div className='authSms'>
            <p className="tit">{lang === "AZ" && `Hesab Təsdiqləmə` || lang === "EN" && `Account Verification` || lang === "RU" && `Верификация учетной записи`}</p>
            {Phone} <br/> {lang === "AZ" && `Nömrəsinə göndərilən kod` || lang === "EN" && `the code sent to the number` || lang === "RU" && `код, отправленный на номер`} 
            <input onChange={(e) => onChange(e)} type="text" name="" id=""/>
        </div>
    )
}

export default AuthSms

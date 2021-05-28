import axios from 'axios'
import React , {useContext, useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import {ProductListingContext} from '../components/ProductListingProvider'
import Button1 from './Button1';
import Cookies from 'js-cookie';

function AuthSms(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)

    const [Phone, setPhone] = useState(JSON.parse(localStorage.getItem('LoginUserData')).phone)
    const notify = () => toast.info(lang === "AZ" && `Hesabınız Təsdiqləndi!` || lang === "EN" && `Your account has been confirmed!` || lang === "RU" && `Ваш аккаунт подтвержден!`);
    
    const [code, setcode] = useState()

    const onChange = (e) => {
        setcode(e.target.value)
    }
    const onSubmit = () =>{
        if (code !== ""  && code !== undefined  && second > 0) {
            axios.get(`https://nehra.az/qeydiyyat/sms/${code}`)
            .then(res=> (res.status === 200 && (notify() , props.functionClose() , props.functionCloseReg() , sessionStorage.setItem('status' , 1))) )
        }
    }

    const [err, seterr] = useState(false)
    const resend = () => {
        seterr(false)
        axios.post('https://nehra.az/public/api/resendsms' , {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id})
            .then(res => (res.status === 200 &&  (setsecond(res.data !== 900 ? 10 : 900) , seterr(false))) )
            .catch(err => seterr(true))
    }

    const [second, setsecond] = useState(90)
    const [minute, setminute] = useState(Math.floor(second / 60))
    const [showSecond, setshowSecond] = useState((second-1) - (Math.floor((second-1) / 60) * 60))
    
    useEffect(() => {
        sessionStorage.removeItem('smscount')
        setTimeout(() => {
            if (second > 0) {
                setsecond(second-1)
                document.cookie = `second=${second}`;
                document.cookie = `minute=${minute}`;
                setminute(Math.floor((second-1) / 60))
                setshowSecond((second-1) - (Math.floor((second-1) / 60) * 60));
            }
        }, 1005);
    }, [second]) 

    return (
        <div method='POST' onSubmit={onSubmit} className='authSms'>
            <div className='closeBtn'><button onClick={props.functionClose}>&#10006;</button></div>
            <p className="tit">{lang === "AZ" &&  `Hesab Təsdiqləmə`    || lang === "EN" && `Account Verification` || lang === "RU" && `Верификация учетной записи`}</p>
            {Phone} <br/> {lang === "AZ" && `Nömrəsinə göndərilən kod` || lang === "EN" && `the code sent to the number` || lang === "RU" && `код, отправленный на номер`} 
            <input disabled={second !== 0 ? false : true} onChange={(e) => onChange(e)} value={code} type="text" maxLength="6"/>
            {!err && <Button1 function={() => onSubmit()} value={lang === "AZ" && `Təsdiqlə` || lang === "EN" && `Confirm` || lang === "RU" && `Подтверждать`}/>}
            {second !== 0 && <>{minute < 10 && 0}{minute} : {showSecond < 10 && 0}{showSecond}</>}
            {second === 0 && <button onClick={() => resend()} className='moreAbout'>{lang === "AZ" && `Kodu yenidən göndər ` || lang === "EN" && `Resend the code` || lang === "RU" && `Отправить код еще раз`}</button>}
            <p className='errorMessage'>{err && (lang === "AZ" && `Bir müddət sonra yenidən cəhd edin` || lang === "EN" && `Please try again later` || lang === "RU" && `Пожалуйста, повторите попытку позже`)}</p>
        </div>
    )
}

export default AuthSms

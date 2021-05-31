import axios from 'axios'
import React , {useContext, useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import Button1 from './Button1';
import Cookies from 'js-cookie';

function AuthSms(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    const [Phone, setPhone] = useState(JSON.parse(localStorage.getItem('LoginUserData')).phone)
    const notify = () => toast.info(lang === "AZ" && `Hesabınız Təsdiqləndi!` || lang === "EN" && `Your account has been confirmed!` || lang === "RU" && `Ваш аккаунт подтвержден!`);
    
    const [code, setcode] = useState()
    const onChange = (e) => {
        setcode(e.target.value)
    }
    const onSubmit = () =>{
        if (code !== "" && code !== undefined && code !== null) {
            axios.get(`https://nehra.az/qeydiyyat/sms/${code}`)
                .then(res=> (res.status === 200 && (notify() , props.functionClose() , props.functionCloseReg() , sessionStorage.setItem('status' , 1))) )
        }
    }
    const [err, seterr] = useState(false)

    const [tillCount, settillCount] = useState(-1)

    const resend = () => {
        axios.post('https://nehra.az/public/api/resendsms' , {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id})
            .then(res => (res.status ===200 && (settillCount(res.data) , console.log(res.data) , res.data <= 0 && setsecond(90))) )
            .catch(err => seterr(true))
    }
    
    const [second, setsecond] = useState(90)
    const [minute, setminute] = useState(Math.floor(second / 60))
    const [showSecond, setshowSecond] = useState((second-1) - (Math.floor((second-1) / 60) * 60))

    useEffect(() => {
        setTimeout(() => {
            if (second > 0) {
                setsecond(second-1)
                setminute(Math.floor((second-1) / 60))
                setshowSecond((second-1) - (Math.floor((second-1) / 60) * 60));
            }
        }, 1005);
    }, [second]) 


    return (
        <div className='authSms' onSubmit={onSubmit}>
            <div className='closeBtn'><button onClick={props.functionClose}>&#10006;</button></div>
            <p className="tit">{lang === "AZ" && `Hesab Təsdiqləmə`    || lang === "EN" && `Account Verification` || lang === "RU" && `Верификация учетной записи`}</p>
            {Phone} <br/> {lang === "AZ" && `Nömrəsinə göndərilən kod` || lang === "EN" && `the code sent to the number` || lang === "RU" && `код, отправленный на номер`} 
            <input  disabled={(second !== 0 && tillCount <= 0) ? false : true} onChange={(e) => onChange(e)}  value={code}  type="text" maxLength="6" />
            {(second !== 0 && tillCount !== null && tillCount <= 0) && <button className='moreAbout' onClick={() => onSubmit()} >{lang === "AZ" && `Təsdiqlə` || lang === "EN" && `Confirm` || lang === "RU" && `Подтверждать`}</button>}
            {second !== 0 && <>{minute < 10 && 0}{minute} : {showSecond < 10 && 0}{showSecond}</>}
            {second === 0 && <button onClick={() => resend()} className='moreAbout'>{lang === "AZ" && `Kodu yenidən göndər ` || lang === "EN" && `Resend the code` || lang === "RU" && `Отправить код еще раз`}</button>}
            <p className='errorMessage'>{(tillCount > 0 && (tillCount/60) < 15) &&  (lang === "AZ" && ` ${tillCount/60} dəqiqə sonra yenidən cəhd edin` || lang === "EN" && `Please try again later after ${tillCount/60} minutes` || lang === "RU" && `Пожалуйста, повторите попытку позже`)}</p>
        </div>
    )
}

export default AuthSms

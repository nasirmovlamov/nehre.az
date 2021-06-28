import React , {useContext} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'

function ForgotPass(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const notify = () => toast.info(`Elektron poçtunuza link göndərildi!`);

    const changeEmail = (e) => {
        setemail(e.target.value)
    }
    
    const [checker, setchecker] = useState(false)
    const [email, setemail] = useState('')

    const forgotPass = () => {
        if(!checker)
        {
            axios.post(`https://nehra.az/public/api/forget/${email}` )
                .then(res => res.status === 200 && (setchecker(true) , notify()))
        }
    } 

    return (
        <form className='authSms forgotPass' onSubmit={() => forgotPass()}>
            {/* <div className='closeBtn'><button onClick={props.functionClose}>&#10006;</button></div> */}
            <p className="title"> {(lang === "AZ" && `Şifrə yeniləmə`) || (lang === "EN" && `Password update`) || (lang === "RU" && `Обновление пароля`)}</p>
            <input  onChange={(e) => changeEmail(e)} value={email} disabled={checker} placeholder={checker ? email : 'Emailinizi daxil edin' } type="text" name="" id=""/>
            {checker && <p className='subTitle'> {(lang === "AZ" && `Elektron poçtunuza göndərilən linkə daxil olun.`) || (lang === "EN" && `Follow the link sent to your email.`) || (lang === "RU" && `Перейдите по ссылке, отправленной на вашу электронную почту.`)}</p>}
            {!checker && <button type='submit' onClick={() => forgotPass()} className='submitBtn'>{(lang === "AZ" && `Təsdiqlə`) || (lang === "EN" && `Submit`) || (lang === "RU" && `Представлять на рассмотрение`)}</button>}
        </form>
    )
}

export default ForgotPass

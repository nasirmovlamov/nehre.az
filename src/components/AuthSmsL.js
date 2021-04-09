import axios from 'axios'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function AuthSms(props) {
    const [Phone, setPhone] = useState(JSON.parse(localStorage.getItem('LoginUserData')).phone)
    const notify = () => toast.info("Hesabınız Təsdiqləndi!");
    console.log(Phone);
    const onChange = (e) => {
        console.log(e.target.value)
        axios.get(`https://nehra.az/qeydiyyat/sms/${e.target.value}`)
            .then(res=> (console.log(res) , res.status === 200 && (notify() , props.functionClose() , sessionStorage.setItem('status' , 1))) )
    }
    const onSubmit = () =>{
    }
    return (
        <div className='authSms'>
            <p className="tit">Hesab Təsdiqləmə</p>
            +{Phone} <br/> Nömrəsinə göndərilən kodu <br/> Daxil edin
            <input onChange={(e) => onChange(e)} type="text" name="" id=""/>
        </div>
    )
}

export default AuthSms

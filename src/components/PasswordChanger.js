import React from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function PasswordChanger(props) {
    const [email, setemail] = useState()
    const changeEmail = (e) => {
        setemail(e.target.value)
    }
    return (
        <div className='authSms'>
            <div><button onClick={props.functionClose}>x</button></div>
            <p className="tit">Şifrə yeniləmə</p>
            <input onChange={(e) => changeEmail(e)} type="text" name="" id=""/>
            <input type="number" name="" id=""/>
            <button>Göndər</button>
        </div>
    )
}

export default PasswordChanger

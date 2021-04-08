import axios from 'axios'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function AuthSms(props) {
    // const [Phone, setPhone] = useState(localStorage.getItem('LoginUserData').phone)
    // const notify = () => toast.info("Hesabınız Təsdiqləndi!");

    // const onChange = (e) => {
    //     console.log(e.target.value)
    //     axios.get(`https://nehra.az/qeydiyyat/sms/${e.target.value}`)
    //         .then(res=> (console.log(res) , res.status === 200 && (notify() , props.functionClose())) )
    // }
    // const onSubmit = () =>{
    // }
    return (
        <div className='authSms'>
            {/* {Phone} nömrəsinə göndərilən kodu daxil edin */}
            {/* <input onChange={(e) => onChange(e)} type="text" name="" id=""/> */}
        </div>
    )
}

export default AuthSms

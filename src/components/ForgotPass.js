import React from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function ForgotPass(props) {
    const [email, setemail] = useState('')
    const [key, setkey] = useState('')
    const changeEmail = (e) => {
        setemail(e.target.value)
    }
    const changeKey = (e) => {
        setkey(e.target.value)
    }
    const [checker, setchecker] = useState(false)

    const forgotPass = () => {
        if(!checker)
        {
            axios.post(`https://nehra.az/public/api/forget/${email}` )
                .then(res => res.status === 200 && setchecker(true))
        }
        else 
        {
            console.log(key)
            axios.post(`https://nehra.az/public/api/checkit` , {verify:key} )
                .then(res => res.status === 200 && (props.functionClose() , props.openPassChange() , sessionStorage.setItem('verify' , key)))
        }
    } 

    return (
        <div className='authSms forgotPass'>
            <div className='closeBtn'><button onClick={props.functionClose}>&#10006;</button></div>
            <p className="title">Şifrə yeniləmə</p>
            <input onChange={(e) => changeEmail(e)} value={email} disabled={checker} placeholder={checker ? email : 'Emailinizi daxil edin' } type="text" name="" id=""/>
            {checker && <input onChange={(e) => changeKey(e)} type="text" value={key}/>}
            <button  onClick={() => forgotPass()} className='submitBtn'>Göndər</button>
        </div>
    )
}

export default ForgotPass
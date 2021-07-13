import React , {useContext} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import { Field } from 'formik';
import { Formik } from 'formik';
import { Form } from 'formik';

function ForgotPass(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice,currency, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const notify = () => toast.info(`Elektron poçtunuza link göndərildi!`);

    const changeEmail = (e) => {
        setemail(e.target.value)
    }
    
    const [checker, setchecker] = useState(false)
    const [email, setemail] = useState('')
    const initialValues = { 
        email: ""
    }
    const forgotPass = async (event) => {
        if(!checker)
        {
            try {
                const res = await axios.post(`https://nehra.az/public/api/forget/${email}` )
                setchecker(true)  
                notify()
            } catch (error) {
                console.error(error)
            }
        }
        event.preventDefault();
    } 

    return (
        <Formik initialValues={initialValues} onSubmit={() => forgotPass()} validateOnChange={true} validateOnBlur={false}>
            <Form className='authSms forgotPass' >
                <div className='closeBtn'><button type='button' onClick={props.functionClose}>&#10006;</button></div>
                <p className="title"> {(lang === "AZ" && `Şifrə yeniləmə`) || (lang === "EN" && `Password update`) || (lang === "RU" && `Обновление пароля`)}</p>
                <Field name='email'  disabled={checker} placeholder={checker ? email : 'Emailinizi daxil edin' } type="text"  id=""/>
                {checker && <p className='subTitle'> {(lang === "AZ" && `Elektron poçtunuza göndərilən linkə daxil olun.`) || (lang === "EN" && `Follow the link sent to your email.`) || (lang === "RU" && `Перейдите по ссылке, отправленной на вашу электронную почту.`)}</p>}
                {!checker && <button type='submit' className='submitBtn'>{(lang === "AZ" && `Təsdiqlə`) || (lang === "EN" && `Submit`) || (lang === "RU" && `Представлять на рассмотрение`)}</button>}
            </Form>
        </Formik>
    )
}

export default ForgotPass

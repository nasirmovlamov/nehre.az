import axios from 'axios'
import { ErrorMessage, Form, Formik , Field } from 'formik'
import React, { useState ,useContext } from 'react'
import Button1 from './Button1'
import Cookies from 'js-cookie'
import * as yup from 'yup';
import {ProductListingContext} from '../components/ProductListingProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function PasswordUpdate(props){
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)
    const notifyPass = () => toast.info(lang === "AZ" && `Şifrəniz yeniləndi!` || lang === "EN" && `Your password has been updated!` || lang === "RU" && `Ваш пароль был обновлен!`);
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validationSchema = yup.object({
        oldPassword: yup.string().matches(passRegex , (lang === "AZ" && `Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir` || lang === "EN" && `Your password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit` || lang === "RU" && `Ваш пароль должен состоять не менее чем из 8 символов, 1 заглавной буквы, 1 строчной буквы и 1 цифры.`)).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`),
        password: yup.string().matches(passRegex , (lang === "AZ" && `Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir` || lang === "EN" && `Your password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit` || lang === "RU" && `Ваш пароль должен состоять не менее чем из 8 символов, 1 заглавной буквы, 1 строчной буквы и 1 цифры.`)).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], (lang === "AZ" && `Şifrələr uyğun deyil` || lang === "EN" && `Passwords do not match` || lang === "RU" && `Пароли не соответствуют`)).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`)
    })
    
    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        axios.post('https://nehra.az/public/api/updateuserpass', {user_id: JSON.parse(localStorage.getItem('LoginUserData')) ,  password:values.password} , headers )
        .then(res => res.status === 200 && console.log(res.data))
        .catch(err => setError(true))
    }
    
    const initialValues = {
        oldPassword:'',
        password:'',
        confirmPassword:'',
    }

    return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
        <Form className="cabinetCont contactCont">
            <p className="title">{lang === "AZ" && `Şifrə` || lang === "EN" && `Password` || lang === "RU" && `Пароль`}</p>
            <div className="FlexContPass">
                    <label  className="key" >{lang === "AZ" && `Köhnə Şifrə` || lang === "EN" && `Password` || lang === "RU" && `Старый Пароль`} </label>                                  
                    <div className="errors">
                        <Field type="password" className="value" name="oldPassword" placeholder={lang === "AZ" && `Köhnə Şifrə` || lang === "EN" && `Old Password` || lang === "RU" && `Старый Пароль`} type="password"/>
                        <ErrorMessage name="oldPassword"/>
                    </div>
                    <label  className="key" >Şifrə</label>                                  
                    <div className="errors">
                        <Field type="password" className="value" name="password" placeholder={lang === "AZ" && `Yeni Şifrə` || lang === "EN" && `New Password` || lang === "RU" && `Новый пароль`} type="password"/>
                        <ErrorMessage name="password"/>
                    </div>
                    
                    <label  className="key" >{lang === "AZ" && `Şifrəni Təsdiqlə` || lang === "EN" && `Confirm Password` || lang === "RU" && `Подтвердить Пароль`} </label>                        
                    <div className="errors">
                        <Field type="password" className="value" name="confirmPassword" placeholder={lang === "AZ" && `Şifrəni Təsdiqlə` || lang === "EN" && `Confirm Password` || lang === "RU" && `Подтвердить Пароль`}  type="password"/>
                        <ErrorMessage name="confirmPassword"/>
                    </div>
            </div>
            <Button1 type='submit' value={lang === "AZ" && `Yadda saxla` || lang === "EN" && `Save` || lang === "RU" && `Сохранить`}  color="#285999"/>
        </Form>
    </Formik>
) }

export default PasswordUpdate

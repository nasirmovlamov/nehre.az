import React, {useContext} from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/authSms.css'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { Form, Formik , Field , ErrorMessage } from 'formik';
import * as yup from 'yup';
import ReactLoading from 'react-loading';
import {ProductListingContext} from '../components/ProductListingProvider'

function ForgotPass(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)

    const [loader, setloader] = useState(false)
    const onSubmit =  (values) => {
        setloader(true)
        axios.post('https://nehra.az/public/api/change', {verify:sessionStorage.getItem('verify') ,  password: values.password  }   )
         .then(res => (setloader(false) , res.status === 200 && console.log(res)  , localStorage.setItem("LoginUserData" , JSON.stringify(res.data)) , props.functionCloseLogin() )) 
    }

    const initialValues = {
        password:'',
        confirmPassword:'',
    }

    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validationSchema = yup.object({
        password: yup.string().matches(passRegex ,'Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir').required('Şifrənizi daxil edin'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Şifrələr uyğun deyil').required("Şifrənizi daxil edin")
    })
    

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
            <Form className="authSms forgotPass"  method="POST">
                <div className='closeBtn'><button onClick={props.functionClose}>&#10006;</button></div>
                <p className="title">{lang === "AZ" && `Şifrəni daxil edin` || lang === "EN" && `Enter the password` || lang === "RU" && `Введите пароль`}</p>
                <div className="errorsNew">
                    <Field type="password" className="value" name="password" placeholder={lang === "AZ" && `Şifrəni daxil edin` || lang === "EN" && `Enter the password` || lang === "RU" && `Введите пароль`} type="password"/>
                    <ErrorMessage name="password"/>
                </div>

                <div className="errorsNew">
                    <Field type="password" className="value" name="confirmPassword" placeholder={lang === "AZ" && `Şifrəni təsdiqləyin` || lang === "EN" && `Confirm password` || lang === "RU" && `Подтвердить Пароль`} type="password"/>
                    <ErrorMessage name="confirmPassword"/>
                </div>
                <button type='submit' className='submitBtn'>{lang === "AZ" && `Daxil edin` || lang === "EN" && `Submit` || lang === "RU" && `Bходить`}</button>
                {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={"30px"} width={"30px"} />}
            </Form>
        </Formik>
    )
}

export default ForgotPass

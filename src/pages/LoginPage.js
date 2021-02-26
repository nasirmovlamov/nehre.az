import React, { useState } from 'react'
import '../assets/css/loginPage.scss'
import Button1 from '../components/Button1'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function LoginPage(props) {
    const notify = () => toast.success("Hesabınıza daxil oldunuz!");
    const notifyW = () => toast.error("Daxil etdiyiniz məlumatları yanlışdır!");
    const clickHandler = () => {
        props.functionClose()
        props.registerFunc()
    }

    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }

    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        axios.post('https://nehra.az/public/api/check', { email: values.email ,  password: values.password }  , headers )
         .then(res => (res.status === 200 && console.log(res)  , localStorage.setItem("LoginUserData" , JSON.stringify(res.data.user)) , props.functionClose() , notify() )) 
         .catch(err => setError(true) , notifyW())
    }

    const initialValues = {
        email:'',
        password:'',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Emailinizi düzgün daxil edin').required('Emailinizi daxil edin'),
        password: Yup.string().required('Şifrənizi daxil edin'),
    })

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
            <Form className="loginPage"  method="POST">
                <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                <p className="title">Giriş</p>
                <Field className="inputLogin" name="email" placeholder="Email ünvanınız"/>
                <div className="errors"><ErrorMessage name="email"/></div>
                <Field className="inputLogin" name="password" placeholder="Parolunuz"/>
                <div className="errors"><ErrorMessage name="password"/></div>
                <Button1 value="Daxil olun" type="submit"/>
                { Error && <p className="errors">Daxil etdiyiniz məlumatlar yanlışdır </p>}
                <p className="subTitle">Hesabnız yoxdur ? <button className="regBtn" onClick={() => clickHandler()}>Qeydiyyatdan keçin</button> </p>
            </Form>
        </Formik>
    )
}

export default LoginPage

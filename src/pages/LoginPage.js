import React from 'react'
import '../assets/css/loginPage.scss'
import Button1 from '../components/Button1'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import axios from 'axios'
function LoginPage(props) {
    const clickHandler = () => {
        props.functionClose()
        props.registerFunc()
    }
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }
    const onSubmit =  (values) => {
        axios.post('http://nehra.az/public/api/check', { email: values.email ,  password: values.password} , headers)
         .then(res => console.log(res))
         .catch(err => console.log(err))
    }
    const initialValues = {
        email:'',
        password:'',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().required('Required'),
    })
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
            <Form className="loginPage"  method="POST">
                <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                <p className="title">Giriş</p>
                <Field className="inputLogin" name="email" placeholder="Email ünvanınız"/>
                <Field className="inputLogin" name="password" placeholder="Parolunuz"/>
                <Button1 value="Daxil olun" type="submit"/>
                <p className="subTitle">Hesabnız yoxdur ? <button className="regBtn" onClick={() => clickHandler()}>Qeydiyyatdan keçin</button> </p>
            </Form>
        </Formik>
    )
}

export default LoginPage

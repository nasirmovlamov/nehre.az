import axios from 'axios'
import { ErrorMessage, Form, Formik } from 'formik'
import React, { useState } from 'react'
import Button1 from './Button1'
import Cookies from 'js-cookie'
import * as Yup from "yup"



function PasswordUpdate(props){
    const validationSchema = Yup.object({
        password: Yup.string().email('Invalid email format').required('Required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Şifrələr uyğun deyil')
    })

    
    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        axios.post('http://jobday.testjed.me/api/password-change', {oldPassword:values.oldPassword , newPassword:values.password} , headers )
        .then(res => console.log(res))
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
            <p className="title">Password</p>
            <div className="gridCont">
                <p className="name key">* Old Password</p> <input placeholder="Old Password" className="value"   type="text" name="" id=""/>
                <p className="email key ">* New Password</p> <input placeholder="New Password"  className="value"  type="email" name="" id=""/>
                <p className="email key ">* Confirm Password</p> <input placeholder="New Password"  className="value"  type="email" name="" id=""/>
            </div>
            <Button1 value="save" color="#285999"/>
        </Form>
    </Formik>
) }

export default PasswordUpdate

import axios from 'axios'
import { ErrorMessage, Form, Formik , Field } from 'formik'
import React, { useState } from 'react'
import Button1 from './Button1'
import Cookies from 'js-cookie'
import * as yup from 'yup';



function PasswordUpdate(props){
    
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validationSchema = yup.object({
        oldPassword: yup.string().matches(passRegex ,'Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir').required('Şifrənizi daxil edin'),
        password: yup.string().matches(passRegex ,'Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir').required('Şifrənizi daxil edin'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Şifrələr uyğun deyil').required("Şifrənizi daxil edin")
    })
    
    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        axios.post('https://nehra.az/public/api/updateuserpass', {user_id: JSON.parse(localStorage.getItem('LoginUserData')) ,  password:values.oldPassword} , headers )
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
            <div className="FlexContPass">
                    <label  className="key" >Köhnə şifrə</label>                                  
                    <div className="errors">
                        <Field type="password" className="value" name="oldPassword" placeholder="Köhnə şifrə" type="password"/>
                        <ErrorMessage name="oldPassword"/>
                    </div>
                    <label  className="key" >Şifrə</label>                                  
                    <div className="errors">
                        <Field type="password" className="value" name="password" placeholder="Yeni şifrə" type="password"/>
                        <ErrorMessage name="password"/>
                    </div>
                    
                    <label  className="key" >Şifrəni Təsdiqlə</label>                        
                    <div className="errors">
                        <Field type="password" className="value" name="confirmPassword" placeholder="Şifrəni təsdiqlə" type="password"/>
                        <ErrorMessage name="confirmPassword"/>
                    </div>
            </div>
            <Button1 type='submit' value="save" color="#285999"/>
        </Form>
    </Formik>
) }

export default PasswordUpdate

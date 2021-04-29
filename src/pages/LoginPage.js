import ForgotPass from '../components/ForgotPass';
import NewPass from '../components/NewPass';
import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react'
import '../assets/css/loginPage.scss'
import Button1 from '../components/Button1'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
toast.configure()

function LoginPage(props) {
    const notify = () => toast.info("Hesabınıza daxil oldunuz!");
    const notifyW = () => toast.error("Daxil etdiyiniz məlumatları yanlışdır!");
    const [loader, setloader] = useState(false)
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
        setloader(true)
        axios.post('https://nehra.az/public/api/check', { email: values.email ,  password: values.password }  , headers )
         .then(res => (setloader(false) , res.status === 200 && console.log(res)  , localStorage.setItem("LoginUserData" , JSON.stringify(res.data.user)) , props.functionClose() , notify())) 
         .catch(err => (setError(true) , setloader(false)))
    }

    const initialValues = {
        email:'',
        password:'',
    }
    const validationSchema = Yup.object({
        email: Yup.string().email('Emailinizi düzgün daxil edin').required('Emailinizi daxil edin'),
        password: Yup.string().required('Şifrənizi daxil edin'),
    })


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const [open2, setOpen2] = React.useState(false);

    const handleOpen2 = () => {
        setOpen2(true);
    }
    const handleClose2 = () => {
        setOpen2(false);
    }
    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form className="loginPage"  method="POST">
                    <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                    <p className="title">Giriş</p>
                    <Field className="inputLogin" name="email" placeholder="Email ünvanınız"/>
                    <div className="errors"><ErrorMessage name="email"/></div>
                    <Field type="password" className="inputLogin" name="password" placeholder="Parolunuz"/>
                    <div className="errors"><ErrorMessage name="password"/></div>
                    <Button1 value="Daxil olun" type="submit"/>
                    { Error && <p className="errors errorsAndForgot">Daxil etdiyiniz məlumatlar yanlışdır. <button type='button' onClick={handleOpen} className='forgotPassBtn'>Şifrəni unutmusunuz ?</button> </p>}
                    <p className="subTitle">Hesabınız yoxdur ? <button className="regBtn" onClick={() => clickHandler()}>Qeydiyyatdan keçin </button> </p>
                    {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={17} width={75} />}
                </Form>
            </Formik>


            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<ForgotPass  functionClose={() => handleClose() } openPassChange={() => handleOpen2()}  functionCloseLogin={() => props.functionClose()} />}
            </Modal>
            
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open2}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<NewPass  functionClose={() => handleClose2() }  functionCloseLogin={() => props.functionClose()} />}
            </Modal>
        </>
    )
}

export default LoginPage

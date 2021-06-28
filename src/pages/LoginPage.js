import ForgotPass from '../components/ForgotPass';
import {ProductListingContext} from '../components/ProductListingProvider'
import NewPass from '../components/NewPass';
import Modal from '@material-ui/core/Modal';
import React, { useState , useContext } from 'react'
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
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const notify = () => toast.info(lang === "AZ" && `Hesabınıza daxil oldunuz!` || lang === "EN" && `You have logged in to your account!` || lang === "RU" && `Уведомление удалено!`);
    // const notifyW = () => toast.error("Daxil etdiyiniz məlumatlar yanlışdır!");
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
        email: Yup.string().email(lang === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || lang === "EN" && `Enter your email correctly` || lang === "RU" && `Введите свой адрес электронной почты правильно`).required(lang === "AZ" && 'Elektron poçt daxil edin' || lang === "EN" && `Enter email` || lang === "RU" && `Введите адрес электронной почты`),
        password: Yup.string().required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`),
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
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
            <Form className="loginPage" action='/' method="POST">
                <div className="buttonCont"><button type='button' onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                <p className="title">{lang === "AZ" && `Giriş` || lang === "EN" && `Login` || lang === "RU" && `Aвторизоваться`}</p>
                <Field className="inputLogin" name="email" placeholder={lang === "AZ" && `Elektron poçt` || lang === "EN" && `Email` || lang === "RU" && `Электронное письмо`}/>
                <div className="errors"><ErrorMessage name="email"/></div>
                <Field type="password" className="inputLogin" name="password" placeholder={lang === "AZ" && `Şifrəniz` || lang === "EN" && `Password` || lang === "RU" && `Пароль`}/>
                <div className="errors"><ErrorMessage name="password"/></div>
                <Button1 value={lang === "AZ" && `Daxil olun` || lang === "EN" && `Submit` || lang === "RU" && `Входить`} type="submit"/>
                { Error && <p className="errors errorsAndForgot">{lang === "AZ" && `Daxil etdiyiniz məlumatlar yanlışdır. ` || lang === "EN" && `The information you entered is incorrect.` || lang === "RU" && `Введенная вами информация неверна.`}<button type='button' onClick={handleOpen} className='forgotPassBtn'>{lang === "AZ" && `Şifrəni unutmusunuz?` || lang === "EN" && `Forgot password?` || lang === "RU" && `забыл пароль?`}</button> </p>}
                <p className="subTitle">{lang === "AZ" && `Hesabınız yoxdur? ` || lang === "EN" && `Not Account?` || lang === "RU" && `Не Аккаунт?`}<button className="regBtn" onClick={() => clickHandler()}>{lang === "AZ" && `Qeydiyyatdan keçin ` || lang === "EN" && `Create Account` || lang === "RU" && `Зарегистрироваться`}</button> </p>
                {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={17} width={75} />}
                
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
            </Form>
        </Formik>
    )
}

export default LoginPage

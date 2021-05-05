import 'date-fns';
import React, { useState, useContext } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import '../assets/css/registrationPage.scss'
import Button1 from '../components/Button1'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as yup from 'yup';
import axios from 'axios'
import Modal from '@material-ui/core/Modal';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import ReactLoading from 'react-loading';
import AuthSms from '../components/AuthSms';

toast.configure()
function Registration(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)
    const notifyW = () => toast.error("Daxil etdiyiniz məlumatları yanlışdır!");
    const notify = () => toast.info("Hesabınız müvəfəqiyyətlə yaradıldı!");

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const token = Cookies.getItem('XSRF-TOKEN')
  const [loader, setloader] = useState(false)
  const headers = {
      "X-CSRF-TOKEN":token
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    // const phoneRegExp = /^.*$/
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    
    const [Error, setError] = useState(false)
    const [userId, setuserId] = useState('')
    const onSubmit =  (values) => {
        let defualtValue = '994'
        if (phoneValue.length > 9) {
            defualtValue += phoneValue.slice(1,10)
        }
        else 
        {
            defualtValue += phoneValue
        }
        setloader(true)
        const dt = new FormData()
        dt.append('name' , values.name)
        dt.append('email' , values.email)
        dt.append('phone' ,   defualtValue)
        dt.append('password' , values.password)
        dt.append('birthdate' , selectedDate.toISOString().slice(0,10))
        if (profilePhoto !== null) {
            dt.append('profilePhoto' , profilePhoto)
        }
        dt.append('auth_type' , 1)
        axios.post('https://nehra.az/public/api/login', dt , headers)
        .then(res => (setloader(false) , res.status === 200 && (localStorage.setItem("LoginUserData" , JSON.stringify(res.data)) ,  notify() ,  handleOpen() ) ) ) 
        .catch(err => (setloader(false) , setError(true)) )
    }

    const [phoneValue, setphoneValue] = useState()
    const handleChange1 = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        setphoneValue(value);
    }

    const initialValues = {
        name:'',
        email:'',
        // phone:'',
        password:'',
        confirmPassword:'',
    }




    const [profilePhoto, setprofilePhoto] = useState(null)
    
    const [{alt, src}, setImg] = useState({
        src: "",
        alt: 'Upload an Image'
    });
    
    const ppchanger = (e) => {
        if(e.target.files[0]) {
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }   
        setprofilePhoto(e.target.files[0])
        console.log(e.target.files[0]);
    }

    const [authT, setauthT] = useState(1)
    const [open, setOpen] = useState(false);


    const validationSchema = yup.object({
        name: yup.string().required(lang === "AZ" && `Adınızı daxil edin` || lang === "EN" && `Enter name` || lang === "RU" && `Введите имя`),
        email: yup.string().email(lang === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || lang === "EN" && `Enter your email correctly` || lang === "RU" && `Введите свой адрес электронной почты правильно`).required(lang === "AZ" && 'Elektron poçt daxil edin' || lang === "EN" && `Enter email` || lang === "RU" && `Введите адрес электронной почты`),
        // phone:  yup.string().required('Telefon nömrənizi daxil edin'),
        password: yup.string().matches(passRegex , (lang === "AZ" && `Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir` || lang === "EN" && `Your password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit` || lang === "RU" && `Ваш пароль должен состоять не менее чем из 8 символов, 1 заглавной буквы, 1 строчной буквы и 1 цифры.`) ).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], (lang === "AZ" && `Şifrələr uyğun deyil` || lang === "EN" && `Passwords do not match` || lang === "RU" && `Пароли не соответствуют`)).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`)
    })

    const authTypeHandler = (num) => {
        document.querySelector('.authType2').checked = false
        document.querySelector('.authType1').checked = false
        document.querySelector(`.authType${num}`).checked = true
        setauthT(num)
    }


    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <div  className="registrationPage">
            <div className="buttonCont"><button type='button' onClick={() => props.functionCloseReg()} className="removeModalBtn">×</button></div>
            <p className="title">{lang === "AZ" && `Qeydiyyat` || lang === "EN" && `Registration` || lang === "RU" && `Регистрация`}</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form enctype='multipart/form-data' className="login" method="post" action="">
                    
                    <label  className="key" >{lang === "AZ" && `Adınız Soyadınız` || lang === "EN" && `Name Surname` || lang === "RU" && `Имя Фамилия`}</label>                       
                    <div className="errors">
                        <Field className="value" name="name" placeholder={lang === "AZ" && `Adınız Soyadınız` || lang === "EN" && `Name Surname` || lang === "RU" && `Имя Фамилия`}/>
                        <ErrorMessage name="name"/>
                    </div>

                    <label  className="key" >{lang === "AZ" && `Elektron poçt ünvanı` || lang === "EN" && `Email address` || lang === "RU" && `Адрес электронной почты`}</label>                   
                    <div className="errors">
                        <Field className="value" name="email" placeholder={lang === "AZ" && `nümunə@gmail.com` || lang === "EN" && `example@gmail.com` || lang === "RU" && `example@gmail.com`}/>
                        <ErrorMessage name="email"/>
                    </div>

                    <label  className="key" >{lang === "AZ" && `Şifrə` || lang === "EN" && `Password` || lang === "RU" && `Пароль`}</label>                                  
                    <div className="errors">
                        <Field type="password" className="value" name="password" placeholder="Parol" type="password"/>
                        <ErrorMessage name="password"/>
                    </div>

                    <label  className="key" >{lang === "AZ" && `Şifrəni Təsdiqlə` || lang === "EN" && `Confirm Password` || lang === "RU" && `Подтвердить Пароль`} </label>                        
                    <div className="errors">
                        <Field type="password" className="value" name="confirmPassword" placeholder={lang === "AZ" && `Şifrəni Təsdiqlə` || lang === "EN" && `Confirm Password` || lang === "RU" && `Подтвердить Пароль`} type="password"/>
                        <ErrorMessage name="confirmPassword"/>
                    </div>

                    <label  className="key" >{lang === "AZ" && `Telefon Nömrəsi` || lang === "EN" && `Phone number` || lang === "RU" && `Телефонный номер`}</label>            
                    <div className="errors">            
                        <div className='phoneCont'> <span>+994</span> <Field required value={phoneValue} onChange={handleChange1} className="value" maxlength='10' minlength='9' type='text' name="phone" placeholder="0555555555"/></div>
                        <ErrorMessage name="phone"/>
                    </div>

                    <label  className="key" ></label>                                        <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label="Doğum tarixiniz"  value={selectedDate} minDate={'02-01-1920'} maxDate={'02-29-2020'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>

                    {/* <label  className="key" >Hesab təsdiqləmə növü</label> */}
                    {/* <div className="authType">
                        <div className="authTypeCh authTypeCh1"><input checked className="authType1" onClick={() => authTypeHandler(1)}  type="checkbox" name="sms" id=""/> <label htmlFor="">Telefon</label></div>
                        <div className="authTypeCh authTypeCh2"><input className="authType2" onClick={() => authTypeHandler(2)} type="checkbox" name="sms" id=""/> <label htmlFor="">Elektron poçt</label></div>
                    </div> */}

                    <label  className="key" >{lang === "AZ" && `Profil Şəkli` || lang === "EN" && `Profile Photo` || lang === "RU" && `Аватар`}</label>                           <button type="button" className="addFile"> <p className="textPhoto">{profilePhoto?.name !== undefined ? profilePhoto.name  : (lang === "AZ" && `Şəklinizi yükləyin` || lang === "EN" && `Upload Photo` || lang === "RU" && `Загрузить фото`) }</p><input onChange={ppchanger} type="file" className="addFileInput" name="profile" id=""/></button>
                    <button className="submitBtn"  type="submit" > {lang === "AZ" && `Daxil edin` || lang === "EN" && `Submit` || lang === "RU" && `Bходить`} {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={"30px"} width={"30px"} />}</button>
                    {Error && <p className="errors">{lang === "AZ" && `Daxil etdiyiniz elektron poçt artıq mövcuddur  ` || lang === "EN" && `The email you entered is now exist` || lang === "RU" && `Электронный адрес, который вы ввели, теперь существует`}</p>}
                </Form>
            </Formik>
            </MuiPickersUtilsProvider>
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<AuthSms UserId={userId} functionClose={() => handleClose() }  functionCloseReg={() => props.functionCloseReg()} />}
            </Modal>
        </div>
    )
}

export default Registration

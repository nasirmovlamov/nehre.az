import 'date-fns';
import React, { useState } from 'react';
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
    // The first commit of Material-UI
const notify = () => toast.info("Hesabınız müvəffəqiyyətlə yaradıldı!");
const notifyW = () => toast.error("Daxil etdiyiniz məlumatları yanlışdır!");

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const token = Cookies.getItem('XSRF-TOKEN')
  const [loader, setloader] = useState(false)
  const headers = {
      "X-CSRF-TOKEN":token
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    const phoneRegExp = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    
    const [Error, setError] = useState(false)
    const [userId, setuserId] = useState('')
    const onSubmit =  (values) => {
        setloader(true)
        const dt = new FormData()
        dt.append('name' , values.name)
        dt.append('email' , values.email)
        dt.append('phone' , values.phone.slice(1,14))
        dt.append('password' , values.password)
        dt.append('birthdate' , selectedDate)
        if (profilePhoto !== null) {
            dt.append('profilePhoto' , profilePhoto)
        }
        dt.append('auth_type' , authT)
        axios.post('https://nehra.az/public/api/login', dt , headers)
        .then(res => (setloader(false) , console.log(res.data) ,  res.status === 200 && (localStorage.setItem("LoginUserData" , JSON.stringify(res.data)) ,  notify() ,  handleOpen() ) ) ) 
        .catch(err => (setloader(false) , setError(true)) )
    }
    const initialValues = {
        name:'',
        email:'',
        phone:'',
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



    const validationSchema = yup.object({
        name: yup.string().required('Adınızı daxil edin'),
        email: yup.string().email('Emailinizi düzgün daxil edin').required('Emailinizi daxil edin'),
        phone:  yup.string().matches(phoneRegExp, 'Telefon nömrəsini düzgün daxil edin').required('Telefon nömrənizi daxil edin'),
        password: yup.string().matches(passRegex ,'Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir').required('Şifrənizi daxil edin'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Şifrələr uyğun deyil').required("Şifrənizi daxil edin")
    })

    const [authT, setauthT] = useState(1)
    const authTypeHandler = (num) => {
        document.querySelector('.authType2').checked = false
        document.querySelector('.authType1').checked = false
        document.querySelector(`.authType${num}`).checked = true
        setauthT(num)
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <div  className="registrationPage">
            <div className="buttonCont"><button onClick={() => props.functionCloseReg()} className="removeModalBtn">×</button></div>
            <p className="title">Qeydiyyat</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form enctype='multipart/form-data' className="login" method="post" action="">
                    
                    <label  className="key" >Adınız Soyadınız</label>                       
                    <div className="errors">
                        <Field className="value" name="name" placeholder="Adınız"/>
                        <ErrorMessage name="name"/>
                    </div>

                    <label  className="key" >Elektron poçt ünvanı</label>                   
                    <div className="errors">
                        <Field className="value" name="email" placeholder="nümunə@gmail.com"/>
                        <ErrorMessage name="email"/>
                    </div>

                    <label  className="key" >Şifrə</label>                                  
                    <div className="errors">
                        <Field type="password" className="value" name="password" placeholder="Parol" type="password"/>
                        <ErrorMessage name="password"/>
                    </div>

                    <label  className="key" >Şifrəni Təsdiqlə</label>                        
                    <div className="errors">
                        <Field type="password" className="value" name="confirmPassword" placeholder="Parolu Təsdiqlə" type="password"/>
                        <ErrorMessage name="confirmPassword"/>
                    </div>

                    <label  className="key" >Telefon Nömrəsi</label>            
                    <div className="errors">            
                        <Field className="value" name="phone" placeholder="Telefon Nömrəsi"/>
                        <ErrorMessage name="phone"/>
                    </div>

                    <label  className="key" ></label>                                        <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label="Doğum tarixiniz"  value={selectedDate} minDate={'02-01-1920'} maxDate={'02-29-2020'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>

                    <label  className="key" >Hesab təsdiqləmə növü</label>
                    <div className="authType">
                        <div className="authTypeCh authTypeCh1"><input checked className="authType1" onClick={() => authTypeHandler(1)}  type="checkbox" name="sms" id=""/> <label htmlFor="">Telefon</label></div>
                        <div className="authTypeCh authTypeCh2"><input className="authType2" onClick={() => authTypeHandler(2)} type="checkbox" name="sms" id=""/> <label htmlFor="">Elektron poçt</label></div>
                    </div>

                    <label  className="key" >Profil Şəkli</label>                           <button type="button" className="addFile"> <p className="textPhoto">{profilePhoto?.name !== undefined ? profilePhoto.name  : "Şəklinizi yükləyin"}</p><input onChange={ppchanger} type="file" className="addFileInput" name="profile" id=""/></button>
                    <button className="submitBtn"  type="submit" >Submit {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={"30px"} width={"30px"} />}</button>
                    {Error && <p className="errors">Daxil etdiyiniz elektron poçt artıq mövcuddur  </p>}
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

import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import '../assets/css/registrationPage.scss'
import Button1 from '../components/Button1'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import axios from 'axios'
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
toast.configure()
function Registration(props) {
    // The first commit of Material-UI
    const notify = () => toast.info("Hesabınız müvəffəqiyyətlə yaradıldı!");
    const notifyW = () => toast.error("Daxil etdiyiniz məlumatları yanlışdır!");

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const token = Cookies.getItem('XSRF-TOKEN')
  const headers = {
      "X-CSRF-TOKEN":token
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    const [Error, setError] = useState(false)
    const [profilePhoto, setprofilePhoto] = useState(null)
    const onSubmit =  (values) => {
            axios.post('https://nehra.az/public/api/login', {name: values.name , surname: values.surname, email: values.email ,  phone: values.phone , password: values.password, profilePhoto:profilePhoto, date:selectedDate } , headers)
            .then(res => (res.status === 200 && console.log(res) ,  notify() , props.functionClose()) ) 
            .catch(err => setError(true) )
    }
    
    const initialValues = {
        name:'',
        email:'',
        phone:'',
        password:'',
        confirmPassword:'',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Adınızı daxil edin'),
        email: Yup.string().email('Emailinizi düzgün daxil edin').required('Emailinizi daxil edin'),
        phone:  Yup.string().matches(phoneRegExp, 'Telefon nömrəsini düzgün daxil edin').required('Telefon nömrənizi daxil edin'),
        password: Yup.string().required('Şifrənizi daxil edin'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Şifrələr uyğun deyil').required("Şifrənizi daxil edin")
    })

    console.log(profilePhoto);
    return (
        <div  className="registrationPage">
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <p className="title">Qeydiyyat</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form enctype='multipart/form-data' className="login" method="post" action="">
                    <label  className="key" >Adınız Soyadınız</label>                       <Field className="value" name="name" placeholder="Adınız"/>
                    <div className="errors"><ErrorMessage name="name"/></div>

                    <label  className="key" >Elektron poçt ünvanı</label>                   <Field className="value" name="email" placeholder="nümunə@gmail.com"/>
                    <div className="errors"><ErrorMessage name="email"/></div>

                    <label  className="key" >Şifrə</label>                                  <Field type="password" className="value" name="password" placeholder="Parol" type="password"/>
                    <div className="errors"><ErrorMessage name="password"/></div>

                    <label  className="key" >Şifrəni Təsdiqlə</label>                        <Field type="password" className="value" name="confirmPassword" placeholder="Parolu Təsdiqlə" type="password"/>
                    <div className="errors"><ErrorMessage name="confirmPassword"/></div>

                    <label  className="key" >Telefon Nömrəsi</label>                        <Field className="value" name="phone" placeholder="Telefon Nömrəsi"/>
                    <div className="errors"><ErrorMessage name="phone"/></div>

                    <label  className="key" ></label>                                        <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label="Doğum tarixiniz"  value={selectedDate} minDate={'02-01-1920'} maxDate={'02-29-2020'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>

                    <label  className="key" >Profil Şəkli</label>                           <button className="fileInputButton" type="button"> <p className="pText">Profil rəsmi yükləyin</p> <input className="value"  type="file" name="profilePhoto" /></button>
                    <button className="submitBtn" type="submit">Submit</button>
                    {Error && <p className="errors">Daxil etdiyiniz elektron poçt artıq mövcuddur</p>}
                </Form>
            </Formik>
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default Registration

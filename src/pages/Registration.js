import 'date-fns';
import React from 'react';
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
  
function Registration(props) {
    // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const token = Cookies.getItem('XSRF-TOKEN')
  const headers = {
      "X-CSRF-TOKEN":token
  }
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    

    const onSubmit =  (values) => {
            axios.post('https://nehra.az/public/api/login', {name: values.name , surname: values.surname, email: values.email ,  phone: values.phone , password: values.password, profilePhoto:values.profilePhoto, date:selectedDate } , headers)
             .then(res => console.log(res))
             .catch(err => console.log(err))
    }
    
    const initialValues = {
        name:'',
        email:'',
        phone:'',
        password:'',
        confirmPassword:'',
        profilePhoto: '',
    }

      
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        phone:  Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Required'),
        password: Yup.string().required('Required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    })
    return (
        <div  className="registrationPage">
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <p className="title">Qeydiyyat</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form enctype='multipart/form-data' className="login" method="post" action="">
                    <label  className="key" >Adınız Soyadınız</label>                       <Field className="value" name="name" placeholder="Adınız"/>
                    <label  className="key" >Elektron poçt ünvanı</label>                   <Field className="value" name="email" placeholder="nümunə@gmail.com"/>
                    <label  className="key" >Parol</label>                                  <Field className="value" name="password" placeholder="Parol" type="password"/>
                    <label  className="key" >Parolu Təsdiqlə</label>                        <Field className="value" name="confirmPassword" placeholder="Parolu Təsdiqlə" type="password"/>
                    <label  className="key" >Telefon Nömrəsi</label>                        <Field className="value" name="phone" placeholder="Telefon Nömrəsi"/>
                    <label  className="key" >Doğum Tarixiniz</label>                        <KeyboardDatePicker margin="normal" id="date-picker-dialog"  format="MM/dd/yyyy" value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{ 'aria-label': 'change date',}} />
                    <label  className="key" >Profil Şəkli</label>                           <Field className="value"   type="file" name="profilePhoto" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default Registration

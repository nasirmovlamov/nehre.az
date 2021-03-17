import React, { useEffect, useState } from 'react'
import Button1 from './Button1'
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from 'yup';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';

toast.configure()
function Contacts(props) {
    const [UserData, setUserData] = useState(0)
    const phoneRegExp = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/



    const [selectedDate, setSelectedDate] = React.useState(new Date('2000-08-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
            console.log("ALO")
        }
    })
    
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
    }


    const imgHandler = {
        backgroundImage: `url(${src !== "" ? src : ("https://nehra.az/"+UserData.image)})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
    }

    const notify = () => toast.info("Məlumatlar yeniləndi!");
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
        const dt = new FormData()
        dt.append('id' , UserData.id)
        dt.append('name' , (values.name !== "" ? values.name : UserData.name  ))
        // dt.append('email' , values.email)
        dt.append('phone' ,  (values.phone !== "" ? values.phone : UserData.phone  ))
        dt.append('birthdate' , selectedDate)
        dt.append('profilePhoto' , (profilePhoto !== "" ? profilePhoto : "" ))
        axios.post('https://nehra.az/public/api/updateuser', dt  , headers )
         .then(res => ( console.log(res) , setloader(false) , res.status === 200 && localStorage.setItem("LoginUserData" , JSON.stringify(res.data)) , props.functionClose() , notify())) 
         .catch(err => ( setloader(false)))
    }

    const initialValues = {
        name:"",
        email:"",
        phone: "",
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(),
        email: Yup.string().email('Emailinizi düzgün daxil edin').required(),
        phone: Yup.string().matches(phoneRegExp, 'Telefon nömrəsini düzgün daxil edin').required(),
    })



    return (
        <div className="contactCont123">
            <p className="title">My info</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  className="gridCont">
                    <p className="name key">* Name and Surname</p> <Field  className="value"  placeHolder={`${UserData.name}`}  type="text" name="name" />
                    <div className="loader"><ErrorMessage name="name"/></div>
                    <p className="key">Balance</p> <p className="valueBalance">{UserData.balance === null ? 0 : UserData.balance} AZN</p>
                    <p className="email key ">* Email</p> <Field placeHolder={`${UserData.email}`} className="value"  type="email" name="email" />
                    <div className="loader"><ErrorMessage name="email"/></div>
                    <p className="phone key">* Phone</p> <Field placeHolder={`${UserData.phone}`} className="value"  type="num  " name="phone" />
                    <div className="loader"><ErrorMessage name="phone"/></div>
                    <p className="date key">* Birthday</p> <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label="Doğum tarixiniz"  value={selectedDate} minDate={'02-01-1920'} maxDate={'02-29-2020'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue.slice(0,10)); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>
                    <p className="key" style={{alignSelf:"start"}}>Profile picture </p> <div className="valueImg" style={imgHandler}></div>
                    <button type="button" className="addFile"> <p className="textPhoto">{profilePhoto?.name !== undefined ? profilePhoto.name  : "Şəklinizi yeniləyin"}</p><input onChange={ppchanger} type="file" className="addFileInput" name="profile" id=""/></button>
                    <Button1 type="submit" value="Məlumatlarınızı yelləyin" color="#285999"/>
                    <div className="loader">{loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={"35px"} width={"80px"} />}</div>
                </Form>
            </Formik>

        </div>
    )
}

export default Contacts

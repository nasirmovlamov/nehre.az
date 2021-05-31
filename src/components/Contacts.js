import React, {useEffect, useState, useContext} from 'react'
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
import AuthSms from '../components/AuthSms'
import Modal from '@material-ui/core/Modal';
import BalanceUp from './BalanceUp';
import {ProductListingContext} from '../components/ProductListingProvider'

toast.configure()
function Contacts(props) {


    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    const [UserData, setUserData] = useState(0)
    const phoneRegExp = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/
    const [selectedDate, setSelectedDate] = React.useState(new Date('2000-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
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

    const notify = () => toast.info(lang === "AZ" && `Məlumatlar yeniləndi!` || lang === "EN" && `Information updated!` || lang === "RU" && `Информация обновлена!`);
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
        email: Yup.string().email(lang === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || lang === "EN" && `Enter your email correctly` || lang === "RU" && `Введите свой адрес электронной почты правильно`).required(lang === "AZ" && `Elektron poçtunuzu daxil edin` || lang === "EN" && `Enter your email` || lang === "RU" && `Введите адрес электронной почты` ),
        phone: Yup.string().matches(phoneRegExp, (lang === "AZ" && `Telefon nömrəsini düzgün daxil edin` || lang === "EN" && `Enter the phone number correctly` || lang === "RU" && `Введите номер телефона правильно`)).required(lang === "AZ" && `Telefon nömrənizi daxil edin` || lang === "EN" && `Enter your phone number` || lang === "RU" && `Введите свой номер телефона`),
    })

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className="contactCont123">
            <p className="title">My info</p>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  className="gridCont">
                    <p className="name key">* {lang === "AZ" && `Adınız  Soyadınız` || lang === "EN" && `Name Surname` || lang === "RU" && `Имя Фамилия`}</p> <Field  className="value"  placeHolder={`${UserData.name}`}  type="text" name="name" />
                    <div className="loader"><ErrorMessage name="name"/></div>
                    <p className="key"> {lang === "AZ" && `Balans ` || lang === "EN" && `Balance ` || lang === "RU" && `Баланс `}</p> <div className='balanceCont'><p className="valueBalance">{UserData.balance === null ? 0 : UserData.balance} AZN</p>  <button onClick={() => handleOpen()} type='button'>Balansı artır</button></div>
                    <p className="email key ">* {lang === "AZ" && `Elektron poçt ünvanı` || lang === "EN" && `Email address` || lang === "RU" && `Адрес электронной почты`}</p> <Field disabled placeHolder={`${UserData.email}`} className="value"  type="email" name="email" />
                    <div className="loader"><ErrorMessage name="email"/></div>
                    <p className="phone key">* {lang === "AZ" && `Telefon` || lang === "EN" && `Phone` || lang === "RU" && `Телефон`}</p> <Field disabled placeHolder={`${UserData.phone}`} className="value"  type="num  " name="phone" />
                    <div className="loader"><ErrorMessage name="phone"/></div>
                    <p className="date key">* {lang === "AZ" && `Doğum tarixi` || lang === "EN" && `Date of birth` || lang === "RU" && `Дата рождения`}</p> <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label={lang === "AZ" && `Doğum tarixi` || lang === "EN" && `Date of birth` || lang === "RU" && `Дата рождения`}  value={selectedDate} minDate={'02-01-1920'} maxDate={'02-29-2020'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue.slice(0,10)); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>
                    <p className="key" style={{alignSelf:"start"}}>Profile picture </p> <div className="valueImg" style={imgHandler}></div>
                    <button type="button" className="addFile"> <p className="textPhoto">{profilePhoto?.name !== undefined ? profilePhoto.name  : (lang === "AZ" && `Şəkil` || lang === "EN" && `Picture` || lang === "RU" && `Картина`)}</p><input onChange={ppchanger} type="file" className="addFileInput" name="profile" id=""/></button>
                    <Button1 type="submit" value={lang === "AZ" && `Təsdiqləyin` || lang === "EN" && `Confirm` || lang === "RU" && `Подтверждать`}  color="#285999"/>
                    <div className="loader">{loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={"35px"} width={"80px"} />}</div>
                </Form>
            </Formik>
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {<BalanceUp UserId={UserData?.id} functionClose={() => handleClose() } />}
            </Modal>
        </div>
    )
}

export default Contacts

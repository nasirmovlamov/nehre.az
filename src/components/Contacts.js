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
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Data from '../assets/language/profileUpdate.json'
import '../assets/css/contact.scss'
toast.configure()


function Contacts(props) {
    const notify = () => toast.info(lang === "AZ" && `Məlumatlar yeniləndi!` || lang === "EN" && `Information updated!` || lang === "RU" && `Информация обновлена!`);
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    
    const pageData = Data[`profile-${lang}`]
    const validate = pageData.validation
    const formText = pageData.formText

    const [UserData, setUserData] = useState(0)
    const phoneRegExp = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}/
    const [selectedDate, setSelectedDate] = React.useState(new Date('2000-08-18T21:11:54'));

    const [initialValues, setinitialValues] = useState({
        name:"",
        email:"",
        phone: "",
    })
    
    const validationSchema = Yup.object({
        name: Yup.string().required(validate.name),
        email: Yup.string().email(validate.emailCorrect).required(validate.emailEnter),
        phone: Yup.string().matches(phoneRegExp, validate.phoneCorrect).required(validate.phoneEnter),
    })
   

    
    


    const [loader, setloader] = useState(false)
    const clickHandler = () => {
        props.functionClose()
        props.registerFunc()
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }

    const [Error, setError] = useState(false)
    const onSubmit = async (values) => {
        setloader(true)
        const dt = new FormData()
        dt.append('id' , UserData.id)
        dt.append('name' , (values.name))
        dt.append('email' , values.email)
        dt.append('phone' ,  (values.phone))
        dt.append('birthdate' , selectedDate)
        try {
            const res = await axios.post('https://nehra.az/public/api/updateuser', dt  , headers )
            setloader(false) 
            localStorage.setItem("LoginUserData" , JSON.stringify(res.data))
            notify()
            console.log("ys")
        } catch (error) {
            setloader(false)
        }
    }

    //#region Modal
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    //#endregion Modal

    
    useEffect(() => {
        const userData= JSON.parse(localStorage.getItem('LoginUserData'))
        setUserData(userData)
        setinitialValues({... initialValues , name: userData.name , email:userData.email, phone:userData.phone})
        setSelectedDate(userData.birthdate)
    } , [])

    const onChangePhone = (e) =>{
        const value = e.target.value.replace(/\D/g, "");
        setinitialValues({... initialValues , phone:value})
    }
    return (
        <div className="contactCont123">
            <p className="title">My info</p>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  className="gridCont1">
                    <div className="flexCont">
                        <div className='inputCont'>
                            <p className="text">* {formText.name}</p> 
                            <Field  className="input"  placeHolder={`${UserData.name}`}  type="text" name="name" />
                        </div>
                        <div className="error"><p><ErrorMessage name="name"/></p> </div>
                    </div>
                    
                    
                    <div className="flexCont">
                        <div className='inputCont'>
                            <p className="email key text">* {formText.email}</p> 
                            <Field  placeHolder={`${UserData.email}`} className="input"  type="email" name="email" />
                        </div>
                        <div className="error"><p><ErrorMessage name="email"/></p> </div>
                    </div>
                    
                    <div className="flexCont">
                        <div className='inputCont'>
                            <p className="phone key text">* {formText.phone}</p> 
                            <Field onChange={onChangePhone}  placeHolder={`${UserData.phone}`} className="input phoneinput"  type="num  " name="phone" />
                        </div>
                        <div className="error"><p><ErrorMessage name="phone"/></p> </div>
                    </div>

                    <div className="inputCont">
                        <p className="date key text">* {formText.date}</p> 
                        <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label={formText.date}  value={selectedDate} minDate={'02-01-1920'} maxDate={'02-29-2020'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>
                    </div>

                    <div className="inputCont">
                        <div className="text"> 
                            {formText.balance}
                        </div>
                        <div className='balanceUpbtn'>
                            <p className="valueBalance"><span>{UserData.balance === null ? 0 : UserData.balance}</span>  AZN</p>  
                            <button onClick={() => handleOpen()} type='button' className='balanceBtn'> <AddCircleIcon/> Balansı artır</button>
                        </div>
                    </div>


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

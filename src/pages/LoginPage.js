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
    const {UserStatus , loader, setloader, setMinOrder,setnumber1, setnumber2,setTopCategory,setmoney, setUserStatus ,setItems,  ProdutData, openRegisterF , closeRegisterF , setUserData , setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const notify = () => toast.info(lang === "AZ" && `Hesabınıza daxil oldunuz!` || lang === "EN" && `You have logged in to your account!` || lang === "RU" && `Уведомление удалено!`);
    // const notifyW = () => toast.error("Daxil etdiyiniz məlumatlar yanlışdır!");
    const clickHandler = () => {
        CloseLoginF()
        openRegisterF()
    }

    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }

    const [Error, setError] = useState(false)
    const sendGetRequest10 = async () => {
        setloader(true)
        try {
          let resp = ""
          if(JSON.parse(localStorage.getItem('LoginUserData')) !== null)
          { 
            //#region Status setting 
            const respStatus  = await axios.get(`https://nehra.az/public/api/checkstatus?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
              if(respStatus.data === 0)
              {
                setUserStatus(false)
              }
              else 
              {
                setUserStatus(true)
              }
            //#endregion Status setting 
            resp  = await axios.get(`https://nehra.az/public/api/settings?user_id=${JSON.parse(localStorage.getItem('LoginUserData'))?.id}`)
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
            setMinOrder(resp.data.min_order_amount)
            setnumber1(resp.data.phone1) 
            setnumber2(resp.data.phone2)
            setTopCategory(resp.data.featuredcats)
            setmoney(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
            setlang((resp.data.lang === "az" && "AZ") || (resp.data.lang === "en" && "EN") || (resp.data.lang === "ru" && "RU"))
            setSelectedsProduct(JSON.parse(resp.data.selected.text))
            if(resp.data.cart.text !== null)
            {
              const dataparsed = JSON.parse(resp.data.cart.text)
              setMinOrder()
              if(dataparsed !== undefined && dataparsed !== null && dataparsed !== "")
              {
                setProdutData((dataparsed.product      !== null  && dataparsed.product      !== undefined && dataparsed.product      !== "")   ?  dataparsed.product  : [])
                setFinalPrice((dataparsed.FinalPrice   !== null  && dataparsed.FinalPrice   !== undefined && dataparsed.FinalPrice   !== "")   ?  parseFloat(dataparsed.FinalPrice)  : 0)
                setFinalWeight((dataparsed.FinalWeight !== null  && dataparsed.FinalWeight  !== undefined && dataparsed.FinalWeight  !== "")   ?  parseFloat(dataparsed.FinalWeight)  : 0)
                setFinalGoods((dataparsed.FinalGoods   !== null  && dataparsed.FinalGoods   !== undefined && dataparsed.FinalGoods   !== "")   ?  parseInt(dataparsed.FinalGoods)  : 0)
                setFinalBonus((dataparsed.FinalBonus   !== null  && dataparsed.FinalBonus   !== undefined && dataparsed.FinalBonus   !== "")   ?  parseInt(dataparsed.FinalBonus)  : 0)
                setDateGoods((dataparsed.DateGoods     !== null  && dataparsed.DateGoods    !== undefined && dataparsed.DateGoods    !== "")   ?  dataparsed.DateGoods  : [])
                setItems((dataparsed.product      !== null  && dataparsed.product      !== undefined && dataparsed.product      !== "")   ?  dataparsed.product  : [])
              }
            }
            else 
            {
                setProdutData([])
                setFinalPrice(0)
                setFinalWeight(0)
                setFinalGoods(0)
                setFinalBonus(0)
                setDateGoods([])
                setItems([])
            }
          }
          else if (JSON.parse(localStorage.getItem('LoginUserData')) === null)
          {
            setProdutData(localStorage.getItem('ProdutData')  !== null   ?  JSON.parse(localStorage.getItem('ProdutData')) : [])
            setFinalPrice(localStorage.getItem('FinalPrice')!== null   ?  parseFloat(localStorage.getItem('FinalPrice')) : 0 )
            setFinalWeight(localStorage.getItem('FinalWeight') !== null ? parseFloat(localStorage.getItem('FinalWeight')) : 0)
            setFinalGoods(localStorage.getItem('FinalGoods')   !== null  ?  parseInt(localStorage.getItem('FinalGoods')) : 0)
            setFinalBonus(localStorage.getItem('FinalBonus')   !== null  ?  parseInt(localStorage.getItem('FinalBonus')) : 0)
            setDateGoods(localStorage.getItem('DateGoods')  !== null  ?  JSON.parse(localStorage.getItem('DateGoods')) : [])
            setItems(localStorage.getItem('ProdutData')  !== null   ?  JSON.parse(localStorage.getItem('ProdutData')) : [])
            console.log('not')
            resp = await axios.get(`https://nehra.az/public/api/settings`)
            setTopCategory(resp.data.featuredcats)
            setMinOrder(resp.data.min_order_amount)
            setnumber1(resp.data.phone1) 
            setnumber2(resp.data.phone2)
            setSelectedsProduct()
            setlang((resp.data.lang === "az" && "AZ") || (resp.data.lang === "en" && "EN") || (resp.data.lang === "ru" && "RU"))
            setmoney(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
            setUserStatus(false)
          }
          else 
          {}
            setloader(false)
        } 
        
        catch (err) {
          console.error(err);
            setloader(false)
          setTimeout(() => {
            sendGetRequest10()
          }, 60000);
        }
      };

    const onSubmit = async (values) => {
        const res = await axios.post('https://nehra.az/public/api/check', { email: values.email ,  password: values.password }  , headers )
        setloader(false)
        console.log(res) 
        localStorage.setItem("LoginUserData" , JSON.stringify(res.data.user)) 
        setUserData(res.data.user) 
        sendGetRequest10()
        CloseLoginF() 
        notify() 
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
                <div className="buttonCont"><button type='button' onClick={() => CloseLoginF()} className="removeModalBtn">×</button></div>
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
                    {<ForgotPass  functionClose={() => handleClose() } openPassChange={() => handleOpen2()}  functionCloseLogin={() => CloseLoginF()} />}
                </Modal>
                
                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={open2}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<NewPass  functionClose={() => handleClose2() }  functionCloseLogin={() => CloseLoginF()} />}
                </Modal>
            </Form>
        </Formik>
    )
}

export default LoginPage

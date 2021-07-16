import axios from 'axios'
import { ErrorMessage, Form, Formik , Field } from 'formik'
import React, { useState ,useContext, useEffect } from 'react'
import Button1 from '../components/Button1'
import Cookies from 'js-cookie'
import * as yup from 'yup';
import {ProductListingContext} from '../components/ProductListingProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/forgetPassword.scss'
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

function ForgetPassword() {
    const context = useContext(ProductListingContext)
    const {UserStatus , loader, setloader, setMinOrder,setnumber1, setnumber2,setTopCategory,setmoney, setUserStatus ,setItems,  ProdutData, openRegisterF , closeRegisterF , setUserData , setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
    const history = useHistory()
    const {slug} = useParams()
    const notifyL = () => toast.info(lang === "AZ" && `Hesabınıza daxil oldunuz!` || lang === "EN" && `You have logged in to your account!` || lang === "RU" && `Вы вошли в свою учетную запись!`);
    const notifyError = () => toast.warn(lang === "AZ" && `Yanlışlıq mövcuddur!` || lang === "EN" && `There is a mistake!` || lang === "RU" && `Ошибка!`);

    useEffect(async () => {
        try {
            const res  = await axios.get(`https://nehra.az/api/checkremember?token=${slug}`)
        } catch (error) {
            notifyError()
            setTimeout(() => {}, 1000);
            history.push('/')
        }
    }, [])



    const notifyPass = () => toast.info(lang === "AZ" && `Şifrəniz yeniləndi!` || lang === "EN" && `Your password has been updated!` || lang === "RU" && `Ваш пароль был обновлен!`);
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    const validationSchema = yup.object({
        // oldPassword: yup.string().matches(passRegex , (lang === "AZ" && `Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir` || lang === "EN" && `Your password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit` || lang === "RU" && `Ваш пароль должен состоять не менее чем из 8 символов, 1 заглавной буквы, 1 строчной буквы и 1 цифры.`)).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`),
        password: yup.string().matches(passRegex , (lang === "AZ" && `Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir` || lang === "EN" && `Your password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit` || lang === "RU" && `Ваш пароль должен состоять не менее чем из 8 символов, 1 заглавной буквы, 1 строчной буквы и 1 цифры.`)).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], (lang === "AZ" && `Şifrələr uyğun deyil` || lang === "EN" && `Passwords do not match` || lang === "RU" && `Пароли не соответствуют`)).required(lang === "AZ" && `Şifrənizi daxil edin` || lang === "EN" && `Enter password` || lang === "RU" && `Введите пароль`)
    })
    
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
            setProdutData([])
            setFinalPrice(0 )
            setFinalWeight(0)
            setFinalGoods(0)
            setFinalBonus(0)
            setDateGoods([])
            setItems([])
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
          setloader(false)
          setError(true)
        }
      };
    const onSubmit = async  (values) => {
        try {
            const res = await axios.post('https://nehra.az/public/api/rememberpass', {password:values.password , token:slug}  )
            localStorage.setItem("LoginUserData" , JSON.stringify(res.data)) 
            setUserData(res.data) 
            sendGetRequest10()
            notifyL()
            history.push('/')
        } catch (error) {
            notifyError()
            history.push('/')
        }
    }
    
    const initialValues = {
        // oldPassword:'',
        password:'',
        confirmPassword:'',
    }

    return (
        <div className="ForgetPasswordPage pagescroll"> 
            <div className="formSubmit">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form className="cabinetCont contactCont">
                    <h1 className="title">{lang === "AZ" && `Şifrə` || lang === "EN" && `Password` || lang === "RU" && `Пароль`}</h1>
                    <div className="FlexContPass">
                            <label  className="key" >Şifrə</label>                                  
                            <div className="errors">
                                <Field type="password" className="value" name="password" placeholder={lang === "AZ" && `Yeni Şifrə` || lang === "EN" && `New Password` || lang === "RU" && `Новый пароль`} type="password"/>
                                <p className="error"><ErrorMessage name="password"/></p>
                            </div>
                            <label  className="key" >{lang === "AZ" && `Şifrəni Təsdiqlə` || lang === "EN" && `Confirm Password` || lang === "RU" && `Подтвердить Пароль`} </label>                        
                            <div className="errors">
                                <Field type="password" className="value" name="confirmPassword" placeholder={lang === "AZ" && `Şifrəni Təsdiqlə` || lang === "EN" && `Confirm Password` || lang === "RU" && `Подтвердить Пароль`}  type="password"/>
                                <p className="error"><ErrorMessage name="confirmPassword"/></p>
                            </div>
                    </div>
                    <button className='submitBtn' type='submit' > {(lang === "AZ" && `Yadda Saxla` || lang === "EN" && `Save` || lang === "RU" && `Сохранить`)}</button>
                </Form>
            </Formik>
            </div>
        </div>
    )
}

export default ForgetPassword

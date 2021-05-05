import React, { useEffect, useState, useContext} from 'react'
import axios from 'axios'
import Cookies from 'js-cookies'
import * as Yup from "yup"
import "../assets/css/checkoutPage.css"
import Button1 from '../components/Button1'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';
import {Formik , Form , Field, ErrorMessage} from "formik"
import {ProductListingContext} from '../components/ProductListingProvider'

function CheckoutPage(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)
    const notify = () => toast.info("Nuş olsun!");

    const [loader, setloader] = useState(false)
    const [selectedValue, setselectedValue] = useState(1)
    const [selectedDateTime, setSelectedDateTime] = useState(1)

    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
    }

    const clickHandler = (num) => {
        for (var i =1; i<5; i++)
        {
            document.getElementById(`checkBox${i}`).checked = false
        }
        document.getElementById(`checkBox${num}`).checked  = true
    }
    const clickHandler2 = (num) => {
        for (var i =1; i<3; i++)
        {
            document.getElementById(`checkBoxx${i}`).checked = false
        }
        document.getElementById(`checkBoxx${num}`).checked  = true
        // setSelectedDateTime(document.getElementById(`checkBoxx${num}`).name)
    }
    
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }

    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        setloader(true)
        axios.post('https://nehra.az/public/api/payment', {name: values.name , email: values.email , address:values.address , payment_type:selectedValue , total_price: FinalPrice , total_count: FinalGoods, product_data: ProdutData, user_id:props.UserId}  , headers )
         .then(res => (setloader(false) , console.log(res) , res.status === 200 && ( notify(), props.functionClose() , setTimeout(() => { window.location.href = '/payment'}, 3000) ))) 
         .catch(err => (setError(true) , setloader(false)))
    }

    const initialValues = {
        name:'',
        email:'',
        address:'',
    }
    const validationSchema = Yup.object({
        name: Yup.string().required(lang === "AZ" && `Adınızı daxil edin` || lang === "EN" && `Enter name` || lang === "RU" && `Введите имя`),
        email: Yup.string().email(lang === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || lang === "EN" && `Enter your email correctly` || lang === "RU" && `Введите свой адрес электронной почты правильно`).required(lang === "AZ" && 'Elektron poçt daxil edin' || lang === "EN" && `Enter email` || lang === "RU" && `Введите адрес электронной почты`),
        address: Yup.string().required(lang === "AZ" && `Ünvanınızı daxil edin` || lang === "EN" && `Enter your address` || lang === "RU" && `Введите ваш адрес`),
    })


    const [address, setaddress] = useState([])
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/getaddress?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
            .then(res => setaddress(res.data))
    }, [])

    return (
        
        <div className="checkoutPage">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  method="POST">
                    <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                    {/* <p className="title">{lang === "AZ" && `Əlaqə Məlumatları` || lang === "EN" && `Contact Details` || lang === "RU" && `Контактная информация`}</p> */}
                    {/* <div className="inputCont">
                        <div className="errors">
                            <Field name='name' type="text"  placeholder={lang === "AZ" && `Adınız Soyadınız` || lang === "EN" && `Name Surname` || lang === "RU" && `Имя Фамилия`}/>
                            <ErrorMessage name="name"/>
                        </div>
                        <div className="errors">
                            <Field name='email' type="email" placeholder={lang === "AZ" && `nümunə@gmail.com` || lang === "EN" && `example@gmail.com` || lang === "RU" && `example@gmail.com`}/>
                            <ErrorMessage name="email"/>
                        </div>
                    </div> */}
                    <div className="deliveryAddress">
                        <p className="title">{lang === "AZ" && `Çatdırılma olacaq ünvan` || lang === "EN" && `Delivery Address` || lang === "RU" && `Адресс доставки`}</p>
                        <div className="errors">
                            {/* <Field name='address' placeholder={lang === "AZ" && `Çatdırılma olacaq ünvan` || lang === "EN" && `Delivery Address` || lang === "RU" && `Адресс доставки`} className="address" /> */}
                            {/* <ErrorMessage name="address"/> */}
                            {address?.map((address , index) => <div key={address.id} className='addressElement'><p className='addressText'>{(index+1) + ". "}{address.adres}</p></div>)}
                        </div>
                    </div>

                    <p className="title">{lang === "AZ" && `Çatdırılma günü` || lang === "EN" && `Delivery day` || lang === "RU" && `День доставки`}</p>

                    <div className="typeOfPayment">
                        <div className="type1"><input value='1' name="dateTime1" checked="true"  id="checkBoxx1" onClick={() => clickHandler2(1)} type="checkbox"></input> <label>24 Aprel</label></div>
                        <div className="type2"><input value='2' name="dateTime2" id="checkBoxx2" onClick={() => clickHandler2(2)} type="checkbox"></input> <label>32 Aprel</label></div>
                    </div>

                    <p className="title">Ödəniş növü</p>
                    <div className="typeOfPayment">
                        <div className="type3"><input value='4' name="onlinePayment" id="checkBox4" onClick={() => clickHandler(4)} type="checkbox"></input> <label>{lang === "AZ" && `Online` || lang === "EN" && `Online` || lang === "RU" && `В сети`} </label></div>
                        <div className="type3"><input value='3' name="fromPoint" id="checkBox3" onClick={() => clickHandler(3)} type="checkbox"></input> <label>{lang === "AZ" && `Balansdan` || lang === "EN" && `Balance` || lang === "RU" && `Остаток средств`} </label></div>
                        <div className="type2"><input value='2' name="doorCard" id="checkBox2" onClick={() => clickHandler(2)} type="checkbox"></input> <label>{lang === "AZ" && `Qapıda Kartla` || lang === "EN" && `At door with card` || lang === "RU" && `У двери с картой`}</label></div>
                        <div className="type1"><input value='1' name="doorCash" checked="true"  id="checkBox1" onClick={() => clickHandler(1)} type="checkbox"></input> <label>{lang === "AZ" && `Terminalla` || lang === "EN" && `with Terminal` || lang === "RU" && `с Терминалом`}</label></div>
                    </div>
                    <button type='submit' className="goToPayment" >{lang === "AZ" && `Təsdiqlə` || lang === "EN" && `Submit` || lang === "RU" && `Утвердить`}</button>
                    {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={17} width={75} />}
                </Form>
            </Formik>
        </div>
    )
}

export default CheckoutPage

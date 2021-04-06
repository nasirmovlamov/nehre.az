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
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice , FinalWeight, setFinalWeight,FinalGoods, setFinalGoods] = useContext(ProductListingContext)
    const notify = () => toast.info("Nuş olsun!");

    const [loader, setloader] = useState(false)
    const [selectedValue, setselectedValue] = useState(1)

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
        console.log(document.getElementById(`checkBox${num}`).value)
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
        name: Yup.string().required('Adınızı daxil edin'),
        email: Yup.string().email('Emailinizi düzgün daxil edin').required('Emailinizi daxil edin'),
        address: Yup.string().required('Ünvanınızı daxil edin'),
    })



    return (
        
        <div className="checkoutPage">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  method="POST">
                    <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                    <p className="title">Əlaqə Məlumatları</p>
                    <div className="inputCont">
                        <div className="errors">
                            <Field name='name' type="text" placeholder="Adınızı daxil edin"/>
                            <ErrorMessage name="name"/>
                        </div>
                        <div className="errors">
                            <Field name='email' type="email" placeholder="Elektron poçtunuzu daxil edin"/>
                            <ErrorMessage name="email"/>
                        </div>
                    </div>
                    <div className="deliveryAddress">
                        <p className="title">Çatdırılma olacaq ünvan</p>
                        <div className="errors">
                            <Field name='address' placeholder="Baku, st. Məşədi Əzizbəyov, house 1" className="address" />
                            <ErrorMessage name="address"/>
                        </div>
                    </div>
                        <p className="title">Ödəniş növü</p>
                    <div className="typeOfPayment">
                        <div className="type1"><input value='1' name="doorCash" checked="true"  id="checkBox1" onClick={() => clickHandler(1)} type="checkbox"></input> <label>Qapıda Nağd </label></div>
                        <div className="type2"><input value='2' name="doorCard" id="checkBox2" onClick={() => clickHandler(2)} type="checkbox"></input> <label>Qapıda Kartla</label></div>
                        <div className="type3"><input value='3' name="fromPoint" id="checkBox3" onClick={() => clickHandler(3)} type="checkbox"></input> <label>Balansdan </label></div>
                        <div className="type3"><input value='4' name="onlinePayment" id="checkBox4" onClick={() => clickHandler(4)} type="checkbox"></input> <label>Online </label></div>
                    </div>
                    <button type='submit' className="goToPayment" >Təsdiqlə</button>
                    {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={17} width={75} />}
                </Form>
            </Formik>
        </div>
    )
}

export default CheckoutPage

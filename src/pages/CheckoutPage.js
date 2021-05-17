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
import moment from 'moment';
import { set } from 'js-cookie'
import 'moment/locale/az';
import 'moment/locale/ru';
function CheckoutPage(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)
    
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
    const [deliveryDay, setdeliveryDay] = useState()
    const [nondeliveryProducts, setnondeliveryProducts] = useState([])
    const [deliveryProducts, setdeliveryProducts] = useState([])
    const [deliveryy, setdeliveryy] = useState([])





    const clickHandler2 = (num) => {
        for (var i =1; i<7; i++)
        {
            if(typeof  document.getElementById(`checkBoxx${i}`) !== undefined && typeof  document.getElementById(`checkBoxx${i}`) !== null)
            {
                document.getElementById(`checkBoxx${i}`).checked = false
            }
        }


        document.getElementById(`checkBoxx${num}`).checked  = true
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const deliveryday = new Date()
        deliveryday.setDate(tomorrow.getDate() + (num + 7 - tomorrow.getDay()) % 7);
        console.log('-------------------------')
        var newdeliveryday = moment(deliveryday).format( 'dddd, D MMMM');
        console.log(newdeliveryday)
        setdeliveryDay(newdeliveryday)
        console.log(deliveryProducts)
        console.log(nondeliveryProducts)
        console.log('-------------------------')
        console.log(ProdutData);
        // console.log("will be delivered" + deliveryProducts)
        // console.log("will not be delivered" + nondeliveryProducts)
        console.log('-------------------------')
        console.log('-------------------------')
        
        var dateIds = []
        var nondateIds = []
        const dateChecker = (date , id) => {
            for (let i = 0; i < date.length; i++) {
                const today = new Date()
                tomorrow.setDate(today.getDate() + 1)
                // console.log(tomorrow);
                const elementday = new Date()
                elementday.setDate(tomorrow.getDate() + (parseInt(date[i]) + 7 - tomorrow.getDay()) % 7);
                console.log(elementday);
                if(elementday.getDate()  < deliveryday.getDate() )
                {
                    console.log('YEs')
                    dateIds.push(id)
                    nondateIds = nondateIds.filter(element => element !== id)
                    // setdeliveryProducts([...deliveryProducts , id])
                    return 0 
                }
                else if(elementday.getDate()  > deliveryday.getDate() )
                {
                    nondateIds.push(id)
                }
                else 
                {
                    console.log('YEs')
                    dateIds.push(id)
                    nondateIds = nondateIds.filter(element => element !== id)
                    // setdeliveryProducts([...deliveryProducts , id])
                    return 0 
                    // setnondeliveryProducts([...nondeliveryProducts , id])
                }
            }
            console.log('-------------------------')
        }
        ProdutData.map(elements => dateChecker(elements.date , elements.id))     
        nondateIds = [...new Set(nondateIds)];   
        console.log(dateIds)
        console.log(nondateIds)
        setdeliveryProducts(dateIds)
        setnondeliveryProducts(nondateIds)
        // setnondeliveryProducts(nondateIds)
    }
    
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }
    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        const vrt2 = (id , element) => {
            for (let i = 0; i < nondeliveryProducts.length; i++) {
                if(id === nondeliveryProducts[i])
                {
                    return element
                }
            }
        }
        var newarr = ProdutData.map((element, index ) =>  vrt2(element.id , element))
        newarr = newarr.filter(element => element !== undefined)
        localStorage.setItem('ProdutData' , JSON.stringify(newarr))

        setloader(true)
        const vrt = (id , element) => {
            for (let i = 0; i < deliveryProducts.length; i++) {
                if(id === deliveryProducts[i])
                {
                    return element
                }
            }
        }
        var newarr2 = ProdutData.map((element, index ) =>  vrt(element.id , element))
        newarr2 = newarr2.filter(element => element !== undefined)
        // console.log(ProdutData)
        // console.log(newarr2)
        axios.post('https://jsonplaceholder.typicode.com/posts', {name: values.name , email: values.email , address:values.address , payment_type:selectedValue , total_price: FinalPrice , total_count: FinalGoods, product_data: newarr2, user_id:props.UserId}  , headers )
         .then(res => (setloader(false) , console.log(res)  )) 
        //  res.status === 200 && ( notify(), props.functionClose() , setTimeout(() => { window.location.href = '/payment'}, 3000) )
         .catch(err => (setError(true) , setloader(false)))
    }

    const initialValues = {
        // name:'',
        // email:'',
        // address:'',
    }
    const validationSchema = Yup.object({
        // address: Yup.string().required(lang === "AZ" && `Ünvanınızı daxil edin` || lang === "EN" && `Enter your address` || lang === "RU" && `Введите ваш адрес`),
    })
    const [address, setaddress] = useState([])
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/getaddress?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
            .then(res => setaddress(res.data))
    }, [])







    //Date Problems
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const monday = new Date()
        monday.setDate(tomorrow.getDate() + (1 + 7 - tomorrow.getDay()) % 7);
        const tuesday = new Date()
        tuesday.setDate(tomorrow.getDate() + (2 + 7 - tomorrow.getDay()) % 7);
        const wednesday = new Date()
        wednesday.setDate(tomorrow.getDate() + (3 + 7 - tomorrow.getDay()) % 7);
        const thursday = new Date()
        thursday.setDate(tomorrow.getDate() + (4 + 7 - tomorrow.getDay()) % 7);
        const friday = new Date()
        friday.setDate(tomorrow.getDate() + (5 + 7 - tomorrow.getDay()) % 7);
        const saturday = new Date()
        saturday.setDate(tomorrow.getDate() + (6 + 7 - tomorrow.getDay()) % 7);
        const sunday = new Date()
        sunday.setDate(tomorrow.getDate() + (7 + 7 - tomorrow.getDay()) % 7);
        var newmonday = moment(monday).locale('az').format( 'dddd, D MMMM');
        var newtuesday = moment(tuesday).locale('az').format( 'dddd, D MMMM');
        var newwednesday = moment(wednesday).locale('az').format( 'dddd, D MMMM');
        var newthursday = moment(thursday).locale('az').format( 'dddd, D MMMM');
        var newfriday = moment(friday).locale('az').format( 'dddd, D MMMM');
        var newsaturday = moment(saturday).locale('az').format( 'dddd, D MMMM');
        var newsunday = moment(sunday).locale('az').format( 'dddd, D MMMM');
   //Date Problems
   
    
    const vrt = (id , element) => {
        for (let i = 0; i < nondeliveryProducts.length; i++) {
            if(id === nondeliveryProducts[i])
            {
                return element
            }
        }
    }
    var newarr = ProdutData.map((element, index ) =>  vrt(element.id , element))
    newarr = newarr.filter(element => element !== undefined)
    // console.log(newarr)
    return (
        
        <div className="checkoutPage">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  method="POST">
                    <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                    
                    <div className="deliveryAddress">
                        <p className="title">{lang === "AZ" && `Çatdırılma olacaq ünvan` || lang === "EN" && `Delivery Address` || lang === "RU" && `Адресс доставки`}</p>
                        <div className="errors">
                            {/* <Field name='address' placeholder={lang === "AZ" && `Çatdırılma olacaq ünvan` || lang === "EN" && `Delivery Address` || lang === "RU" && `Адресс доставки`} className="address" /> */}
                            {/* <ErrorMessage name="address"/> */}
                            {address?.map((address , index) => <div key={address.id} className='addressElement'><p className='addressText'>{(index+1) + ". "}{address.adres}</p></div>)}
                        </div>
                    </div>

                    <p className="title">{lang === "AZ" && `Çatdırılma günləri` || lang === "EN" && `Delivery day` || lang === "RU" && `День доставки`}</p>
                    <div className="datesCont">
                        {
                            DateGoods.map(
                            date=>
                            <>
                                {date === '1' && <div className="type2"><input value='1' name="dateTime1" id="checkBoxx1" onClick={() => clickHandler2(1)} type="checkbox"></input> <label>{newmonday}</label></div>}
                                {date === '2' && <div className="type2"><input value='2' name="dateTime2" id="checkBoxx2" onClick={() => clickHandler2(2)} type="checkbox"></input> <label>{newtuesday}</label></div>}
                                {date === '3' && <div className="type2"><input value='3' name="dateTime2" id="checkBoxx3" onClick={() => clickHandler2(3)} type="checkbox"></input> <label>{newwednesday}</label></div>}
                                {date === '4' && <div className="type2"><input value='4' name="dateTime2" id="checkBoxx4" onClick={() => clickHandler2(4)} type="checkbox"></input> <label>{newthursday}</label></div>}
                                {date === '5' && <div className="type2"><input value='5' name="dateTime2" id="checkBoxx5" onClick={() => clickHandler2(5)} type="checkbox"></input> <label>{newfriday}</label></div>}
                                {date === '6' && <div className="type2"><input value='6' name="dateTime2" id="checkBoxx6" onClick={() => clickHandler2(6)} type="checkbox"></input> <label>{newsaturday}</label></div>}
                                {date === '7' && <div className="type2"><input value='7' name="dateTime2" id="checkBoxx7" onClick={() => clickHandler2(7)} type="checkbox"></input> <label>{newsunday}</label></div>}
                            </>)
                        }
                    </div>

                   {
                       newarr.length > 0 && 
                        <>
                        <p className="title1"> {deliveryDay} </p>
                        <p className="title2"> Çatdırılma olunmayacaq məhsullar  </p>
                        <div>
                            {newarr.map((element , index)=> <p className='nondeliveryItem'>{index+1}. {element?.name}</p>)}
                        </div>
                        </>
                    }

                    <div className="typeOfPayment">
                        
                    </div>

                    <p className="title">Ödəniş növü</p>
                    <div className="typeOfPayment">
                        <div className="type3"><input value='4' name="onlinePayment" id="checkBox4" onClick={() => clickHandler(4)} type="checkbox"></input> <label>{lang === "AZ" && `Online` || lang === "EN" && `Online` || lang === "RU" && `В сети`} </label></div>
                        <div className="type3"><input value='3' name="fromPoint" id="checkBox3" onClick={() => clickHandler(3)} type="checkbox"></input> <label>{lang === "AZ" && `Balansdan` || lang === "EN" && `Balance` || lang === "RU" && `Остаток средств`} </label></div>
                        <div className="type2"><input value='2' name="doorCard" id="checkBox2" onClick={() => clickHandler(2)} type="checkbox"></input> <label>{lang === "AZ" && `Qapıda Kartla` || lang === "EN" && `At door with card` || lang === "RU" && `У двери с картой`}</label></div>
                        <div className="type1"><input value='1' name="doorCash" checked="true"  id="checkBox1" onClick={() => clickHandler(1)} type="checkbox"></input> <label>{lang === "AZ" && `Terminalla` || lang === "EN" && `with Terminal` || lang === "RU" && `с Терминалом`}</label></div>
                    </div>
                    <div className='btnCont'>
                        <button type='submit' className="goToPayment" >{lang === "AZ" && `Təsdiqlə` || lang === "EN" && `Submit` || lang === "RU" && `Утвердить`}</button>
                        {loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={17} width={75} />}
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default CheckoutPage

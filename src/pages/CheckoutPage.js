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
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { AddToHomeScreenRounded } from '@material-ui/icons'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import DoneIcon from '@material-ui/icons/Done';
import 'moment/locale/az';
import 'moment/locale/ru';

function CheckoutPage(props) {

    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const notify = () => toast.info("Nuş olsun!");

    const [loader, setloader] = useState(false)
    const [selectedValue, setselectedValue] = useState(1)
    const [selectedDateTime, setSelectedDateTime] = useState(1)
    const [addressAdd, setaddressAdd] = useState(false)
    const [city, setcity] = useState()
    const [ev, setev] = useState()
    const [square, setsquare] = useState()
    const [floor, setfloor] = useState()
    const [menzil, setmenzil] = useState()
    const [intercome, setintercome] = useState()
    const [note, setnote] = useState()

    
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
    const [paymentType, setpaymentType] = useState(1)
    const [cities, setcities] = useState()
    const [newaddresscheck, setnewaddresscheck] = useState(false)

    const notifyAddress = (rate) => toast.success(`Ünvan əlavə edildi!` , {draggable: true,});
    const notifyDelete = (rate) => toast.success(`Ünvan silindi!` , {draggable: true,});
    
    const [addressC, setaddressC] = useState("")
    const onChangeAddress = (e) => {
        setaddressC(e.target.value)
    }
    
    const onChangeNewAddressC = (e) => {
        if(newaddresscheck)
        {
            setnewaddresscheck(false)
            console.log(newaddresscheck)
            return 0 
        }
        setnewaddresscheck(true)
    }
    
    const [addressR, setaddressR] = useState([])
    const onChangeAddressR = (e) => {
        setaddressR(e.target.value)
        setaddressC("")
    }


    const clickHandler2 = (num) => {

        const today = new Date() 
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1);

        const deliveryday = new Date(tomorrow)      
        deliveryday.setDate(tomorrow.getDate() + ((parseInt(num) + 7 - tomorrow.getDay()) % 7));

        var newdeliveryday = moment(deliveryday).format( 'dddd, D MMMM');
        setdeliveryDay(newdeliveryday)
        
        var dateIds = []
        var nondateIds = []
        const dateChecker = (date , id) => {
            console.log(date);
            for (let i = 0; i < date.length; i++) {
                const today = new Date()
                const elementday = new Date()
                elementday.setDate(tomorrow.getDate() + (parseInt(date[i]) + 7 - tomorrow.getDay()) % 7);
                

                if(elementday.getDate()  < deliveryday.getDate() )
                {
                    dateIds.push(id)
                    nondateIds = nondateIds.filter(element => element !== id)
                    return 0 
                }
                else if(elementday.getDate()  > deliveryday.getDate() )
                {
                    nondateIds.push(id)
                }
                else 
                {
                    dateIds.push(id)
                    nondateIds = nondateIds.filter(element => element !== id)
                    return 0 
                }
            }
        }
        ProdutData.map(elements => dateChecker(elements.date , elements.id))     
        nondateIds = [...new Set(nondateIds)];   
        setdeliveryProducts(dateIds)
        setnondeliveryProducts(nondateIds)
    }
    
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }
    const [Error, setError] = useState(false)


    const onSubmit =  (values) => {
        setloader(true)
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
        var dates = []
        var WholeCost = 0
        var WholeWeight = 0
        var WholeCount = 0
        for (let i = 0; i < newarr.length; i++) {
            WholeCost += (parseInt(newarr[i].cost) * parseInt(newarr[i].count) )
            console.log(newarr[i].unitType);

            if (parseInt(newarr[i].unitType) === 4) {
                WholeWeight += (parseFloat(newarr[i].weight / 1000) * parseInt(newarr[i].count))
            }
            else 
            {
                WholeWeight += (parseFloat(newarr[i].weight) * parseInt(newarr[i].count))
            }

            WholeCount +=  parseInt(newarr[i].count)
            for (let j = 0; j < newarr[i]?.date?.length; j++) {
                dates.push(newarr[i]?.date[j])
            }
        }
       
        
       
        let uniqueDates = [...new Set(dates)];

        setFinalPrice(WholeCost)
        setFinalGoods(WholeCount)
        setProdutData(newarr)
        setFinalWeight(WholeWeight)

        localStorage.setItem('FinalWeight' ,WholeWeight)
        localStorage.setItem('FinalGoods' ,  WholeCount)
        localStorage.setItem('FinalPrice' , WholeCost)
        localStorage.setItem('DateGoods' , JSON.stringify(uniqueDates))
        localStorage.setItem('ProdutData' , JSON.stringify(newarr))

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
        var productsName = newarr2.map(element => element.name)
        var DeliveryDates = []
        var DeliveryCost = 0
        var DeliveryWeight = 0
        var DeliveryCount = 0
        for (let i = 0; i < newarr2.length; i++) {
            DeliveryCost += (parseInt(newarr2[i].cost) * parseInt(newarr2[i].count) )
            if (parseInt(newarr2[i].unitType) === 4) {
                DeliveryWeight += (parseFloat(newarr2[i].weight / 1000) * parseInt(newarr2[i].count))
            }
            else 
            {
                DeliveryWeight += (parseFloat(newarr2[i].weight) * parseInt(newarr2[i].count))
            }

            DeliveryCount +=  parseInt(newarr2[i].count)
            for (let j = 0; j < newarr2[i]?.date?.length; j++) {
                DeliveryDates.push(newarr2[i]?.date[j])
            }
        }

        setDateGoods(dates)
        axios.post('https://jsonplaceholder.typicode.com/posts', {address: addressC !== "" ? addressC : addressR , payment_type:paymentType , total_price: DeliveryCost ,  weight:DeliveryWeight  , total_count: DeliveryCount , product_data: productsName, user_id:props.UserId}  , headers )
         .then(res => (setloader(false) , console.log(res) , props.functionClose())) 

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
            .then(res => (setaddress(res.data) , setaddressR(res?.data[0]?.adres)))
        clickHandler2(DateGoods[0])
        axios.get('https://nehra.az/public/api/getcities')
            .then(resp => (setcities(resp.data) , setcity(resp.data[0].id) ))
            
    }, [])






moment.locale(sessionStorage.getItem('lang'))
//Date Problems
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    const monday = new Date(tomorrow)
    monday.setDate(tomorrow.getDate() + ((1 + 7 - tomorrow.getDay()) % 7));
    const tuesday = new Date(tomorrow)
    tuesday.setDate(tomorrow.getDate() + ((2 + 7 - tomorrow.getDay()) % 7));
    const wednesday = new Date(tomorrow)
    wednesday.setDate(tomorrow.getDate() + ((3 + 7 - tomorrow.getDay()) % 7));
    const thursday = new Date(tomorrow)
    thursday.setDate(tomorrow.getDate() + ((4 + 7 - tomorrow.getDay()) % 7));
    const friday = new Date(tomorrow)
    friday.setDate(tomorrow.getDate() + ((5 + 7 - tomorrow.getDay()) % 7));
    const saturday = new Date(tomorrow)
    saturday.setDate(tomorrow.getDate() + ((6 + 7 - tomorrow.getDay()) % 7));
    const sunday = new Date(tomorrow)
    sunday.setDate(tomorrow.getDate() + ((7 + 7 - tomorrow.getDay()) % 7));
    
    var newmonday = moment(monday).format( 'dddd, D MMMM');
    var newtuesday = moment(tuesday).format( 'dddd, D MMMM');
    var newwednesday = moment(wednesday).format( 'dddd, D MMMM');
    var newthursday = moment(thursday).format( 'dddd, D MMMM');
    var newfriday = moment(friday).format( 'dddd, D MMMM');
    var newsaturday = moment(saturday).format( 'dddd, D MMMM');
    var newsunday = moment(sunday).format( 'dddd, D MMMM');
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


    const [selectCity, setselectCity] = useState()
    const [rayon, setrayon] = useState()
    const onChange = (e) => {
        setaddress(e.target.value)
    }
    const onChangeCity = (e) => {
        setselectCity(e.target.value)
    }
    const onChangeRayon = (e) => {
        setrayon(e.target.value)
    }
    
    const createAddress = async () => {
        try {
            const resp = await axios.post('https://nehra.az/public/api/postaddress' , {
                user_id:JSON.parse(localStorage.getItem('LoginUserData')).id, 
                city_id:city, 
                rayon:rayon, 
                ev:ev, 
                blok:square, 
                mertebe:floor,
                menzil:menzil, 
                interkom:intercome, 
                qeyd:note
            })
            notifyAddress() 
            console.log(resp)
            setaddress(resp.data)
        } catch (error) {
            
        }
    }



    return (
        
        <div className="checkoutPage">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  method="POST">
                    <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                    
                    <div className="deliveryAddress">
                        <p className="title titleBB">{lang === "AZ" && `Çatdırılma ünvanı seçin` || lang === "EN" && `Select delivery Address` || lang === "RU" && `Выберите адрес доставки`}</p>
                        <div className="errors">
                            {address?.length > 0 && <select className='addressElement' name="" id="">{address?.map((address , index) => <option value="" > Ünvan - {address?.adres} |  Şəhər - {address?.city?.name} | Rayon - {address?.rayon}</option> )}</select>}
                            <div className='addAddressBtn'>
                                <button type='button' className='btn' onClick={() => setaddressAdd(true)}> <AddCircleIcon/> Yeni ünvan əlavə edin</button> {addressAdd &&<button type='button' onClick={() => setaddressAdd(false)} className='btn'>x</button>}</div>
                                {
                                    addressAdd &&
                                    <div className='addAddress'> 
                                        <div className='addAddressInputs'> 
                                            <select type="text"  value={city}       onChange={(e) => setcity(e.target.value)}> {(cities?.length > 0 && cities!==undefined) && cities?.map(element => <option value={element.id}>{element.name}</option>)}</select> 
                                            <input  type="text"  value={rayon}      onChange={onChangeRayon}  placeholder={(lang === "AZ" && `Rayon qeyd edin`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputRayon"/>
                                            <input  type="text"  value={ev}         onChange={(e) => setev(e.target.value)}  placeholder={(lang === "AZ" && `Ev`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputLittle"/>
                                            <input  type="text"  value={square}     onChange={(e) => setsquare(e.target.value)}  placeholder={(lang === "AZ" && `Block`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputLittle"/>
                                            <input  type="text"  value={floor}      onChange={(e) => setfloor(e.target.value)}  placeholder={(lang === "AZ" && `Mərtəbə`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputLittle"/>
                                            <input  type="text"  value={menzil}     onChange={(e) => setmenzil(e.target.value)}  placeholder={(lang === "AZ" && `Mənzil`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputLittle"/>
                                            <input  type="text"  value={intercome}  onChange={(e) => setintercome(e.target.value)}  placeholder={(lang === "AZ" && `intercome`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputLittle"/>
                                            <input  type="text"  value={note}       onChange={(e) => setnote(e.target.value)}  placeholder={(lang === "AZ" && `note`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputNote"/>
                                        </div>
                                        <div className="submitCont"><button onClick={createAddress} type="checkbox" className='submitBtn' type='button'>Əlavə et</button></div>
                                    </div>
                                }
                        </div>
                    </div>

                    <div className="datesCont">
                        <p className="title titleB">{lang === "AZ" && `Çatdırılma günü seçin` || lang === "EN" && `Select delivery day` || lang === "RU" && `Выберите день доставки`}</p>
                        <select className='selectdateDelivery' onChange={(e) => clickHandler2(e.target.value)} name="" id="">
                        {
                            DateGoods.map(
                            date=>
                            <>
                                    { 
                                        <option value={date} className="checkBoxDateCont">{(date === '1'  &&  newmonday) ||  (date === '2' && newtuesday) || (date === '3' && newwednesday) || (date === '4' && newthursday) || (date === '5' && newfriday) || (date === '6' && newsaturday) || (date === '7' && newsunday)}</option>
                                    }
                            </>)
                        }
                        </select>
                    </div>

                   {
                       newarr.length > 0 && 
                        <>
                        <p className="title1"> {deliveryDay} </p>
                        <p className="title2"> {lang === "AZ" && `Çatdırılma olunmayacaq məhsullar  ` || lang === "EN" && `Products that will not be delivered` || lang === "RU" && `Товары, которые не будут доставлены`}</p>
                        <div>
                            {newarr.map((element , index)=> <p className='nondeliveryItem'><EventBusyIcon/>   {element?.name}</p>)}
                        </div>
                        </>
                    }


                    <div className="typeOfPayment">
                        <p className="title titleB">{lang === "AZ" && `Ödəniş növü ` || lang === "EN" && `Type of payment` || lang === "RU" && `Тип платежа`}</p>
                        <select name=""  className='selectPayment' value={paymentType} onChange={(e) =>  setpaymentType(e.target.value)} id="">
                            <option value={1}>{lang === "AZ" && `Online` || lang === "EN" && `Online` || lang === "RU" && `В сети`}</option>
                            <option value={2}>{lang === "AZ" && `Balansdan` || lang === "EN" && `Balance` || lang === "RU" && `Остаток средств`}</option>
                            <option value={3}>{lang === "AZ" && `Qapıda Kartla` || lang === "EN" && `At door with card` || lang === "RU" && `У двери с картой`}</option>
                            <option value={4}>{lang === "AZ" && `Terminalla` || lang === "EN" && `with Terminal` || lang === "RU" && `с Терминалом`}</option>
                        </select>
                    </div>
                    <div className='btnCont btnContForLoader'>
                        <button type='submit' className="goToPayment" >{lang === "AZ" && `Təsdiqlə` || lang === "EN" && `Submit` || lang === "RU" && `Утвердить`}</button>
                        <div className="loaderCont">{ loader && <ReactLoading type={"bubbles"} color={"lightblue"} height={17} width={75} />}</div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default CheckoutPage

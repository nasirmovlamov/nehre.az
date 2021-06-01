import React,{useState , useContext} from 'react'
import "../assets/css/productModal.css"
import OurSlider from './OurSlider'
import StarSystem from './StarSystem'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button } from '@material-ui/core';
import Button1 from './Button1';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import avatar from "../assets/images/avatar.jpg"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Description from './Description';
import Certificates from './Certificates';
import Reviews from './Reviews';
import testImg6 from "../assets/images/testImg6.jpg"
import testImg7 from "../assets/images/testImg7.jpg"
import SupplierCard from './SupplierCard';
import { useEffect } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rating from '@material-ui/lab/Rating';
import Cookies from 'js-cookies'

function ProductModal(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    const notify = (rate) => toast.success(`${rate === null ? 5 : rate}   Ulduz göndərildi` , {draggable: true,});
    const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});
    const [Product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/product/${props.id}`)
            .then(res => setProduct(res.data))
            .catch(err=> console.log(err))
    } , [])
    
    const styleChanger = {
        border:"1px solid lightgray",
        borderBottom: "0px",
        color: "#3b3b3b",
        backgroundColor: " #fff",
    }
    const [checker, setchecker] = useState(1)
    const clickHandler = (num) => {
        setchecker(num)
    }

    const [value, setvalue] = useState(1)

    const clickValueHandler = (num) => {
        if(num===1)
        {
            setvalue(value--)
        }
        else if (num===3)
        {
            setvalue(value++)
        }
    }

    const imagescard = []
    Product?.shekil.map(element => imagescard.push( <img width='300px' height='auto' src={`https://nehra.az/storage/app/public/${element}`}/>))
    
    const discountHandler = (discount) => {
        if (discount !== 0 && discount !== null  && discount !== undefined) {
            var discountPrice = 0;
            discountPrice =  Math.round( ((Product?.qiymet - (Product?.qiymet * discount) / 100)) )
            return discountPrice;         
        } 
        else {
            return Product?.qiymet
        }
    }

    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }

    const selectItem = (num) => {
        const notify2 = (rate) => toast.success(`Seçilmişlərdən çıxarıldı` , {draggable: true,});
        const notify1 = (rate) => toast.success(`Seçilmişlərə Əlavə olundu` , {draggable: true,});
        if(JSON.parse(JSON.parse(localStorage.getItem('LoginUserData'))).id !== undefined)
        {  
            if(sessionStorage.getItem('SecilmishProduct') === null)
            {
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                var selecteds = []
                selecteds = [...selecteds , {id:num , ParcelWeight:props.ParcelWeight , setParcelWeight:props.setParcelWeight, NumberOfGoods:props.NumberOfGoods, setNumberOfGoods:props.setNumberOfGoods, setPaymentPrice:props.setPaymentPrice, PaymentPrice:props.PaymentPrice,  modalOpener3:props.modalOpener3, cardId:props.cardId, image:props.image,    title:props.title, desc:props.desc, price:props.qiymet, weight:props.price, discount:props.discount,  star:props.star}]
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                axios.post(`https://nehra.az/public/api/addstring/${props.userId}` , {string:JSON.stringify(selecteds)}).then(res => console.log(res))
                setSelectedsProduct(selecteds)
                notify1()
                return 0 
            }        
            else 
            {
                var selecteds = JSON.parse(sessionStorage.getItem('SecilmishProduct'))
            }

            var index = selecteds.findIndex(x=> x.id === num)
            console.log(index);
            if (index === -1) {
                selecteds = [...selecteds , {id:num , ParcelWeight:props.ParcelWeight , setParcelWeight:props.setParcelWeight, NumberOfGoods:props.NumberOfGoods, setNumberOfGoods:props.setNumberOfGoods, setPaymentPrice:props.setPaymentPrice, PaymentPrice:props.PaymentPrice,  modalOpener3:props.modalOpener3, cardId:props.cardId, image:props.image,    title:props.title, desc:props.desc, price:props.qiymet, weight:props.price, discount:props.discount,  star:props.star}]
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                axios.post(`https://nehra.az/public/api/addstring/` , {user_id: props.userId,  string:JSON.stringify(selecteds)}).then(res => console.log(res))
                setSelectedsProduct(selecteds)
                notify1()
            }
            else 
            {
                var newArr = selecteds.filter((item) => item.id !== num)
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(newArr))
                axios.post(`https://nehra.az/public/api/addstring/` , {user_id: props.userId , string:JSON.stringify(newArr)}).then(res => console.log(res))
                setSelectedsProduct(selecteds)
                notify2()
            }
        }
        else 
        {
            window.location.href = "/login"
        }
    }

    const [valueR, setvalueR] = useState(props.numberStar)
    const [sendStar, setsendStar] = useState(3)
    const [reviewAbout, setreviewAbout] = useState()
    const ratingHandler = (value) => {
        if (JSON.parse(localStorage.getItem('LoginUserData'))?.id === undefined || JSON.parse(localStorage.getItem('LoginUserData'))?.id === null) {
            notifyLogin()
        }
        else 
        {
            if(value===null)
            {
                value = props.numberStar
            }
            setsendStar(value)
            document.querySelector('.reviewSendCont').style.pointerEvents = 'all'
            document.querySelector('.reviewSendCont').style.opacity = '1'
        }
    }

    const sendReview = () => {
        axios.post('https://nehra.az/api/poststar', {id: props.id, star:reviewAbout} )
                .then(res => (res.status === 200 && (notify(sendStar))))
                .catch(err => console.log(err))
        document.querySelector('.reviewSendCont').style.pointerEvents = 'none'
        document.querySelector('.reviewSendCont').style.opacity = '0'
        
    }

    const cancelReviewSend = () => {
        document.querySelector('.reviewSendCont').style.pointerEvents = 'none'
        document.querySelector('.reviewSendCont').style.opacity = '0'
        console.log(document.querySelector('.reviewSendCont').style.pointerEvents );
        console.log(document.querySelector('.reviewSendCont').style.opacity);
    }

    return (

        <div className="productModal">
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <div className="sliderAndAbout">
                <div className="sliderCont">
                    {<OurSlider itemShow1={1} itemShow2={1} itemShow3={1} itemShow4={1} elements={imagescard} numOfSld={1}/>}
                </div>
                <div className="aboutCont">
                    <p className="titleItem">{Product?.title}</p>
                    <p className="supllierName">{Product?.seller_data.name}</p>
                    <div className="reviewCont">
                        <div className="starsAndReviews"><Rating value={valueR} onChange={(event , newValue) => ratingHandler(newValue)}/>  <div className="reviews">  {lang === "AZ" && `Şərh sayı - ` || lang === "EN" && `Reviews - ` || lang === "RU" && `Отзывы - `} {Product?.reviews?.length}</div>
                        <div className='reviewSendCont'><textarea value={reviewAbout} onChange={(e) => setreviewAbout(e.target.value)} type="text" placeholder='Fikrinizi bildirin'/>  <div className="buttonContReviewSend"><div className="rateCont"><Rating value={sendStar} onChange={(e , newvalue) => setsendStar(newvalue)} name="read-only"/> {sendStar} ulduz göndərilir </div>  <div className="Buttons"> <button onClick={()=>sendReview()} className='submit'>Göndər</button><button onClick={() => cancelReviewSend()} className='cancel'>Ləğv et</button></div></div> </div></div>
                        <button onClick={() => props.selectItem(props.id)} className="favorites">{props.indexSelected !== -1 ? <FavoriteIcon style={{fontSize:"25px",color:"red",}}/> : <FavoriteBorderIcon/>} </button> 
                    </div>
                    <p className="desc">
                        {Product?.description}
                    </p>
                    <p className="ingredients"><span className="ingredientsText">  {lang === "AZ" && `Tərkibi:` || lang === "EN" && `Ingredients:` || lang === "RU" && `Ингредиенты:`}</span> <span className="ingredientsFront"> {lang === "AZ" && Product?.terkibi_az || lang === "EN" && Product?.terkibi_en || lang === "RU" && Product?.terkibi_ru}</span>    </p>
                    <p className="priceCont"> <span className="priceText">  {lang === "AZ" && `Qiyməti:` || lang === "EN" && `Price:` || lang === "RU" && `Цена:`}</span>  <span className="price">{Product?.qiymet} {money} </span> - <span className="weight">{props.weight + " " + (parseInt(Product?.unit?.id) === 1 && `kq` || parseInt(Product?.unit?.id) === 4 && `gr` || parseInt(Product?.unit?.id) === 2 && `l`)}</span></p>
                    <div className="buttonsCont">
                        {
                            ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count && 
                            <div className="part1">
                                <button  value="1" onClick={() => removeItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm , Product?.unit?.id , Product?.delivery , Product?.title)} className="decBtn"  >{<RemoveIcon style={{fontSize:"20px"}}/>}</button>
                                <button   className="valueBtn">{Product?.id !== undefined ? (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count) : 0}</button>
                                <button  value="1" onClick={() => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm , Product?.unit?.id , Product?.delivery , Product?.title)}  className="incBtn">+</button>
                            </div>
                        }
                        <div className="part2"><Button1 value={lang === "AZ" && `Səbətə əlavə et` || lang === "EN" && `Add Basket` || lang === "RU" && `Добавить корзину`} color="#285999" function={ () => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm , Product?.unit?.id , Product?.delivery , Product?.title)}/></div>
                    </div>
                </div> 
            </div>

            <div className="part2Modal">
                
                
                    <div className="topLinks">
                        <div className="btnContForLinks">
                            <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}>{lang === "AZ" && `Haqqında` || lang === "EN" && `About` || lang === "RU" && `О`}</button>
                            <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}> {lang === "AZ" && `Şərh` || lang === "EN" && `Reviews` || lang === "RU" && `Отзывы`} </button>
                            <button className="button" style={checker ===3 ? styleChanger: null}  id="btnLink3" onClick={() => clickHandler(3)}> {lang === "AZ" && `Sertifikatlar` || lang === "EN" && `Certificates` || lang === "RU" && `Сертификаты`}</button>
                            <hr/>
                            <div className="linkComponent">
                                {checker === 1 ? <Description Product={Product} /> : "" }
                                {checker === 2 ? <Reviews Product={Product}/> : ""}
                                {checker === 3 ? <Certificates Product={Product}/> : ""}
                            </div>
                        </div>
                    </div>



            </div>




        </div>
    )
}

export default ProductModal

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

function ProductModal(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr] = useContext(ProductListingContext)
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

    const suppliersCard = []
    suppliersCard.push(  <SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>)
    
    const discountHandler = (discount) => {
        if (discount !== 0 && discount !== null  && discount !== undefined) {
            var discountPrice = 0;
            discountPrice = parseInt(ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost)
            return discountPrice;         
        } 
        else {
            return ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.cost
        }
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
                // document.getElementById(`${props.id}`).setAttribute('style' , 'color:red;')
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
                // document.getElementById(`${props.id}`).setAttribute('style' , 'color:red;')
                notify1()
            }
            else 
            {
                var newArr = selecteds.filter((item) => item.id !== num)
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(newArr))
                // document.getElementById(`${props.id}`).setAttribute('style' , 'color:white;')
                notify2()
            }
        }
        else 
        {
            window.location.href = "/login"
        }
    }

    const [valueR, setvalueR] = useState(props.numberStar)
    const ratingHandler = (value) => {
        if (JSON.parse(localStorage.getItem('LoginUserData')).id === undefined) {
            notifyLogin()
        }
        else 
        {
            if(value===null)
            {
                value = props.numberStar
            }
            axios.post('https://nehra.az/api/poststar', {id: props.id, star:value} )
                .then(res => (res.status === 200 && notify(value)))
                .catch(err => console.log(err))
        }
    }

    return (

        <div className="productModal">
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <div className="sliderAndAbout">
                <div className="sliderCont">
                    {<OurSlider itemShow1={1} itemShow2={1} itemShow3={1} itemShow4={1} elements={suppliersCard} numOfSld={1}/>}
                </div>
                <div className="aboutCont">
                    <p className="titleItem">{Product?.title}</p>
                    <p className="supllierName">{Product?.seller_data.name}</p>
                    <div className="reviewCont">
                        <div className="starsAndReviews"><Rating value={valueR} onChange={(event , newValue) => ratingHandler(newValue)}/> <div className="reviews">33 {lang === "AZ" && `Şərhlər` || lang === "EN" && `Reviews` || lang === "RU" && `Отзывы`}</div> </div>
                        <button onClick={() => props.selectItem(props.id)} className="favorites">{props.indexSelected !== -1 ? <FavoriteIcon style={{fontSize:"25px",color:"red",}}/> : <FavoriteBorderIcon/>} </button> 
                    </div>
                    <p className="desc">
                        {Product?.description}
                    </p>
                    <p className="ingredients"><span className="ingredientsText"> Tərkibi:</span> <span className="ingredientsFront">{Product?.terkibi}</span>    </p>
                    <p className="priceCont"> <span className="priceText">Qiyməti:</span>  <span className="price">{Product?.qiymet}</span> - <span className="weight">{Product?.ceki_hecm}</span></p>
                    <div className="buttonsCont">
                        {
                            ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count && 
                            <div className="part1">
                                <button  value="1" onClick={() => removeItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)} className="decBtn"  >{<RemoveIcon style={{fontSize:"20px"}}/>}</button>
                                <button   className="valueBtn">{Product?.id !== undefined && Product?.id !== null  && Product?.id !== ""  ? (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count) : 0}</button>
                                <button  value="1" onClick={() => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)}  className="incBtn">+</button>
                            </div>
                        }
                        <div className="part2"><Button1 value={lang === "AZ" && `Səbətə əlavə et` || lang === "EN" && `Add Basket` || lang === "RU" && `Добавить корзину`} color="#285999" function={ () => addItem(Product?.id , discountHandler(Product?.discount) , Product?.ceki_hecm)}/></div>
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

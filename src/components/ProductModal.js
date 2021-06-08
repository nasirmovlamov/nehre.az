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
import defP from '../assets/images/defP.png'
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';
import { withStyles } from '@material-ui/core/styles';

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
import { image } from '@tensorflow/tfjs';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress';


function ProductModal(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin] = useContext(ProductListingContext)
    const notify = (rate) => toast.success(`${rate === null ? 5 : rate}   Ulduz göndərildi` , {draggable: true,});
    const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});
    const [Product, setProduct] = useState([])
    const [imagescard, setimagesCard] = useState([])
    const [checker, setchecker] = useState(1)
    const [value, setvalue] = useState(1)
    const token = Cookies.getItem('XSRF-TOKEN')
    const [ProductSimilar, setProductSimilar] = useState([])
    
    
    
    const styleChanger = {
        border:"1px solid lightgray",
        borderBottom: "0px",
        color: "#3b3b3b",
        backgroundColor: " #fff",
    }
    
   
    const clickHandler = (num) => {
        setchecker(num)
    }
    
    const [valueReq, setvalueReq] = useState(0)
    
    const getProducts = async() => {
        const resp =  await axios.get(`https://nehra.az/public/api/product/${props.id}`)
        setProduct(resp.data)
        setvalueReq(25)
        var images = []
        resp.data.shekil.map(element => images.push(<img width='350px' height='auto' src={`https://nehra.az/storage/app/public/${element}`}/>))
        setimagesCard(images)
        setvalueReq(65)
        const resp1 = await axios.get(`https://nehra.az/public/api/getsimillars/${resp?.data?.category_data?.id}`)
        setProductSimilar(resp1.data) 
        setvalueReq(100)
    }
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

    const headers = {
        "X-CSRF-TOKEN":token
    }

    

    
    
    //#region  Rating
    const [valueR, setvalueR] = useState(props.numberStar)
    const [sendStar, setsendStar] = useState(3)
    const [reviewAbout, setreviewAbout] = useState()
    const ratingHandler = (value) => {
        if (JSON.parse(localStorage.getItem('LoginUserData'))?.id === undefined || JSON.parse(localStorage.getItem('LoginUserData'))?.id === null) {
            notifyLogin()
            OpenLoginF()
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

    const sendReview = async () => {
        const resp = axios.post('https://nehra.az/api/poststar', {id: props.id, star:reviewAbout} )
        if(resp.status === 200 )
        {
            notify(sendStar)
        }
        document.querySelector('.reviewSendCont').style.pointerEvents = 'none'
        document.querySelector('.reviewSendCont').style.opacity = '0'
        
    }

    const cancelReviewSend = () => {
        document.querySelector('.reviewSendCont').style.pointerEvents = 'none'
        document.querySelector('.reviewSendCont').style.opacity = '0'
        console.log(document.querySelector('.reviewSendCont').style.pointerEvents );
        console.log(document.querySelector('.reviewSendCont').style.opacity);
    }
    //#endregion

    //#region ToolTip
    const DarkTT = withStyles((theme) => ({
        arrow: {
            color: theme.palette.common.black,
          },
        tooltip: {
          backgroundColor: "black",
          color: 'white',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }))(Tooltip);

    moment.locale(sessionStorage.getItem('lang'))

    //Date //Date //Date
    const today = new Date()
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
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
    //#endregion
    
    useEffect(() => {
        getProducts()
    } , [])

    return (

        <div className="productModal">
            {valueReq < 100 && <div className="progress"><CircularProgress variant="determinate" value={valueReq} /></div>}
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <div className="sliderAndAbout">
                <div className="sliderCont">
                    {imagescard.length > 0 && <OurSlider itemShow1={1} itemShow2={1} itemShow3={1} itemShow4={1} elements={imagescard} numOfSld={1}/>}
                    {imagescard.length === 0 && <img src={defP} width='350' height='auto' alt="" />}
                    <div className="dates">
                        {props.delivery?.map(delivery =>
                                <>
                                    {
                                        delivery === "1" &&
                                        <DarkTT title={`${newmonday}   `} placement="top" arrow>
                                            <div className="date">Be</div>
                                        </DarkTT>
                                    }
                                    {
                                        delivery === "2" &&
                                        <DarkTT title={`${newtuesday}   `}  placement="top" arrow>
                                            <div className="date">Ça</div>
                                        </DarkTT>
                                    }
                                    {
                                        delivery === "3" &&
                                        <DarkTT title={`${newwednesday}   `} placement="top" arrow>
                                            <div className="date">Ç</div>
                                        </DarkTT>
                                    }
                                    {
                                        delivery === "4" &&
                                        <DarkTT title={`${newthursday}   `} placement="top" arrow>
                                            <div className="date">Ca</div>
                                        </DarkTT>
                                    }
                                    {
                                        delivery === "5" &&
                                        <DarkTT title={`${newfriday}   `} placement="top" arrow>
                                            <div className="date">C</div>
                                        </DarkTT>
                                    }
                                    {
                                        delivery === "6" &&
                                        <DarkTT title={`${newsaturday}   `} placement="top" arrow>
                                            <div className="date">Ş</div>
                                        </DarkTT>
                                    }
                                    {
                                        delivery === "7" &&
                                        <DarkTT title={`${newsunday}   `} placement="top" arrow>
                                            <div className="date">B</div>
                                        </DarkTT>
                                    }
                                </>
                            )}
                    </div>
                </div>
                <div className="aboutCont">
                    <p className="titleItem">{Product?.title}</p>
                    <div className="reviewCont">
                        <div className="starsAndReviews"><Rating value={valueR} onChange={(event , newValue) => ratingHandler(newValue)}/>  <div className="reviews">  {lang === "AZ" && `Şərh sayı - ` || lang === "EN" && `Reviews - ` || lang === "RU" && `Отзывы - `} {Product?.reviews?.length}</div>
                        <div className='reviewSendCont'><textarea value={reviewAbout} onChange={(e) => setreviewAbout(e.target.value)} type="text" placeholder='Fikrinizi bildirin'/>  <div className="buttonContReviewSend"><div className="rateCont"><Rating value={sendStar} onChange={(e , newvalue) => setsendStar(newvalue)} name="read-only"/> {sendStar} ulduz göndərilir </div>  <div className="Buttons"> <button onClick={()=>sendReview()} className='submit'>Göndər</button><button onClick={() => cancelReviewSend()} className='cancel'>Ləğv et</button></div></div> </div></div>
                        <button onClick={() => props.selectItem(props.id)} className="favorites">{SelectedsProduct.findIndex(x=> x.id === props.id) === -1 ? <StarBorderIcon/> :  <StarIcon/>}</button> 
                    </div>
                    <p className="desc">
                        {Product?.description}
                    </p>
                    <p className="ingredients"><span className="ingredientsText">  {lang === "AZ" && `Tərkibi:` || lang === "EN" && `Ingredients:` || lang === "RU" && `Ингредиенты:`}</span> <span className="ingredientsFront"> {lang === "AZ" && Product?.terkibi_az || lang === "EN" && Product?.terkibi_en || lang === "RU" && Product?.terkibi_ru}</span>    </p>
                    <p className="priceCont"> <span className="priceText">  {lang === "AZ" && `Qiyməti:` || lang === "EN" && `Price:` || lang === "RU" && `Цена:`}</span>  <span className="price">{money === "₼" ? Product?.qiymet : (Product?.qiymet  / 1.7).toFixed(2)} {money} </span> - <span className="weight">{props.weight + " " + (parseInt(Product?.unit?.id) === 1 && `kq` || parseInt(Product?.unit?.id) === 4 && `gr` || parseInt(Product?.unit?.id) === 2 && `l`)}</span></p>
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
                            <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}> {lang === "AZ" && `Haqqında` || lang === "EN" && `About` || lang === "RU" && `О`}                       </button>
                            <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}> {lang === "AZ" && `Şərh` || lang === "EN" && `Reviews` || lang === "RU" && `Отзывы`}                    </button>
                            <button className="button" style={checker ===3 ? styleChanger: null}   id="btnLink3" onClick={() => clickHandler(3)}> {lang === "AZ" && `Sertifikatlar` || lang === "EN" && `Certificates` || lang === "RU" && `Сертификаты`} </button>
                            <hr/>
                            <div className="linkComponent">
                                {checker === 1 ? <Description ProductSimilar={ProductSimilar}  Product={Product !== [] && Product}/> : "" }
                                {checker === 2 ? <Reviews  id={props.id}/> : ""}
                                {checker === 3 ? <Certificates Product={Product}/> : ""}
                            </div>
                        </div>
                    </div>



            </div>




        </div>
    )
}

export default ProductModal

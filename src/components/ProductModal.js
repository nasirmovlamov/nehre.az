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
import DateCropLang from './DateCropLang';

function ProductModal(props) {

    //#region VALUES 
        const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId] = useContext(ProductListingContext)
        const notify = (rate) => toast.success(`${rate === null ? 5 : rate}   Ulduz göndərildi` , {draggable: true,});
        const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});
        const [Product, setProduct] = useState([])
        const [imagescard, setimagesCard] = useState([])
        const [checker, setchecker] = useState(1)
        const [value, setvalue] = useState(1)
        const token = Cookies.getItem('XSRF-TOKEN')
        const [ProductSimilar, setProductSimilar] = useState([])
        const [UserData, setUserData] = useState(0)
        useEffect(() => {
            if (UserData?.id === undefined) {
                setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
            }
        })
    //#endregion VALUES 
    
    // #region CSSSTYLE
        const styleChanger = {
            border:"1px solid lightgray",
            borderBottom: "0px",
            color: "#3b3b3b",
            backgroundColor: " #fff",
        }
    // #endregion CSSSTYLE
    
    //#region Get DATA
        const clickHandler = (num) => {
            setchecker(num)
        }
        
        const [valueReq, setvalueReq] = useState(0)
        
        const getProducts = async(id) => {
            const resp =  await axios.get(`https://nehra.az/public/api/product/${id}`)
            setProduct(resp.data)
            setvalueReq(25)
            var images = []
            images.push(<img width='350px' height='auto' src={`https://nehra.az/storage/app/public/${resp.data.thumb}`}/>)
            resp.data.shekil.map(element => images.push(<img width='350px' height='auto' src={`https://nehra.az/storage/app/public/${element}`}/>))
            setimagesCard(images)
            setvalueReq(65)
            setvalueR(resp.data.starsall)
            setvalueReq(75)
            const resp1 = await axios.get(`https://nehra.az/public/api/getsimillars/${resp?.data?.category_data?.id}`)
            setvalueReq(99)
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
        
        useEffect(() => {
            setvalueReq(0)
            getProducts(modalId)
            console.log("YES")
        } , [modalId])
    //#endregion Get DATA
    
    //#region  Rating
    const [valueR, setvalueR] = useState(Product?.starsall)
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
                value = valueR
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
    
    // #region SelectITEM
    const [indexSelected, setindexSelected] = useState(JSON.parse(sessionStorage.getItem('SecilmishProduct'))?.findIndex(x=> x.id === props.cardId) !== undefined ? JSON.parse(sessionStorage.getItem('SecilmishProduct'))?.findIndex(x=> x.id === props.cardId) : -1)
    
    useEffect(() => {
        if (sessionStorage.getItem('SecilmishProduct') !== null) {
            var selecteds = SelectedsProduct
            setindexSelected(selecteds?.findIndex(x=> x.id === props.cardItem))
        }
    }, [SelectedsProduct])
    // #endregion SelectITEM

    const selectItem = (num) => {
        const notify2 = (rate) => toast.success(`Seçilmişlərdən çıxarıldı` , {draggable: true,autoClose: 1000});
        const notify1 = (rate) => toast.success(`Seçilmişlərə Əlavə olundu` , {draggable: true,autoClose: 1000});
        if(UserData?.id !== undefined)
        {  
            if(sessionStorage.getItem('SecilmishProduct') === null)
            {
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                var selecteds = []  
                selecteds = [...selecteds , {id:Product.id , delivery: Product.delivery,    thumb:Product.thumb,  title:Product.title, desc:Product.seller_data.name,  unitType:Product?.unit.id,  qiymet:Product?.qiymet , ceki_hecm:Product?.ceki_hecm , discount:Product?.discount,  starsall:Product.starsall}]
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                setSelectedsProduct(selecteds)
                axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData?.id , string:JSON.stringify(selecteds)} , headers)
                notify1()
                return 0 
            }        
            else 
            {
                var selecteds = JSON.parse(sessionStorage.getItem('SecilmishProduct'))
            }
            var index = selecteds.findIndex(x=> x.id === num)
            if (index === -1) {
                selecteds = [...selecteds , {id:Product.id , delivery: Product.delivery,    thumb:Product.thumb,  title:Product.title, desc:Product.seller_data.name,  unitType:Product?.unit.id,  qiymet:Product?.qiymet , ceki_hecm:Product?.ceki_hecm , discount:Product?.discount,  starsall:Product.starsall}]
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                setSelectedsProduct(selecteds)
                console.log(selecteds)
                axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData?.id , string:JSON.stringify(selecteds)} , headers)
                setindexSelected(1)
                notify1()

            }
            else 
            {
                var newArr = selecteds.filter((item) => item.id !== num)
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(newArr))
                setSelectedsProduct(newArr)
                axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData?.id , string:JSON.stringify(newArr)}  , headers)
                setindexSelected(-1)
                notify2()
            }
        }
        else 
        {
            notifyLogin()
            OpenLoginF()
        }
    }
    

    return (

        <div className='modalCont'>
            <div className="productModal">
                {valueReq < 100 ? <div className="progress"><CircularProgress variant="determinate" value={valueReq} /></div> : 
                <>
                <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                <div className="sliderAndAbout">
                    <div className="sliderCont">
                        {imagescard.length > 0 && <OurSlider itemShow1={1} itemShow2={1} itemShow3={1} itemShow4={1} elements={imagescard} numOfSld={1}/>}
                        <div className="dates">
                            {Product?.delivery?.map(delivery =>
                                    <>
                                        {
                                            <DarkTT title={`${
                                                            (delivery === "1" && newmonday) ||  
                                                            (delivery === "2" && newtuesday) ||  
                                                            (delivery === "3" && newwednesday) || 
                                                            (delivery === "4" && newthursday) || 
                                                            (delivery === "5" && newfriday) || 
                                                            (delivery === "6" && newsaturday) ||
                                                            (delivery === "7" && newsunday)}`} placement="top" arrow>
                                                <div className="date"><DateCropLang day={delivery} /></div>
                                            </DarkTT>
                                        }
                                    </>
                                )}
                        </div>
                    </div>
                    <div className="aboutCont">
                        <p className="titleItem">{lang === "AZ" && Product?.title_az || lang === "EN" && Product?.title_en || lang === "RU" && Product?.title_ru}</p>
                        <div className="reviewCont">
                            <div className="starsAndReviews"><Rating value={valueR} onChange={(event , newValue) => ratingHandler(newValue)}/>  <div className="reviews">  {lang === "AZ" && `Şərh sayı - ` || lang === "EN" && `Reviews - ` || lang === "RU" && `Отзывы - `} {Product?.reviews?.length}</div>
                            <div className='reviewSendCont'><textarea value={reviewAbout} onChange={(e) => setreviewAbout(e.target.value)} type="text" placeholder='Fikrinizi bildirin'/>  <div className="buttonContReviewSend"><div className="rateCont"><Rating value={sendStar} onChange={(e , newvalue) => setsendStar(newvalue)} name="read-only"/> {sendStar} ulduz göndərilir </div>  <div className="Buttons"> <button onClick={()=>sendReview()} className='submit'>Göndər</button><button onClick={() => cancelReviewSend()} className='cancel'>Ləğv et</button></div></div> </div></div>
                            <button onClick={() => selectItem(props.id)} className="favorites">{SelectedsProduct.findIndex(x=> x.id === props.id) === -1 ? <FavoriteBorderIcon/> :  <FavoriteIcon/>}</button> 
                        </div>
                        <p className="desc">
                            {lang === "AZ" && Product?.description_az || lang === "EN" && Product?.description_en || lang === "RU" && Product?.description_ru}
                        </p>
                        <p className="ingredients"><span className="ingredientsText">  {lang === "AZ" && `Tərkibi:` || lang === "EN" && `Ingredients:` || lang === "RU" && `Ингредиенты:`}</span> <span className="ingredientsFront"> {lang === "AZ" && Product?.terkibi || lang === "EN" && Product?.terkibi_en || lang === "RU" && Product?.terkibi_ru}</span>    </p>
                        <p className="priceCont"> <span className="priceText">  {lang === "AZ" && `Qiyməti:` || lang === "EN" && `Price:` || lang === "RU" && `Цена:`}</span>  <span className="price">{money === "₼" ? Product?.qiymet : (Product?.qiymet  / 1.7).toFixed(2)} {money} </span> - <span className="weight">{Product?.ceki_hecm + " " + (parseInt(Product?.unit?.id) === 1 && `kq` || parseInt(Product?.unit?.id) === 4 && `gr` || parseInt(Product?.unit?.id) === 2 && `l`)}</span></p>
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
                                    {checker === 2 ? <Reviews  id={props.id} product={true}/> : ""}
                                    {checker === 3 ? <Certificates Product={Product}/> : ""}
                                </div>
                            </div>
                        </div>
                </div>
                
            </>}
            </div>
        </div>
    )
}

export default ProductModal

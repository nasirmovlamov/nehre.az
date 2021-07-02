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
import DateSelect from './DateMoment';

function ProductModal(props) {

    //#region VALUES 
        const context = useContext(ProductListingContext)
        const [Product, setProduct] = useState([])
        const [imagescard, setimagesCard] = useState([])
        const [checker, setchecker] = useState(1)
        const [value, setvalue] = useState(1)
        const token = Cookies.getItem('XSRF-TOKEN')
        const [ProductSimilar, setProductSimilar] = useState([])
        const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem, UserData} = context
      
        const notify = (rate) => toast.success(`${rate === null ? 5 : rate}   Ulduz göndərildi` , {draggable: true,});
        const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});
        
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
            const resp1 = await axios.get(`https://nehra.az/public/api/getsimillars/${id}/${resp?.data?.category_data?.id}`)
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

        const headers = {
            "X-CSRF-TOKEN":token
        }
        
        useEffect(() => {
            setvalueReq(0)
            getProducts(modalId)
        } , [modalId])
    //#endregion Get DATA
    
    //#region  Rating
    const [valueR, setvalueR] = useState(Product?.starsall)
    const [sendStar, setsendStar] = useState(3)
    const [reviewAbout, setreviewAbout] = useState()
    const ratingHandler = (value) => {
        if (UserData === undefined || UserData === null) {
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
        const resp = await axios.post('https://nehra.az/api/postreview', {post_id: parseInt(props.id), star_count:parseInt(sendStar), user_id: parseInt(JSON.parse(localStorage.getItem('LoginUserData')).id) , review:reviewAbout} )
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
    //#endregion ToolTip

    
    
    // #region SelectITEM
    // const [indexSelected, setindexSelected] = useState(JSON.parse(sessionStorage.getItem('SecilmishProduct'))?.findIndex(x=> x.id === props.cardId) !== undefined ? JSON.parse(sessionStorage.getItem('SecilmishProduct'))?.findIndex(x=> x.id === props.cardId) : -1)
    
    // useEffect(() => {
    //     if (sessionStorage.getItem('SecilmishProduct') !== null) {
    //         var selecteds = SelectedsProduct
    //         setindexSelected(selecteds?.findIndex(x=> x.id === props.cardItem))
    //     }
    // }, [SelectedsProduct])
    // #endregion SelectITEM

    
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
                            {Product.delivery?.map(delivery =>
                                <>
                                    {
                                        <DarkTT title={`${DateSelect(delivery)}`} placement="top" arrow>
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
                            <div className="starsAndReviews"><Rating value={valueR} onChange={(event , newValue) => ratingHandler(newValue)}/>  <div className="reviews">  {(lang === "AZ" && `Şərh sayı - `) || (lang === "EN" && `Reviews - `) || (lang === "RU" && `Отзывы - `)} {Product?.reviews?.length}</div>
                            <div className='reviewSendCont'><textarea value={reviewAbout} onChange={(e) => setreviewAbout(e.target.value)} type="text" placeholder={(lang === "AZ" && `Fikrinizi bildirin`) || (lang === "EN" && `Let us know what you think`) || (lang === "RU" && `Поделитесь с нами вашими мыслями`)}/>  <div className="buttonContReviewSend"><div className="rateCont"><Rating value={sendStar} onChange={(e , newvalue) => setsendStar(newvalue)} name="read-only"/> {sendStar} {(lang === "AZ" && `Ulduz göndərilir`) || (lang === "EN" && `Star is sending`) || (lang === "RU" && `Звезда отправляет`)} </div>  <div className="Buttons"> <button onClick={()=>sendReview()} className='submit'>{(lang === "AZ" && `Göndər`) || (lang === "EN" && `Send`) || (lang === "RU" && `Отправить`)}</button><button onClick={() => cancelReviewSend()} className='cancel'>{(lang === "AZ" && `Ləğv et `) || (lang === "EN" && `Cancel`) || (lang === "RU" && `Отмена`)}</button></div></div> </div></div>
                            <button onClick={() => selectItem(props.id)} className="favorites">{SelectedsProduct.findIndex(x=> x.id === props.id) === -1 ? <FavoriteBorderIcon/> :  <FavoriteIcon/>}</button> 
                        </div>
                        <p className="desc">
                            {(lang === "AZ" && Product?.description_az) || (lang === "EN" && Product?.description_en) || (lang === "RU" && Product?.description_ru)}
                        </p>
                        <p className="ingredients">
                            { (lang === "AZ" && Product?.terkibi     !== null && Product?.terkibi  !== undefined)    && <> <span className="ingredientsText">{( `Tərkibi`)}   :</span> <span className="ingredientsFront">  {(lang === "AZ" && Product?.terkibi )}    </span></>}
                            { (lang === "EN" && Product?.terkibi_en  !== null && Product?.terkibi_en  !== undefined) && <> <span className="ingredientsText">{(`Ingredients`)}:</span> <span className="ingredientsFront">  {(lang === "EN" && Product?.terkibi_en)}  </span></>}
                            { (lang === "RU" && Product?.terkibi_ru  !== null && Product?.terkibi_ru  !== undefined) && <> <span className="ingredientsText">{(`Ингредиенты`)}:</span> <span className="ingredientsFront">  {(lang === "RU" && Product?.terkibi_ru)}  </span></>}
                        </p>
                        <p className="priceCont"> <span className="priceText">  {(lang === "AZ" && `Qiyməti:`) || (lang === "EN" && `Price:`) || (lang === "RU" && `Цена:`)}</span>  <span className="price">{money === "₼" ? Product?.qiymet : (Product?.qiymet  / 1.7).toFixed(2)} {money} </span> - <span className="weight">{((Product.unit.id === 2 || Product.unit.id === 4 || Product.unit.id === 1) ? Product?.ceki_hecm : 1 ) + " " + ((lang === "AZ" && Product?.unit.ad) || (lang === "EN" && Product?.unit.ad_en) || (lang === "RU" && Product?.unit.ad_ru))}  </span></p>
                        <div className="buttonsCont">
                            {
                                ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count && 
                                <div className="part1">
                                    <button  value="1" onClick={() => removeItem(Product)} className="decBtn"  >{<RemoveIcon style={{fontSize:"20px"}}/>}</button>
                                    <button   className="valueBtn">{Product?.id !== undefined ? (ProdutData[ProdutData.findIndex(x=> x.id === Product?.id)]?.count) : 0}</button>
                                    <button  value="1" onClick={() => addItem(Product)}  className="incBtn">+</button>
                                </div>
                            }
                            <div className="part2"><Button1 value={(lang === "AZ" && `Səbətə əlavə et`) || (lang === "EN" && `Add Basket`) || (lang === "RU" && `Добавить корзину`)} color="#285999" function={ () => addItem(Product)}/></div>
                        </div>
                    </div> 
                </div>

                <div className="part2Modal">
                    
                    
                        <div className="topLinks">
                            <div className="btnContForLinks">
                                <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}> {(lang === "AZ" && `Haqqında`) || (lang === "EN" && `About`) || (lang === "RU" && `О продукте`)}                       </button>
                                <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}> {(lang === "AZ" && `Şərh`) || (lang === "EN" && `Reviews`) || (lang === "RU" && `Отзывы`)}                    </button>
                                <button className="button" style={checker ===3 ? styleChanger: null}   id="btnLink3" onClick={() => clickHandler(3)}> {(lang === "AZ" && `Sertifikatlar`) || (lang === "EN" && `Certificates`) || (lang === "RU" && `Сертификаты`)} </button>
                                <hr/>
                                <div className="linkComponent">
                                    {checker === 1 ? <Description ProductSimilar={ProductSimilar}  Product={ Product}/> : "" }
                                    {checker === 2 ? <Reviews  post_id={Product.id} product={true}/> : ""}
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

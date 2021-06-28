import React, {useEffect, useState, useContext} from 'react'
import "../assets/css/itemCard.css"
import BuyButton from './BuyButton'
import StarSystem from './StarSystem'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import ProductModal from './ProductModal';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import axios from 'axios';
import Skeleton from '@material-ui/lab/Skeleton';
import {ProductListingContext} from '../components/ProductListingProvider'
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';
import defP from '../assets/images/defP.png'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookies'
import DateCropLang from './DateCropLang';

function ItemCard(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus] = useContext(ProductListingContext)
    
    const [UserData, setUserData] = useState(0)
    const {product}  = props
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    })

    const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});

    
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
      });
    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const [checker, setchecker] = useState(false)

    const imgHandler = {
        backgroundImage: props.image !== undefined  && props.image !== null ? `url('https://nehra.az/storage/app/public/${props.image}')` : defP,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    
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
    const colorChang = {
        color: 'red'
    }
    
    const discountHandler = (discount) => {
        if (discount !== 0 && discount !== null) {
            var discountPrice = 0;
            discountPrice =  Math.round( ((props.price - (props.price * discount) / 100)) )
            return Math.floor(discountPrice);         
        } 
        else {
            return Math.floor(props.price)
        }
    }

    const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },}));
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    

   





    moment.locale(sessionStorage.getItem('lang'))
    //#region date
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
    
    //Select ITEM  //Select ITEM
    const [indexSelected, setindexSelected] = useState(JSON.parse(sessionStorage.getItem('SecilmishProduct'))?.findIndex(x=> x.id === props.cardId) !== undefined ? JSON.parse(sessionStorage.getItem('SecilmishProduct'))?.findIndex(x=> x.id === props.cardId) : -1)
    
    useEffect(() => {
        if (sessionStorage.getItem('SecilmishProduct') !== null) {
            var selecteds = SelectedsProduct
            setindexSelected(selecteds?.findIndex(x=> x.id === props.cardItem))
        }
    }, [SelectedsProduct])

    //Select ITEM  //Select ITEM
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }

    const selectItem = (num) => {
        const notify2 = (rate) => toast.success(`Seçilmişlərdən çıxarıldı` , {draggable: true,autoClose: 1000});
        const notify1 = (rate) => toast.success(`Seçilmişlərə Əlavə olundu` , {draggable: true,autoClose: 1000});
        if(UserData?.id !== undefined)
        {  
            if(sessionStorage.getItem('SecilmishProduct') === null)
            {
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                var selecteds = []  
                selecteds = [...selecteds , {id:props.cardId , delivery: product.delivery,    thumb:props.image,  title:props.title, desc:props?.desc,  unitType:props.unitType,  qiymet:props.price , ceki_hecm:props.weight , discount:props.discount, productModal:props?.productModal, starsall:props.star, bonus:props.bonus}]
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
                selecteds = [...selecteds , {id:props.cardId , delivery: product.delivery,    thumb:props.image,  title:props.title, desc:props?.desc,  unitType:props.unitType,  qiymet:props.price , ceki_hecm:props.weight , discount:props.discount, productModal:props?.productModal, starsall:props.star, bonus:props.bonus}]
                sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
                setSelectedsProduct(selecteds)
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
        <div key={props.cardId} className="itemCard">
            <button  type="button"  className="imgCont" style={imgHandler}>
                <div className="valueAndBtn"> 
                    {ProdutData[ProdutData?.findIndex(x=> x.id === props.cardId)]?.count > 0 && <div className='valueBtn'>{ProdutData[ProdutData.findIndex(x=> x.id === props.cardId)]?.count}</div>}
                    <div className="iconAndBtn"> <button onClick={() => selectItem(props.cardId)} className="favIco"> {SelectedsProduct.findIndex(x=> x.id === props.cardId) === -1 ? <StarBorderIcon/> :  <StarIcon/>}</button></div>
                </div>

                <div className="overlayImg">
                    <div className='overlayBtn'>
                        {ProdutData[ProdutData.findIndex(x=> x.id === props.cardId)]?.count > 0 && <button onClick={() => removeItem(props.product)}>-</button> }
                        <button  type="button" onClick={() => modalIdsetter(props.cardId)}>{<ZoomInIcon style={{ color: "white", fontSize:"55px" }}/>}</button>
                        {ProdutData[ProdutData.findIndex(x=> x.id === props.cardId)]?.count > 0 && <button onClick={() => addItem(props.cardId , discountHandler(props.discount) , props.weight , props.unitType , props.delivery , props.title , props.bonus)}>+</button>}
                    </div>
                </div>

                <div className="dates">
                        {props.delivery?.map(delivery =>
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
            </button>

            <p className="titleItem">{props.title}</p>
            <p className="subTitleItem">  {(lang === "EN" && `from`) || (lang === "RU" && `из`)} {props.desc} {lang === "AZ" && `tərəfindən` }</p>
            <div className="textCont">
                <div className="starAndAbout">
                    <p className="dscPrc">{(props.discount !== 0 && props.discount !== null) && (<span className="priceStriked"><span className="priceUnderStrike">{money === "₼" ? (props.price) : (props.price / 1.7).toFixed(1)} {money}</span></span>)}</p>
                    <p className="priceAndWeightItem"><span className="element1"  style={props.discount && colorChang}>{money === "₼" ? discountHandler(props.discount) : (discountHandler(props.discount) / 1.7).toFixed(1)}  {money}</span> / <span className="element2">{((props.unitId === 2 || props.unitId === 4 || props.unitId === 1) ? props.weight : 1 ) + " " + (props.unitAd)}</span> </p>
                    <StarSystem numberStar={props.star}/>
                </div>   
                {!props.btnDisable && <BuyButton functionAdd={() => addItem(props.product)}  orders={props.orders} cardPrice={discountHandler(props.discount)} modalOpener3={props.modalOpener3} cardId={props.cardId}/>}
            </div>

           
        </div>
    )
}

export default ItemCard

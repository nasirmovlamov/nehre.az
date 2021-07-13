import React, {useEffect, useState, useContext} from 'react'
import "../assets/css/itemCard.css"
import BuyButton from './BuyButton'
import StarSystem from './StarSystem'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
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
import Skeleton from '@material-ui/core/Skeleton';
import {ProductListingContext} from '../components/ProductListingProvider'
import defP from '../assets/images/defP.png'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookies'
import DateCropLang from './DateCropLang';
import DateSelect from './DateMoment'
import Rating from '@material-ui/core/Rating';


function ItemCard(props) {
    const {product} = props 
    const context = useContext(ProductListingContext)
    const {SelectedsProduct,currency,UserStatus, ProdutData, addItem,modalIdsetter,removeItem,lang,money, discountHandler, UserData , setSelectedsProduct, OpenLoginF} = context
    const [valueR, setvalueR] = useState()
    const notifyLogin = () => toast.warning((lang === "AZ" && `Hesabınıza daxil olun!` || lang === "EN" && `Log in to your account!` || lang === "RU" && `Войдите в свою учетную запись!`) , {draggable: true,});
    


    //#region trash 
    // const [state, setState] = React.useState({
    //     checkedA: true,
    //     checkedB: true,
    //     checkedF: true,
    //     checkedG: true,
    //   });
    // const [checker, setchecker] = useState(false)
    // const handleChange = (event) => {
    //     setState({ ...state, [event.target.name]: event.target.checked });
    // };
    //#endregion trash 
    
    //#region style
    const imgHandler = {
        backgroundImage: product?.thumb !== undefined  && product?.thumb !== null ? `url('https://nehra.az/storage/app/public/${product?.thumb}')` : defP,
        backgroundRepeat:"no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    // getModalStyle is not a pure function, we roll the style only on the first render
    
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
    //#endregion
    
    //#region Select ITEM  //Select ITEM
    const [indexSelected, setindexSelected] = useState(SelectedsProduct?.findIndex(x=> x.id === product.id) !== undefined ? SelectedsProduct?.findIndex(x=> x.id === product.id) : -1)
    useEffect(() => {
        setindexSelected(SelectedsProduct?.findIndex(x=> x.id === product.id))
        // setindexSelected()
    }, [SelectedsProduct])
    //#endregion  Select ITEM  //Select ITEM

    const selectItem = (product) => {
        const num = parseInt(product.id)
        const price = parseFloat(discountHandler(product))
        const weight = parseFloat(product.ceki_hecm)
        const unitType = parseInt(product.unit.unit_id)
        const dates = product.delivery
        const name = product.title
        const bonus = parseInt(product.bonus)
        const notify2 = (rate) => toast.success((lang === "AZ" && `Seçilmişlərdən çıxarıldı` || lang === "EN" && `Removed from favorites` || lang === "RU" && `Удалено из избранного`) , {draggable: true,autoClose: 1000});
        const notify1 = (rate) => toast.success((lang === "AZ" && `Seçilmişlərə Əlavə olundu` || lang === "EN" && `Added to favorites` || lang === "RU" && `Добавлено в избранное`) , {draggable: true,autoClose: 1000});
        
        if(UserData?.id !== null)
        {  
            // console.log(SelectedsProduct)
            if(SelectedsProduct.length === 0 )
            {
                var selecteds = []  
                selecteds = [...selecteds , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name, weight:weight, unitType:unitType, bonus:bonus, product:product}]
                setSelectedsProduct(selecteds)
                axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData?.id , string:JSON.stringify(selecteds)} )
                notify1()
                console.log('first1');
                return 0 
            }         
            else 
            {
                var selecteds = SelectedsProduct
            }
            var index = selecteds.findIndex(x=> x.id === num)

            if (index === -1) {
                selecteds = [...selecteds , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name, weight:weight, unitType:unitType, bonus:bonus, product:product}]
                setSelectedsProduct(selecteds)
                axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData.id , string:JSON.stringify(selecteds)} )
                notify1()
            }
            else 
            {
                var newArr = selecteds.filter((item) => item.id !== num)
                setSelectedsProduct(newArr)
                axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData.id , string:JSON.stringify(newArr)} )
                notify2()
            }
        }
        else 
        {
            notifyLogin()
            OpenLoginF()
        }
    }

    const checkLogin = (product) =>{
        if(UserStatus)
        {
            selectItem(product)
        }
        else 
        {
            notifyLogin()
            OpenLoginF()
        }
    }

    return (
        <div key={product.id} className="itemCard">
            <button  type="button"  className="imgCont" style={imgHandler}>
                <div className="valueAndBtn"> 
                    {ProdutData[ProdutData?.findIndex(x=> x.id === product.id)]?.count > 0 && <div className='valueBtn'>{ProdutData[ProdutData.findIndex(x=> x.id === product.id)]?.count}</div>}
                    <div className="iconAndBtn"> <button onClick={() => checkLogin(product)} className="favIco"> {indexSelected === -1 ?  <StarBorderIcon/> :  <StarIcon/>}</button></div>
                </div>

                <div className="overlayImg">
                    <div className='overlayBtn'>
                        {ProdutData[ProdutData.findIndex(x=> x.id === product.id)]?.count > 0 && <button onClick={() => removeItem(product)}>-</button> }
                        <button  type="button" onClick={() => modalIdsetter(product.id)}>{<ZoomInIcon style={{ color: "white", fontSize:"55px" }}/>}</button>
                        {ProdutData[ProdutData.findIndex(x=> x.id === product.id)]?.count > 0 && <button onClick={() => addItem(product)}>+</button>}
                    </div>
                </div>

                <div className="dates">
                        {product?.delivery?.map(delivery =>
                                <>
                                    {
                                        <DarkTT title={`${DateSelect(delivery)}`} placement="top" arrow>
                                            <div className="date"><DateCropLang day={delivery} /></div>
                                        </DarkTT>
                                    }
                                </>
                            )}  
                </div>
            </button>

            <p className="titleItem">{product?.title}</p>
            <p className="subTitleItem">  {(lang === "EN" && `from`) || (lang === "RU" && `из`)} { ((lang === "AZ" && product?.seller_data?.name) || (lang === "EN" && product?.seller_data?.name_en) || (lang === "RU" && product?.seller_data?.name_ru))} {lang === "AZ" && `tərəfindən` }</p>
            <div className="textCont">
                <div className="starAndAbout">
                    {!props.btnDisabled && <p className="dscPrc">{(product?.discount !== null) && (<span className="priceStriked"><span className="priceUnderStrike">{money === "₼" ? (product.qiymet) : (product.qiymet / currency).toFixed(1)} {money}</span></span>)}</p> }
                    <p className="priceAndWeightItem">{!props.btnDisabled &&<span className="element1"  style={product?.discount !== null ? colorChang : {}}>{money === "₼" ? discountHandler(product) : (discountHandler(product) / currency).toFixed(1)}  {money} /</span>  } <span className="element2">{((product.unit.id === 2 || product.unit.id === 4 || product.unit.id === 1) ? product.ceki_hecm : 1 ) + " " + ((lang === "AZ" && product?.unit.ad) || (lang === "EN" && product?.unit.ad_en) || (lang === "RU" && product?.unit.ad_ru)) }</span> </p>
                    <Rating name="read-only" size="small"  readOnly  value={product.starsall} /> 
                </div>   
                { !props.btnDisabled && <BuyButton functionAdd={() => addItem(product)}   cardPrice={discountHandler(product)}/>}
            </div>

        </div>
    )
}

export default ItemCard

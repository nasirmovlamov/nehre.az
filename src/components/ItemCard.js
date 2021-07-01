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
import Skeleton from '@material-ui/lab/Skeleton';
import {ProductListingContext} from '../components/ProductListingProvider'
import defP from '../assets/images/defP.png'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookies'
import DateCropLang from './DateCropLang';
import DateSelect from './DateMoment'
import Rating from '@material-ui/lab/Rating';


function ItemCard(props) {
    const {product} = props 
    const context = useContext(ProductListingContext)
    const {SelectedsProduct, ProdutData, selectItem,addItem,modalIdsetter,removeItem,lang,money, discountHandler, UserData} = context
    const [valueR, setvalueR] = useState()
    

    const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});

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
    // const [indexSelected, setindexSelected] = useState(SelectedsProduct?.findIndex(x=> x.id === product.id) !== undefined ? SelectedsProduct?.findIndex(x=> x.id === product.id) : -1)
    // useEffect(() => {
    //     var selecteds = SelectedsProduct
    //     setindexSelected(selecteds?.findIndex(x=> x.id === props.cardItem))
    // }, [SelectedsProduct])
    //#endregion  Select ITEM  //Select ITEM
    console.log(props.product)
    return (
        <div key={product.id} className="itemCard">
            <button  type="button"  className="imgCont" style={imgHandler}>
                <div className="valueAndBtn"> 
                    {ProdutData[ProdutData?.findIndex(x=> x.id === product.id)]?.count > 0 && <div className='valueBtn'>{ProdutData[ProdutData.findIndex(x=> x.id === product.id)]?.count}</div>}
                    <div className="iconAndBtn"> <button onClick={() => selectItem(product.id)} className="favIco"> {SelectedsProduct.findIndex(x=> x.id === product.id) === -1 ? <StarBorderIcon/> :  <StarIcon/>}</button></div>
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
                    <p className="dscPrc">{(product?.discount !== null) && (<span className="priceStriked"><span className="priceUnderStrike">{money === "₼" ? (product.qiymet) : (product.qiymet / 1.7).toFixed(1)} {money}</span></span>)}</p>
                    <p className="priceAndWeightItem"><span className="element1"  style={product?.discount !== null ? colorChang : {}}>{money === "₼" ? discountHandler(product) : (discountHandler(product) / 1.7).toFixed(1)}  {money}</span> / <span className="element2">{((product.unit.id === 2 || product.unit.id === 4 || product.unit.id === 1) ? product.ceki_hecm : 1 ) + " " + ((lang === "AZ" && product?.unit.ad) || (lang === "EN" && product?.unit.ad_en) || (lang === "RU" && product?.unit.ad_ru)) }</span> </p>
                    <Rating name="read-only"  readOnly  value={product.starsall} /> 
                </div>   
                {!props.btnDisable && <BuyButton functionAdd={() => addItem(product)}   cardPrice={discountHandler(product)}/>}
            </div>

           
        </div>
    )
}

export default ItemCard

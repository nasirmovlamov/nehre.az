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
import defP from '../assets/images/defP.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ItemCard(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr] = useContext(ProductListingContext)
    
    const [UserData, setUserData] = useState(0)
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    })

    
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
    const [open, setOpen] = React.useState(false);
    
    

    const handleOpen = () => {
        setOpen(true);
        setchecker(true)
    }
      
    const handleClose = () => {
        setOpen(false);
    };

    const handler = () => {
        handleOpen()
    }





    //Date //Date //Date
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 2)
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
    var newmonday = moment(monday).format( 'dddd, D MMMM');
    var newtuesday = moment(tuesday).format( 'dddd, D MMMM');
    var newwednesday = moment(wednesday).format( 'dddd, D MMMM');
    var newthursday = moment(thursday).format( 'dddd, D MMMM');
    var newfriday = moment(friday).format( 'dddd, D MMMM');




    //Select ITEM  //Select ITEM
    const selectItem = (num) => {
        const notify2 = (rate) => toast.success(`Seçilmişlərdən çıxarıldı` , {draggable: true,});
        const notify1 = (rate) => toast.success(`Seçilmişlərə Əlavə olundu` , {draggable: true,});
        if(UserData?.id !== undefined)
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
    //Select ITEM  //Select ITEM
    return (
        <div key={props.id} className="itemCard">
            <button  type="button"  className="imgCont" style={imgHandler}>
                <div className="iconAndBtn">
                    <button onClick={() => selectItem(props.id)} className="favIco">
                        <StarBorderIcon/>
                    </button>
                </div>

                <div className="overlayImg">
                    <button  type="button" >{<ZoomInIcon style={{ color: "white", fontSize:"55px" }}/>}</button>
                </div>

                <div className="dates">
                    <DarkTT title={`${newmonday}  çatdırılma `} placement="top" arrow>
                        <div className="date">Be</div>
                    </DarkTT>
                    <DarkTT title={`${newtuesday}  çatdırılma `}  placement="top" arrow>
                        <div className="date">Ça</div>
                    </DarkTT>
                    <DarkTT title={`${newwednesday}  çatdırılma `} placement="top" arrow>
                        <div className="date">Ç</div>
                    </DarkTT>
                    <DarkTT title={`${newthursday}  çatdırılma `} placement="top" arrow>
                        <div className="date">Ca</div>
                    </DarkTT>
                    <DarkTT title={`${newfriday}  çatdırılma `} placement="top" arrow>
                        <div className="date">C</div>
                    </DarkTT>
                    
                    
                </div>
            </button>

            <p className="titleItem">{props.title}</p>
            <p className="subTitleItem">{0 && props.desc} Dadlı keyfiyyətli məhsullar</p>
            <div className="textCont">
                <div className="starAndAbout">
                    <p className="dscPrc">{(props.discount !== 0 && props.discount !== null) && (<span className="priceStriked"><span className="priceUnderStrike">{Math.floor(props.price)} {money}</span></span>)}</p>
                    <p className="priceAndWeightItem"><span className="element1"  style={props.discount && colorChang}>{discountHandler(props.discount)}  {money}</span> / <span className="element2">{props.weight}</span> </p>
                    <StarSystem numberStar={props.star}/>
                </div>   
                <BuyButton functionAdd={() => addItem(props.cardId , discountHandler(props.discount))}  orders={props.orders} cardPrice={discountHandler(props.discount)} modalOpener3={props.modalOpener3} cardId={props.cardId}/>
            </div>
            {/* {
                ProdutData[ProdutData.findIndex(x=> x.id === props.id)]?.count >= 1 && 
                <div className="increaseDecrease">
                    <button className="dBtn" onClick={() => removeItem(props.cardId , discountHandler(props.discount) , props.weight)}> <RemoveIcon/></button>
                    <div className="valueID">{ProdutData[ProdutData.findIndex(x=> x.id === props.id)]?.count}</div>
                    <button className="iBtn" onClick={() => addItem(props.cardId , discountHandler(props.discount) , props.weight) }><AddIcon/></button>
                </div>
            } */}

            <div className="modalCont">
                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<ProductModal id={props.id} functionClose={handleClose}  title={props.title} desc={props.desc} price={props.price} weight={props.weight} numberStar="3.5"/>}
                </Modal>
            </div>
        </div>
    )
}

export default ItemCard

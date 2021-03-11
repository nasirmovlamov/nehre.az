import React,{useState , useEffect} from 'react'
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

function ItemCard(props) {
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
        background: `url('https://nehra.az/storage/app/public/${props.image}') no-repeat`,
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
        color: ""
    }
    
    const discountHandler = (discount) => {
        if (discount !== 0 && discount !== null) {
            var discountPrice = 0;
            discountPrice =  ((props.price - (props.price * discount) / 100))
            colorChang.color = "red"
            return discountPrice.toFixed(2);         
        } 
        else {
            return props.price
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
    
    useEffect(() => {
        handleClose()
    }, [])

    const handleOpen = () => {
        setOpen(true);
        setchecker(true)
    }
      
    const handleClose = () => {
        setOpen(false);
    };

    const handler = () => {
        if(checker)
        {}
        handleOpen()
    }
      
    return (
        <div className="itemCard">
            

            <button type="button"  className="imgCont" style={imgHandler}>
                    <div className="favIco">
                        <StarBorderIcon/>
                    </div>
                    <div className="overlayImg"><button type="button" onClick={() => handler()}>{<ZoomInIcon style={{ color: "white", fontSize:"55px" }}/>}</button></div>
                    <div className="dates">
                        <DarkTT title="Delivery possible for" placement="top" arrow>
                            <div className="date">M</div>
                        </DarkTT>
                        <DarkTT title="Delivery possible for" placement="top" arrow>
                            <div className="date">Tu</div>
                        </DarkTT>
                        <DarkTT title="Delivery possible for" placement="top" arrow>
                            <div className="date">Wed</div>
                        </DarkTT>
                        <DarkTT title="Delivery possible for" placement="top" arrow>
                            <div className="date">Th</div>
                        </DarkTT>
                        <DarkTT title="Delivery possible for" placement="top" arrow>
                            <div className="date">Fri</div>
                        </DarkTT>
                        <DarkTT title="Delivery possible for" placement="top" arrow>
                            <div className="date">Sat</div>
                        </DarkTT>
                    </div>
            </button>
            
            

            <p className="titleItem">{props.title}</p>
            <p className="subTitleItem">{props.desc}</p>
            <div className="textCont">
                <div className="starAndAbout">
                    <p className="dscPrc">{(props.discount !== 0 && props.discount !== null) && (<span className="priceStriked"><span className="priceUnderStrike">{(props.price)}</span></span>)}</p>
                    <p className="priceAndWeightItem"><span className="element1" style={colorChang}>{discountHandler(props.discount)} AZN</span> / <span className="element2">{props.weight}</span> </p>
                    <StarSystem numberStar={props.star}/>
                </div>   
                <BuyButton  orders={props.orders} cardPrice={discountHandler(props.discount)} modalOpener3={props.modalOpener3} cardId={props.cardId}/>
            </div>

            <div className="modalCont">
                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<ProductModal functionClose={() => handleClose()} title={props.title} desc={props.desc} price={props.price} weight={props.weight} numberStar="3.5"/>}
                </Modal>
            </div>

        </div>
    )
}

export default ItemCard

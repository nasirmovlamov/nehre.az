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
function ItemCard(props) {

    const [checker, setchecker] = useState(false)

    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
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
        if (discount != 0) {
            var discountPrice = 0;
            discountPrice =  props.price - (props.price * discount / 100)
            colorChang.color = "red"
            return discountPrice          
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
        },
      }));
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
        {
            
        }
        handleOpen()
      }
      
    return (
        <div className="itemCard">
            

            <button type="button" onClick={() => handler()} className="imgCont" style={imgHandler}>
                    <div className="overlayImg">{<ZoomInIcon style={{ color: "white", fontSize:"55px" }}/>}</div>
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
            </button>
            
            

            <p className="titleItem">{props.title}</p>
            <p className="subTitleItem">{props.desc}</p>
            <div className="textCont">
                <div className="starAndAbout">
                    <p className="dscPrc">{props.discount !== 0 && (<span className="priceStriked"><span className="priceUnderStrike">{props.price}</span></span>)}</p>
                    <p className="priceAndWeightItem"><span className="element1" style={colorChang}>{discountHandler(props.discount)}</span> / <span className="element2">{props.weight}</span> </p>
                    <StarSystem numberStar="3.5"/>
                </div>   
                <BuyButton/>
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

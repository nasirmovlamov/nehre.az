import React , {useContext} from 'react'
import "../assets/css/certificates.css"
import Modal from '@material-ui/core/Modal';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import GetAppIcon from '@material-ui/icons/GetApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {ProductListingContext} from '../components/ProductListingProvider'


function Certificates(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId] = useContext(ProductListingContext)


    const bgImage = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${props.Product.cert_thumb})`,
        backgroundSize: 'cover',
    }

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    

    return (
        <div className="certificates">
            { props.Product?.cert_pdf?.length > 0 ? <button style={bgImage} onClick={handleOpen} className="certificate"><div className="overlay"><WallpaperIcon/></div></button> : <p className='certNo'>{(lang === "AZ" && "Sertifikat mövcud deyil.") || (lang === "EN" && `There are no comments for this product`) || (lang === "RU" && `К этому продукту нет комментариев`)}</p>}
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                {
                    <div className="imageCert">
                        <button onClick={handleClose} className='close'><HighlightOffIcon/></button>
                        <img src={`https://nehra.az/storage/app/public/${props.Product?.cert_thumb}`} width='500px' height='auto'/>
                        <a href={`https://nehra.az/storage/app/public/${props.Product?.cert_pdf?.length > 0 ? props.Product?.cert_pdf[0]?.download_link : ""}`} download className='download'><GetAppIcon/></a>
                    </div>
                }
            </Modal>
        </div>
    )
}

export default Certificates

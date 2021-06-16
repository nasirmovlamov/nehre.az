import React , {useContext} from 'react'
import "../assets/css/certificates.css"
import Modal from '@material-ui/core/Modal';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import GetAppIcon from '@material-ui/icons/GetApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {ProductListingContext} from '../components/ProductListingProvider'


function ForCertificate(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId] = useContext(ProductListingContext)
    
    const bgImage = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${props.image})`,
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
        <div>
             <button style={bgImage} onClick={handleOpen} className="certificate"><div className="overlay"><WallpaperIcon/></div></button> 
            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                {
                    <div className="imageCert">
                        <button onClick={handleClose} className='close'><HighlightOffIcon/></button>
                        <img src={`https://nehra.az/storage/app/public/${props.image}`} width='500px' height='auto'/>
                        <a href={`https://nehra.az/storage/app/public/${props.pdf}`} download className='download'><GetAppIcon/></a>
                    </div>
                }
            </Modal>
        </div>

    )
}

export default ForCertificate

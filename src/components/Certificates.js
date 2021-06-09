import React from 'react'
import "../assets/css/certificates.css"
import Modal from '@material-ui/core/Modal';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import GetAppIcon from '@material-ui/icons/GetApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function Certificates(props) {
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
            { props.Product?.cert_pdf?.length > 0 && <button style={bgImage} href={`https://nehra.az/${props.Product.cert_pdf}`} onClick={handleOpen} className="certificate"><div className="overlay"><WallpaperIcon/></div></button>}
            
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

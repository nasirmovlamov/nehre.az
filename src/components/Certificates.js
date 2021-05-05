import React from 'react'
import "../assets/css/certificates.css"

function Certificates(props) {
    const bgImage = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${props.Product.cert_thumb})`,
        backgroundSize: 'cover',
    }
    return (
        <div className="certificates">
            <a style={bgImage} href={`https://nehra.az/${props.Product.cert_pdf}`} download className="certificate"></a>
        </div>
    )
}

export default Certificates

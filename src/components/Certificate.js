import React from 'react'
import "../assets/css/certificates.css"
import ForCertificate from './ForCertificate'

function Certificate(props) {
    const certificate = []
    props.Certificates.map(element => certificate.push(<ForCertificate image={element.cert_thumb} pdf={element.cert_pdf} /> ))
    return (
        <div className="certificates">
            {props.Certificates.length > 0 && certificate}
        </div>
    )
}

export default Certificate

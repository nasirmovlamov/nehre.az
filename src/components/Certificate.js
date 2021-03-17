import React from 'react'
import "../assets/css/certificates.css"
import ForCertificate from './ForCertificate'

function Certificate(props) {
    const certificate = []
    props.Certificates.map(element => certificate.push(<ForCertificate image={element.cert_thumb} /> ))
    return (
        <div className="certificates">
            {certificate}
        </div>
    )
}

export default Certificate

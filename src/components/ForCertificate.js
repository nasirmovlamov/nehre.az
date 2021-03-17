import React from 'react'

function ForCertificate(props) {
    const imgHandler = {
        backgroundImage:`url('https://nehra.az/storage/app/public/${props.image}')`,
        backgroundSize:"cover",
        backgroundPosition: "top center"
    }
    return (
        <div className="certificate" style={imgHandler}>
        </div>
    )
}

export default ForCertificate

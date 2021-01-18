import React from 'react'
import "../assets/css/supplierCard.css"
function SupplierCard(props) {
    const imgHandler = {
        background: `url(${props.image}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100%",
    }
    const imgHandler2 = {
        background: `url(${props.image2}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    const imgHandler3 = {
        background: `url(${props.image3}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    return (
        <div className="supplierCard">
            
            <div className="imgAndAbout">
                <div className="imgAvatar" style={imgHandler}></div>
                <div>
                    <p className="title">{props.title}</p>
                    <p className="subTitle">{props.supplier} <span style={{color:"rgba(0,0,0,0.5)"}}> supplier</span> </p>    
                </div>    
            </div>

            <div className="twoImgCont">
                <div className="productImg" style={imgHandler2}></div>
                <div className="productImg" style={imgHandler3}></div>
            </div>
        </div>
    )
}

export default SupplierCard
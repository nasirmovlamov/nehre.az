import React from 'react'
import "../assets/css/supplierCard2.css"
import StarSystem from './StarSystem'
import avatar from "../assets/images/avatar.jpg"
import {Link} from "react-router-dom"
function SupplierCard2(props) {
    
    const imgHandler = {
        background: `url(https://nehra.az/storage/app/public/${props.image}) no-repeat`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
    }


    return (
        <Link to={`/suppliers/${props.id}`}>
            <div className="supplierCard2">
                <div className="imgCont" style={imgHandler}></div>
                <p className="name">{props.name}</p>
                <StarSystem numberStar={props.star_count}/>
                <p className="desc">{props.type} </p>
            </div>
        </Link>
    )
}

export default SupplierCard2

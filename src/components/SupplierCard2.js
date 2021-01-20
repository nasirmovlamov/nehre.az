import React from 'react'
import "../assets/css/supplierCard2.css"
import StarSystem from './StarSystem'
import avatar from "../assets/images/avatar.jpg"
import {Link} from "react-router-dom"
function SupplierCard2() {
    
    const imgHandler = {
        background: `url(${avatar}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
    }


    return (
        <Link to="/suppliers/supplier">
            <div className="supplierCard2">
                <div className="imgCont" style={imgHandler}></div>
                <p className="name">Dmitry Vorobyov</p>
                <StarSystem numberStar="5"/>
                <p className="desc">Vegetable supplier</p>
            </div>
        </Link>
    )
}

export default SupplierCard2

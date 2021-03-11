import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../assets/css/suppliers.css"
import SupplierCard2 from './SupplierCard2'
function Suppliers() {
    const [Suppliers, setSuppliers] = useState([])
    useEffect(() => {
        axios.get('https://nehra.az/public/api/manufacturers')
        .then(res => setSuppliers(res.data.data))
        .catch(err=> console.log(err))
    })
    const supplierArr = []
    Suppliers.map(supplier => supplierArr.push(<SupplierCard2 name={supplier.name} image={supplier.avatar} id={supplier.id} star_count={supplier.star_count} />))
    return (
        <div className="suppliersCont" >
            
            <div className="suppliers">
                <p className="category"> <span>home •</span>  Manufacturer</p>
                <div className="supplier">
                    {supplierArr.map(element => element)}
                </div>
            </div>
        </div>
    )
}

export default Suppliers

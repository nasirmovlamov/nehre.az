import React from 'react'
import "../assets/css/suppliers.css"
import SupplierCard2 from './SupplierCard2'
function Suppliers() {
    
    return (
        <div className="suppliersCont" >
            
            <div className="suppliers">
                <p className="category"> <span>home •</span>  Manufacturer</p>
                <p className="suppliersTitle">Meet our suppliers</p>
                <div className="supplier">
                    <SupplierCard2/>
                    <SupplierCard2/>
                    <SupplierCard2/>
                    <SupplierCard2/>
                    <SupplierCard2/>
                    <SupplierCard2/>
                    <SupplierCard2/>
                    <SupplierCard2/>
                </div>
            </div>
        </div>
    )
}

export default Suppliers

import axios from 'axios'
import React , {useContext} from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../assets/css/suppliers.css"
import SupplierCard2 from './SupplierCard2'
import {ProductListingContext} from '../components/ProductListingProvider'

function Suppliers() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    const [Suppliers, setSuppliers] = useState([])
    useEffect(() => {
        axios.get('https://nehra.az/public/api/manufacturers')
        .then(res => setSuppliers(res.data.data))
        .catch(err=> console.log(err))
    } , [])
    const supplierArr = []
    Suppliers.map(supplier => supplierArr.push(<SupplierCard2 name={supplier.name} desc={lang === "AZ" && supplier.description || lang === "EN" && supplier.description_en || lang === "RU" && supplier.description_ru} image={supplier.avatar} id={supplier.id} star_count={supplier.star_count} />))
    
    return (
        <div className="suppliersCont" >
            
            <div className="suppliers">
                <p className="category"> <span>{(lang === "AZ" && `Əsas Səhifə`) || (lang === "EN" && `Homepage`) || (lang === "RU" && `Домашняя страница`)}  •</span> <span> {(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Manufacturer`) || (lang === "RU" && `Производитель`)} </span></p>
                <div className="supplier">
                    {supplierArr.map(element => element)}
                </div>
            </div>
        </div>
    )
}   

export default Suppliers

import axios from 'axios'
import React , {useContext} from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../assets/css/suppliers.css"
import SupplierCard2 from './SupplierCard2'
import {ProductListingContext} from '../components/ProductListingProvider'
import Skeleton from '@material-ui/core/Skeleton';

function Suppliers() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const [Suppliers, setSuppliers] = useState([])
    const [SuppliersLoader, setSuppliersLoader] = useState(false)
    useEffect(async () => {
        try {
            setSuppliersLoader(true)
            const res = await axios.get('https://nehra.az/public/api/manufacturers')
            setSuppliers(res.data.data)
            setSuppliersLoader(false)
        } catch (error) {
            console.log(error)
            setSuppliersLoader(false)
        }
    } , [])
    
    return (
        <div className="suppliersCont pagescroll" >
            
            <div className="suppliers">
                <p className="category"> <span>{(lang === "AZ" && `Əsas Səhifə`) || (lang === "EN" && `Homepage`) || (lang === "RU" && `Домашняя страница`)}  •</span> <span> {(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Manufacturer`) || (lang === "RU" && `Производитель`)} </span></p>
                <div className="supplier">
                    {SuppliersLoader &&  <div className='skeletonCont'>
                            <div className='skeleton'>
                                <Skeleton variant="rect" width={278} height={382} />
                            </div>
                            <div className='skeleton'>
                                <Skeleton variant="rect" width={278} height={382} />
                            </div>
                            <div className='skeleton'>
                                <Skeleton variant="rect" width={278} height={382} />
                            </div>
                            <div className='skeleton'>
                                <Skeleton variant="rect" width={278} height={382} />
                            </div>
                        </div>}
                    {!SuppliersLoader && Suppliers.map(supplier => <SupplierCard2 name={lang === "AZ" && supplier.name || lang === "EN" && supplier.name_en || lang === "RU" && supplier.name_ru} desc={lang === "AZ" && supplier.description || lang === "EN" && supplier.description_en || lang === "RU" && supplier.description_ru} image={supplier.avatar} id={supplier.id} star_count={supplier.star_count} />)}
                </div>
            </div>
        </div>
    )
}   

export default Suppliers

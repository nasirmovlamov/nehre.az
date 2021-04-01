import React from 'react'
import "../assets/css/products.css"
import ItemCard from './ItemCard'
import xalisBal from "../assets/images/xalisBal.jpg"

function Products(props) {
    const ProductArr = []
    if(props.SupplierProduct !== undefined)
    {
        props.SupplierProduct.map(element => ProductArr.push(<ItemCard image={element.image} title={element.title} desc={element.description} price={element.qiymet} weight={element.ceki_hecm} discount={element.discount}/>)) 
    }
    console.log(props.id)
    return (
        <div className="products">
            {ProductArr}
        </div>
    )
}

export default Products

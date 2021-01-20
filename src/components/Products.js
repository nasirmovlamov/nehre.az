import React from 'react'
import "../assets/css/products.css"
import ItemCard from './ItemCard'
import xalisBal from "../assets/images/xalisBal.jpg"

function Products() {
    return (
        <div className="products">
            <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={10}/> 
            <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/> 
            <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
            <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
            <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
            <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
        </div>
    )
}

export default Products

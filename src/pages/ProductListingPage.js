import React from 'react'
import '../assets/css/productListingPage.css'
import xalisBal from "../assets/images/xalisBal.jpg"
import ItemCard from '../components/ItemCard'
function ProductListingPage(props) {
    return (
        <div className="productPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span>home •</span>  {props.category}</p>
                        <h2 className="categoryName">{props.category}</h2>
                        {!props.notags  &&     
                        (<div className="tags">
                            <button className="tag" > All</button>
                            <button className="tag" > Eggs</button>
                            <button className="tag" > Cheese</button>
                        </div>)
                        }
                    
                    </div>
            </div>

            <div className="titleProductsCont">
                <div className="dateAndItemCont">
                    <button className="forDates"></button>
                    <p className="itemsNumber">343 items</p>
                </div>
                <select className="selectionFilter">
                    <option value="byPopularity">by popularity</option>
                    <option value="byPopularity">alphabetically</option>
                    <option value="byPopularity">new</option>
                    <option value="byPopularity">expensive</option>
                    <option value="byPopularity">cheaper</option>
                    <option value="byPopularity">by supplier</option>
                </select>
            </div>

            <div className="productsCont">
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={10}/>  
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>  
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
            </div>
        </div>
    )
}

export default ProductListingPage

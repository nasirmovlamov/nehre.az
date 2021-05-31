import React , {useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'

function Contact() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    return (
        <div className="productPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`} • {lang === "AZ" && `Əlaqə` || lang === "EN" && `Contact` || lang === "RU" && `Контакт`}</span>  </p>
                        <h2 className="categoryName">{lang === "AZ" && `Əlaqə` || lang === "EN" && `Contact` || lang === "RU" && `Контакт`}</h2>
                </div>
            </div>

        
        </div>
    )
}

export default Contact

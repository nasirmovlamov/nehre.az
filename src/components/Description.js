import React , {useContext} from 'react'
import "../assets/css/description.css"
import Button1 from './Button1';
import avatar from "../assets/images/avatar.jpg"
import xalisBal from "../assets/images/xalisBal.jpg"
import ItemCard from './ItemCard';
import SimilarCard from './SimilarCard';
import {ProductListingContext} from '../components/ProductListingProvider'

function Description(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    const imgHandler = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${props?.Product?.seller_data?.avatar})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <div className="description">
            <div className="descAbout">
                <div className="part1">
                    <p className="textCont"><p className="label">{lang === "AZ" && `Qiymət` || lang === "EN" && `Price` || lang === "RU" && `Цена`}:</p> <p className="value">{props?.Product?.qiymet} {money}</p></p>
                    <p className="textCont"><p className="label">{lang === "AZ" && `Çəki` || lang === "EN" && `Weight` || lang === "RU" && `Масса`}:</p> <p className="value">{props?.Product?.ceki_hecm} </p></p>
                    <p className="textCont"><p className="label">{lang === "AZ" && `Tərkibi` || lang === "EN" && `Ingredients` || lang === "RU" && `Ингредиенты`}:</p> <p className="value"> {lang === "AZ" && props?.Product?.terkibi_az || lang === "EN" && props?.Product?.terkibi_en || lang === "RU" && props?.Product?.terkibi_ru}</p></p>
                    <p className="textCont"><p className="label">{lang === "AZ" && `Enerji dəyəri:` || lang === "EN" && `Energy` || lang === "RU" && `Энергия`}</p> <p className="value">{lang === "AZ" && props?.Product?.enerji_deyeri_az || lang === "EN" && props?.Product?.enerji_deyeri_en || lang === "RU" && props?.Product?.enerji_deyeri_ru}</p></p>
                    <p className="textCont"><p className="label">{lang === "AZ" && `Saxlanma müddəti:` || lang === "EN" && `Shelf life:` || lang === "RU" && `Срок годности:`}</p> <p className="value">{lang === "AZ" && props?.Product?.srok_az || lang === "EN" && props?.Product?.srok_en || lang === "RU" && props?.Product?.srok_ru} </p></p>
                    <p className="textCont"><p className="label">{lang === "AZ" && `Saxlanma şəraiti:` || lang === "EN" && `Store condition:` || lang === "RU" && `Состояние магазина:`}</p> <p className="value">{lang === "AZ" && props?.Product?.saxlanma_seraiti_az || lang === "EN" && props?.Product?.saxlanma_seraiti_en || lang === "RU" && props?.Product?.saxlanma_seraiti_ru}  </p></p>
                    <p className="textCont"><p className="label">{lang === "AZ" && `İstehsal olunduğu yer:` || lang === "EN" && `Place of production:` || lang === "RU" && `Место производства:`}</p> <p className="value">{lang === "AZ" && props?.Product?.hazirlanma_yeri_az || lang === "EN" && props?.Product?.hazirlanma_yeri_en || lang === "RU" && props?.Product?.hazirlanma_yeri_ru} </p></p> 
                </div>
                <div className="part2">
                        <div className="imgCont" style={imgHandler}> </div>

                        <div className="textCont"> 
                            
                            <p className="name">
                                {lang === "AZ" && props?.Product?.seller_data?.name_az || lang === "EN" && props?.Product?.seller_data?.name_en || lang === "RU" && props?.Product?.seller_data?.name_ru}
                            </p>

                            <p className="about">
                                {lang === "AZ" && props?.Product?.seller_data?.description_az || lang === "EN" && props?.Product?.seller_data?.description_en || lang === "RU" && props?.Product?.seller_data?.description_ru}
                            </p>
                            
                            <p className="moreDetails">
                                <Button1  value={lang === "AZ" && `Daha ətraflı` || lang === "EN" && `Read more` || lang === "RU" && `Читать далее`} color="white"/>
                            </p>

                        </div>
                </div>
                
            </div>


            <div className="similarProductsCont">
                    <p className="title"> {lang === "AZ" && `Oxşar məhsullar` || lang === "EN" && `Similar products` || lang === "RU" && `Похожие продукты`} </p>
                    <div className="similarProducts">
                    </div>
            </div>
        </div>
    )
}

export default Description

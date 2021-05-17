import React , {useContext} from 'react'
import "../assets/css/description.css"
import Button1 from './Button1';
import avatar from "../assets/images/avatar.jpg"
import xalisBal from "../assets/images/xalisBal.jpg"
import ItemCard from './ItemCard';
import SimilarCard from './SimilarCard';
import {ProductListingContext} from '../components/ProductListingProvider'

function Description(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)

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
                        <p className="textCont"><p className="label">{lang === "AZ" && `Tərkibi` || lang === "EN" && `Ingredients` || lang === "RU" && `Ингредиенты`}:</p> <p className="value">{props?.Product?.terkibi}</p></p>
                        <p className="textCont"><p className="label">{lang === "AZ" && `Enerji dəyəri:` || lang === "EN" && `Energy` || lang === "RU" && `Энергия`}</p> <p className="value">{props?.Product?.enerji_deyeri}</p></p>
                        <p className="textCont"><p className="label">{lang === "AZ" && `Saxlanma müddəti:` || lang === "EN" && `Shelf life:` || lang === "RU" && `Срок годности:`}</p> <p className="value">{props?.Product?.srok}</p></p>
                        <p className="textCont"><p className="label">{lang === "AZ" && `Saxlanma şəraiti:` || lang === "EN" && `Store condition:` || lang === "RU" && `Состояние магазина:`}</p> <p className="value">{props?.Product?.saxlanma_seraiti}</p></p>
                     {/*   
                        <p className="textCont"><p className="label">{lang === "AZ" && `Qablaşdırma növü::` || lang === "EN" && `Type of packaging:` || lang === "RU" && `Тип упаковки:`}</p> <p className="value">{props?.Product?.qablasdirma_data}</p></p> 
                    */}
                    <p className="textCont"><p className="label">{lang === "AZ" && `İstehsal olunduğu yer:` || lang === "EN" && `Place of production:` || lang === "RU" && `Место производства:`}</p> <p className="value">{props?.Product?.hazirlanma_yeri}</p></p> 
                </div>
                <div className="part2">
                        <div className="imgCont" style={imgHandler}> </div>

                        <div className="textCont"> 
                            <p className="name">
                                {props?.Product?.seller_data?.name}
                            </p>
                            <p className="about">
                                {props?.Product?.seller_data?.description}
                            </p>
                            
                            <p className="moreDetails">
                                <Button1  value="More details" color="white"/>
                            </p>

                        </div>
                </div>
                
            </div>


            <div className="similarProductsCont">
                    <p className="title"> {lang === "AZ" && `Oxşar məhsullar` || lang === "EN" && `Similar products` || lang === "RU" && `Похожие продуктыW`} </p>
                    <div className="similarProducts">
                        <SimilarCard />
                    </div>
            </div>
        </div>
    )
}

export default Description

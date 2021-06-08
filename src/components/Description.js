import React , {useContext, useEffect, useState} from 'react'
import "../assets/css/description.css"
import Button1 from './Button1';
import avatar from "../assets/images/avatar.jpg"
import xalisBal from "../assets/images/xalisBal.jpg"
import ItemCard from './ItemCard';
import SimilarCard from './SimilarCard';
import {ProductListingContext} from '../components/ProductListingProvider'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Description(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});


    const imgHandler = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${props?.Product?.seller_data?.avatar})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }


    const [sendStar, setsendStar] = useState(props?.Product?.seller_data?.star_count)
    console.log(props?.Product?.seller_data?.star_count)

    return (
        <div className="description">
            <div className="descAbout">
                <div className="part1">
                    {props?.Product?.qiymet !== undefined && <p className="textCont"><p className="label">{lang === "AZ" && `Qiymət` || lang === "EN" && `Price` || lang === "RU" && `Цена`}:</p> <p className="value">{props?.Product?.qiymet} {money}</p></p>}
                    {props?.Product?.ceki_hecm !== undefined && <p className="textCont"><p className="label">{lang === "AZ" && `Çəki` || lang === "EN" && `Weight` || lang === "RU" && `Масса`}:</p> <p className="value">{props?.Product?.ceki_hecm} </p></p>}
                    {props?.Product?.terkibi_az !== undefined &&  <p className="textCont"><p className="label">{lang === "AZ" && `Tərkibi` || lang === "EN" && `Ingredients` || lang === "RU" && `Ингредиенты`}:</p> <p className="value"> {lang === "AZ" && props?.Product?.terkibi_az || lang === "EN" && props?.Product?.terkibi_en || lang === "RU" && props?.Product?.terkibi_ru}</p></p>}
                    {props?.Product?.enerji_deyeri_az !== undefined && <p className="textCont"><p className="label">{lang === "AZ" && `Enerji dəyəri:` || lang === "EN" && `Energy` || lang === "RU" && `Энергия`}</p> <p className="value">{lang === "AZ" && props?.Product?.enerji_deyeri_az || lang === "EN" && props?.Product?.enerji_deyeri_en || lang === "RU" && props?.Product?.enerji_deyeri_ru}</p></p>}
                    {props?.Product?.srok_az  !== undefined && <p className="textCont"><p className="label">{lang === "AZ" && `Saxlanma müddəti:` || lang === "EN" && `Shelf life:` || lang === "RU" && `Срок годности:`}</p> <p className="value">{lang === "AZ" && props?.Product?.srok_az || lang === "EN" && props?.Product?.srok_en || lang === "RU" && props?.Product?.srok_ru} </p></p>}
                    {props?.Product?.saxlanma_seraiti_az !== undefined && <p className="textCont"><p className="label">{lang === "AZ" && `Saxlanma şəraiti:` || lang === "EN" && `Store condition:` || lang === "RU" && `Состояние магазина:`}</p> <p className="value">{lang === "AZ" && props?.Product?.saxlanma_seraiti_az || lang === "EN" && props?.Product?.saxlanma_seraiti_en || lang === "RU" && props?.Product?.saxlanma_seraiti_ru}  </p></p>}
                    {props?.Product?.hazirlanma_yeri_az  !== undefined && <p className="textCont"><p className="label">{lang === "AZ" && `İstehsal olunduğu yer:` || lang === "EN" && `Place of production:` || lang === "RU" && `Место производства:`}</p> <p className="value">{lang === "AZ" && props?.Product?.hazirlanma_yeri_az || lang === "EN" && props?.Product?.hazirlanma_yeri_en || lang === "RU" && props?.Product?.hazirlanma_yeri_ru} </p></p> }
                </div>
                <div className="part2">
                        <div className="imgCont" style={imgHandler}> </div>

                        <div className="textCont"> 
                            
                            <p className="name">
                                {props?.Product?.seller_data?.name}
                                <div className="starsAndReviews"><Rating value={props?.Product?.seller_data?.star_count !== undefined ? props?.Product?.seller_data?.star_count : 1 } readOnly />  <div className="reviews">  {lang === "AZ" && `Şərh sayı - ` || lang === "EN" && `Reviews - ` || lang === "RU" && `Отзывы - `} {props?.Product?.seller_data?.star_count}</div> </div>
                            </p>

                            <p className="about">
                                {props?.Product?.seller_data?.description}
                            </p>
                            
                            <p className="moreDetails">
                                <a href='#'><Button1  value={lang === "AZ" && `Daha ətraflı` || lang === "EN" && `Read more` || lang === "RU" && `Читать далее`} color="white"/></a>
                            </p>

                        </div>
                </div>
                
            </div>


            {
                (props.ProductSimilar.length > 0 && props.ProductSimilar.length !== undefined) &&
                <div className="similarProductsCont">
                        <p className="title"> {lang === "AZ" && `Oxşar məhsullar` || lang === "EN" && `Similar products` || lang === "RU" && `Похожие продукты`} </p>
                        <div className="similarProducts">
                            {props.ProductSimilar.map(product =>  <ItemCard delivery={product?.delivery}  NumberOfGoods={props?.NumberOfGoods}  modalOpener3={props.modalOpener3} cardId={product?.id} image={product?.thumb}  title={product?.title}  desc={product?.seller_data?.name}  unitType={product?.unit.id} price={Math.floor(product?.qiymet)}  weight={product?.ceki_hecm}  discount={product?.discount} productModal={props?.productModal}   star={product?.starsall}/>)}
                        </div>
                </div>}
        </div>
    )
}

export default Description

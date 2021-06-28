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

    return (
        <div className="description">
            <div className="descAbout">
                <div className="part1">
                    
                    { (props?.Product?.ceki_hecm !== null) && <p className="textCont"><p className="label">{(lang === "AZ" && `Çəki`) || (lang === "EN" && `Weight`) || (lang === "RU" && `Масса`)}:</p> <p className="value">{props?.Product?.ceki_hecm + " " + (parseInt(props?.Product?.unit?.id) === 1 &&  ((lang === "AZ" && `kq`) || (lang === "EN" && 'kq') || (lang === "RU" && 'кг')) || parseInt(props?.Product?.unit?.id) === 4 &&  ((lang === "AZ" && `gr`) || (lang === "EN" && 'gr') || (lang === "RU" && 'гр'))|| parseInt(props?.Product?.unit?.id) === 2 && ((lang === "AZ" && `l`) || (lang === "EN" && 'l') || (lang === "RU" && 'л')) )}</p></p>}
                    
                    
                    
                    
                    {(lang === "AZ" && props?.Product?.enerji_deyeri !== null  && props?.Product?.enerji_deyeri !== undefined) &&  <p className="textCont"><p className="label">{(`Enerji dəyəri:`)}</p> <p className="value">{(lang === "AZ" && props?.Product?.enerji_deyeri)}</p></p>}
                    {(lang === "EN" && props?.Product?.enerji_deyeri_en !== null && props?.Product?.enerji_deyeri_en !== undefined) &&  <p className="textCont"><p className="label">{(`Energy`)}</p> <p className="value">{(lang === "EN" && props?.Product?.enerji_deyeri_en)}</p></p>}
                    {(lang === "RU" && props?.Product?.enerji_deyeri_ru !== null && props?.Product?.enerji_deyeri_ru !== undefined) &&  <p className="textCont"><p className="label">{(`Энергия`)}</p> <p className="value">{(lang === "RU" && props?.Product?.enerji_deyeri_ru)}</p></p>}
                    
                    
                    {(lang === "AZ" && props?.Product?.istifade_qaydasi !== null  && props?.Product?.istifade_qaydasi !== undefined) &&  <p className="textCont"><p className="label">{(`İstifadə Qaydası:`)}</p> <p className="value">{(lang === "AZ" && props?.Product?.istifade_qaydasi)}</p></p>}
                    {(lang === "EN" && props?.Product?.istifade_qaydasi_en !== null && props?.Product?.istifade_qaydasi_en !== undefined) &&  <p className="textCont"><p className="label">{(`Instructions for use`)}</p> <p className="value">{(lang === "EN" && props?.Product?.istifade_qaydasi_en)}</p></p>}
                    {(lang === "RU" && props?.Product?.istifade_qaydasi_ru !== null && props?.Product?.istifade_qaydasi_ru !== undefined) &&  <p className="textCont"><p className="label">{(`Инструкции по использованию`)}</p> <p className="value">{(lang === "RU" && props?.Product?.istifade_qaydasi_ru)}</p></p>}
                    
                    {(lang === "AZ" && props?.Product?.vacib_qeyd !== null  && props?.Product?.vacib_qeyd !== undefined) &&  <p className="textCont"><p className="label">{(`Vacib qeyd:`)}</p> <p className="value">{(lang === "AZ" && props?.Product?.vacib_qeyd)}</p></p>}
                    {(lang === "EN" && props?.Product?.vacib_qeyd_en !== null && props?.Product?.vacib_qeyd_en !== undefined) &&  <p className="textCont"><p className="label">{(`Important note`)}</p> <p className="value">{(lang === "EN" && props?.Product?.vacib_qeyd_en)}</p></p>}
                    {(lang === "RU" && props?.Product?.vacib_qeyd_ru !== null && props?.Product?.vacib_qeyd_ru !== undefined) &&  <p className="textCont"><p className="label">{(`Важная заметка`)}</p> <p className="value">{(lang === "RU" && props?.Product?.vacib_qeyd_ru)}</p></p>}
                    
                    
                    
                    { (lang === "AZ" && props?.Product?.srok  !== null && props?.Product?.srok  !== undefined) && <p className="textCont"><p className="label">{(`Saxlanma müddəti:`)}</p> <p className="value">{(lang === "AZ" && props?.Product?.srok)} </p></p>}
                    { (lang === "EN" && props?.Product?.srok_en  !== null && props?.Product?.srok_en  !== undefined) && <p className="textCont"><p className="label">{(`Shelf life:`)}</p> <p className="value">{(lang === "EN" && props?.Product?.srok_en)} </p></p>}
                    { (lang === "RU" && props?.Product?.srok_ru  !== null && props?.Product?.srok_ru  !== undefined) && <p className="textCont"><p className="label">{(`Срок годности:`)}</p> <p className="value">{(lang === "RU" && props?.Product?.srok_ru)} </p></p>}
                    
                    
                    { (lang === "AZ" && props?.Product?.saxlanma_seraiti !== null && props?.Product?.saxlanma_seraiti !== undefined) && <p className="textCont"><p className="label">{( `Saxlanma şəraiti:`)}</p> <p className="value">  {(lang === "AZ" && props?.Product?.saxlanma_seraiti)}  </p></p>}
                    { (lang === "EN" && props?.Product?.saxlanma_seraiti_en !== null && props?.Product?.saxlanma_seraiti_en !== undefined) && <p className="textCont"><p className="label">{(`Store condition:`)}</p> <p className="value">    {(lang === "EN" && props?.Product?.saxlanma_seraiti_en)}  </p></p>}
                    { (lang === "RU" && props?.Product?.saxlanma_seraiti_ru !== null && props?.Product?.saxlanma_seraiti_ru !== undefined)  && <p className="textCont"><p className="label">{(`Состояние магазина:`)}</p> <p className="value"> {(lang === "RU" && props?.Product?.saxlanma_seraiti_ru)}  </p></p>}
                    
                    
                    
                    { (lang === "AZ" && props?.Product?.hazirlanma_yeri !== null && props?.Product?.hazirlanma_yeri !== undefined) && <p className="textCont"><p className="label">{(`İstehsal olunduğu yer:`)}</p> <p className="value">{(lang === "AZ" && props?.Product?.hazirlanma_yeri)} </p></p> }
                    { (lang === "EN" && props?.Product?.hazirlanma_yeri_en !== null && props?.Product?.hazirlanma_yeri_en !== undefined) && <p className="textCont"><p className="label">{(`Place of production:`)}</p> <p className="value">  {(lang === "EN" && props?.Product?.hazirlanma_yeri_en)} </p></p> }
                    { (lang === "RU" && props?.Product?.hazirlanma_yeri_ru !== null && props?.Product?.hazirlanma_yeri_ru !== undefined) && <p className="textCont"><p className="label">{(`Место производства:`)}</p> <p className="value">   {(lang === "RU" && props?.Product?.hazirlanma_yeri_ru)} </p></p> }
                    
                    
                    { (lang === "AZ" && (props?.Product?.istehsal_tarixi !== undefined && props?.Product?.istehsal_tarixi !== null && props?.Product?.istehsal_tarixi !== "")) &&  <p className="textCont"><p className="label">{(`İstehsal tarixi:`)}</p> <p className="value">{props?.Product?.istehsal_tarixi?.replaceAll('-' , '.')} </p></p> }
                    { (lang === "EN" && (props?.Product?.istehsal_tarixi !== undefined && props?.Product?.istehsal_tarixi !== null && props?.Product?.istehsal_tarixi !== ""))  &&  <p className="textCont"><p className="label">{ (`Date of production:`)}</p> <p className="value">{ props?.Product?.istehsal_tarixi?.replaceAll('-' , '.')} </p></p> }
                    { (lang === "RU" && (props?.Product?.istehsal_tarixi !== undefined && props?.Product?.istehsal_tarixi !== null && props?.Product?.istehsal_tarixi !== ""))   &&  <p className="textCont"><p className="label">{(`Дата производства:`)}</p> <p className="value">{props?.Product?.istehsal_tarixi?.replaceAll('-' , '.')} </p></p> }
                </div>
                <div className="part2">
                        <div className="imgCont" style={imgHandler}> </div>

                        <div className="textCont"> 
                            
                            <p className="name">
                                {lang === "AZ" && props?.Product?.seller_data?.name  || lang === "EN" && props?.Product?.seller_data?.name_en || lang === "RU" && props?.Product?.seller_data?.name_ru }
                                <div className="starsAndReviews"><Rating value={props?.Product?.seller_data?.star_count !== undefined ? props?.Product?.seller_data?.star_count : 0 } readOnly />  <div className="reviews">  {(lang === "AZ" && `Şərh sayı - `) || (lang === "EN" && `Reviews - `) || (lang === "RU" && `Отзывы - `)} {props?.Product?.seller_data?.star_count}</div> </div>
                            </p>

                            <p className="about">
                                {(lang === "AZ" && props?.Product?.seller_data?.description) || (lang === "EN" && props?.Product?.seller_data?.description_en) || (lang === "RU" && props?.Product?.seller_data?.description_ru)}
                            </p>
                            
                            <a target='blank' href={`https://nehra.az/suppliers/${props?.Product?.seller_data?.id}`}  className="moreDetails">
                                <Button1  value={(lang === "AZ" && `Daha ətraflı`) || (lang === "EN" && `Read more`) || (lang === "RU" && `Читать далее`)} color="white"/>
                            </a>

                        </div>
                </div>
                
            </div>


            {
                (props.ProductSimilar.length > 0 && props.ProductSimilar.length !== undefined) &&
                <div className="similarProductsCont">
                        <p className="title"> {(lang === "AZ" && `Oxşar məhsullar`) || (lang === "EN" && `Similar products`) || (lang === "RU" && `Похожие продукты`)} </p>
                        <div className="similarProducts">
                            {props.ProductSimilar.map(product =>  <ItemCard delivery={product?.delivery} cardId={product?.id} image={product?.thumb}  title={product?.title}  desc={ (lang === "AZ" && product?.seller_data?.name) || (lang === "EN" && product?.seller_data?.name_en) || (lang === "RU" && product?.seller_data?.name_ru)}  unitType={product?.unit.unit_id} unitId={product?.unit.id}  unitAd={ (lang === "AZ" && product?.unit.ad) || (lang === "EN" && product?.unit.ad_en) || (lang === "RU" && product?.unit.ad_ru)} price={Math.floor(product?.qiymet)} weight={product?.ceki_hecm}   discount={product?.discount} productModal={props?.productModal} bonus={product.cashback} star={product?.starsall}/>)}
                        </div>
                </div>}
        </div>
    )
}

export default Description

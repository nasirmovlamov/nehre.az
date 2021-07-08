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
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
    const {Product} = props
    const notifyLogin = () => toast.warning(`Hesabınıza daxil olun!` , {draggable: true,});


    const imgHandler = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${Product?.seller_data?.avatar})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }


    const [sendStar, setsendStar] = useState(Product?.seller_data?.star_count)

    return (
        <div className="description">
            <div className="descAbout">
                <div className="part1">
                    
                    { (Product?.ceki_hecm !== null) && <p className="textCont"><p className="label">{(lang === "AZ" && `Çəki`) || (lang === "EN" && `Weight`) || (lang === "RU" && `Масса`)}:</p> <p className="value">{((Product.unit.id === 2 || Product.unit.id === 4 || Product.unit.id === 1) ? Product?.ceki_hecm : 1 ) + " " + ((lang === "AZ" && Product?.unit.ad) || (lang === "EN" && Product?.unit.ad_en) || (lang === "RU" && Product?.unit.ad_ru))} </p></p>}
                    
                    
                    
                    
                    {(lang === "AZ" && Product?.enerji_deyeri !== null  && Product?.enerji_deyeri !== undefined) &&  <p className="textCont"><p className="label">{(`Enerji dəyəri:`)}</p> <p className="value">{(lang === "AZ" && Product?.enerji_deyeri)}</p></p>}
                    {(lang === "EN" && Product?.enerji_deyeri_en !== null && Product?.enerji_deyeri_en !== undefined) &&  <p className="textCont"><p className="label">{(`Energy`)}</p> <p className="value">{(lang === "EN" && Product?.enerji_deyeri_en)}</p></p>}
                    {(lang === "RU" && Product?.enerji_deyeri_ru !== null && Product?.enerji_deyeri_ru !== undefined) &&  <p className="textCont"><p className="label">{(`Энергия`)}</p> <p className="value">{(lang === "RU" && Product?.enerji_deyeri_ru)}</p></p>}
                    
                    
                    {(lang === "AZ" && Product?.istifade_qaydasi !== null  && Product?.istifade_qaydasi !== undefined) &&  <p className="textCont"><p className="label">{(`İstifadə Qaydası:`)}</p> <p className="value">{(lang === "AZ" && Product?.istifade_qaydasi)}</p></p>}
                    {(lang === "EN" && Product?.istifade_qaydasi_en !== null && Product?.istifade_qaydasi_en !== undefined) &&  <p className="textCont"><p className="label">{(`Instructions for use`)}</p> <p className="value">{(lang === "EN" && Product?.istifade_qaydasi_en)}</p></p>}
                    {(lang === "RU" && Product?.istifade_qaydasi_ru !== null && Product?.istifade_qaydasi_ru !== undefined) &&  <p className="textCont"><p className="label">{(`Инструкции по использованию`)}</p> <p className="value">{(lang === "RU" && Product?.istifade_qaydasi_ru)}</p></p>}
                    
                    {(lang === "AZ" && Product?.vacib_qeyd !== null  && Product?.vacib_qeyd !== undefined) &&  <p className="textCont"><p className="label">{(`Vacib qeyd:`)}</p> <p className="value">{(lang === "AZ" && Product?.vacib_qeyd)}</p></p>}
                    {(lang === "EN" && Product?.vacib_qeyd_en !== null && Product?.vacib_qeyd_en !== undefined) &&  <p className="textCont"><p className="label">{(`Important note`)}</p> <p className="value">{(lang === "EN" && Product?.vacib_qeyd_en)}</p></p>}
                    {(lang === "RU" && Product?.vacib_qeyd_ru !== null && Product?.vacib_qeyd_ru !== undefined) &&  <p className="textCont"><p className="label">{(`Важная заметка`)}</p> <p className="value">{(lang === "RU" && Product?.vacib_qeyd_ru)}</p></p>}
                    
                    
                    
                    { (lang === "AZ" && Product?.srok  !== null && Product?.srok  !== undefined) && <p className="textCont"><p className="label">{(`Saxlanma müddəti:`)}</p> <p className="value">{(lang === "AZ" && Product?.srok)} </p></p>}
                    { (lang === "EN" && Product?.srok_en  !== null && Product?.srok_en  !== undefined) && <p className="textCont"><p className="label">{(`Shelf life:`)}</p> <p className="value">{(lang === "EN" && Product?.srok_en)} </p></p>}
                    { (lang === "RU" && Product?.srok_ru  !== null && Product?.srok_ru  !== undefined) && <p className="textCont"><p className="label">{(`Срок годности:`)}</p> <p className="value">{(lang === "RU" && Product?.srok_ru)} </p></p>}
                    
                    
                    { (lang === "AZ" && Product?.saxlanma_seraiti !== null && Product?.saxlanma_seraiti !== undefined) && <p className="textCont"><p className="label">{( `Saxlanma şəraiti:`)}</p> <p className="value">  {(lang === "AZ" && Product?.saxlanma_seraiti)}  </p></p>}
                    { (lang === "EN" && Product?.saxlanma_seraiti_en !== null && Product?.saxlanma_seraiti_en !== undefined) && <p className="textCont"><p className="label">{(`Store condition:`)}</p> <p className="value">    {(lang === "EN" && Product?.saxlanma_seraiti_en)}  </p></p>}
                    { (lang === "RU" && Product?.saxlanma_seraiti_ru !== null && Product?.saxlanma_seraiti_ru !== undefined)  && <p className="textCont"><p className="label">{(`Состояние магазина:`)}</p> <p className="value"> {(lang === "RU" && Product?.saxlanma_seraiti_ru)}  </p></p>}
                    
                    
                    
                    { (lang === "AZ" && Product?.hazirlanma_yeri !== null && Product?.hazirlanma_yeri !== undefined) && <p className="textCont"><p className="label">{(`İstehsal olunduğu yer:`)}</p> <p className="value">{(lang === "AZ" && Product?.hazirlanma_yeri)} </p></p> }
                    { (lang === "EN" && Product?.hazirlanma_yeri_en !== null && Product?.hazirlanma_yeri_en !== undefined) && <p className="textCont"><p className="label">{(`Place of production:`)}</p> <p className="value">  {(lang === "EN" && Product?.hazirlanma_yeri_en)} </p></p> }
                    { (lang === "RU" && Product?.hazirlanma_yeri_ru !== null && Product?.hazirlanma_yeri_ru !== undefined) && <p className="textCont"><p className="label">{(`Место производства:`)}</p> <p className="value">   {(lang === "RU" && Product?.hazirlanma_yeri_ru)} </p></p> }
                    
                    
                    { (lang === "AZ" && (Product?.istehsal_tarixi !== undefined && Product?.istehsal_tarixi !== null && Product?.istehsal_tarixi !== "")) &&  <p className="textCont"><p className="label">{(`İstehsal tarixi:`)}</p> <p className="value">{Product?.istehsal_tarixi?.replaceAll('-' , '.')} </p></p> }
                    { (lang === "EN" && (Product?.istehsal_tarixi !== undefined && Product?.istehsal_tarixi !== null && Product?.istehsal_tarixi !== ""))  &&  <p className="textCont"><p className="label">{ (`Date of production:`)}</p> <p className="value">{ Product?.istehsal_tarixi?.replaceAll('-' , '.')} </p></p> }
                    { (lang === "RU" && (Product?.istehsal_tarixi !== undefined && Product?.istehsal_tarixi !== null && Product?.istehsal_tarixi !== ""))   &&  <p className="textCont"><p className="label">{(`Дата производства:`)}</p> <p className="value">{Product?.istehsal_tarixi?.replaceAll('-' , '.')} </p></p> }
                </div>
                <div className="part2">
                        <div className="imgCont" style={imgHandler}> </div>

                        <div className="textCont"> 
                            
                            <p className="name">
                                {lang === "AZ" && Product?.seller_data?.name  || lang === "EN" && Product?.seller_data?.name_en || lang === "RU" && Product?.seller_data?.name_ru }
                                <div className="starsAndReviews"><Rating value={Product?.seller_data?.star_count !== undefined ? Product?.seller_data?.star_count : 0 } readOnly />  <div className="reviews">  {(lang === "AZ" && `Şərh sayı - `) || (lang === "EN" && `Reviews - `) || (lang === "RU" && `Отзывы - `)} {Product?.seller_data?.star_count}</div> </div>
                            </p>

                            <p className="about">
                                {(lang === "AZ" && Product?.seller_data?.description) || (lang === "EN" && Product?.seller_data?.description_en) || (lang === "RU" && Product?.seller_data?.description_ru)}
                            </p>
                            
                            <a target='blank' href={`https://nehra.az/suppliers/${Product?.seller_data?.id}`}  className="moreDetails">
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
                            {props.ProductSimilar.map(product =>  <ItemCard product={product} />)}
                        </div>
                </div>}
        </div>
    )
}

export default Description

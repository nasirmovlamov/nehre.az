import axios from 'axios'
import React,{useState,useContext} from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import "../assets/css/selectedSupllier.css"
import About from '../pages/About'
import Certificate from './Certificate'
import Description from './Description'
import Products from './Products'
import Reviews from './Reviews'
import StarSystem from './StarSystem'
import {ProductListingContext} from '../components/ProductListingProvider'



function SelectedSupplier() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
 
    let { id } = useParams();
    const [Supplier, setSupplier] = useState(0)
    const [Certificates, setCertificates] = useState(0)
    const [SupplierProduct, setSupplierProduct] = useState([0])

    const sendGetRequestSupplier = async () => {
        try {
            const resp = await axios.get(`https://nehra.az/public/api/manufacturer/${id}`)
            setSupplier(resp.data.data)
            setCertificates(resp.data.certificates) 
            setSupplierProduct(resp.data.products)
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        sendGetRequestSupplier()
    }, [])

    const styleChanger = {
        border:"1px solid lightgray",
        borderBottom: "0px",
        color: "#3b3b3b",
        backgroundColor: " #fff",
    }
    
    const [checker, setchecker] = useState(1)
    const clickHandler = (num) => {
        setchecker(num)
    }

   

    return (
        <div className="selectedSupllierCont">
            <div className="selectedSupplier">
                <p className="category"> <span>{(lang === "AZ" && `Əsas Səhifə`) || (lang === "EN" && `Homepage`) || (lang === "RU" && `Домашняя страница`)}  •  {(lang === "AZ" && `Tədarükçülər`) || (lang === "EN" && `Manufacturer`) || (lang === "RU" && `Производитель`)} •  {(lang === "AZ" && Supplier.name) || (lang === "EN" && Supplier.name_en) || (lang === "RU" && Supplier.name_ru)} </span> </p>
                <div className="videoAndAbout">
                    <iframe  className="supplierVideo" src={`https://www.youtube.com/embed/${Supplier.video_link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div className="about">
                        <p className="name">{(lang === "AZ" && Supplier.name) || (lang === "EN" && Supplier.name_en) || (lang === "RU" && Supplier.name_ru)}</p>
                        <div className="starAndReview"><StarSystem numberStar={Supplier.star_count}/>   </div>
                        <p className="text">
                            {(lang === "AZ" && Supplier.description) || (lang === "EN" && Supplier.description_en) || (lang === "RU" && Supplier.description_ru)}
                            {}
                        </p>
                    </div>
                 </div>  

                 <div className="topLinks">
                    <div className="btnContForLinks">
                        <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}>  {(lang === "AZ" && `Məhsullar`) || (lang === "EN" && `Products`) || (lang === "RU" && `Продукты`)}              </button>
                        <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}>  {(lang === "AZ" && `Tədarükçü Haqqında`) || (lang === "EN" && `About Supplier`) || (lang === "RU" && `О поставщик`)}             </button>
                        <button className="button" style={checker ===3 ? styleChanger: null}  id="btnLink3" onClick={() => clickHandler(3)}>   {(lang === "AZ" && `Sertifikatlar`) || (lang === "EN" && `Certificates`) || (lang === "RU" && `Сертификаты`)}               </button>
                        <button className="button" style={checker ===4 ? styleChanger: null}  id="btnLink4" onClick={() => clickHandler(4)}>  {(lang === "AZ" && `Şərhlər`) || (lang === "EN" && `Product Reviews`) || (lang === "RU" && `Отзывы`)}             </button>
                        <hr/>

                        <div className="linkComponent">
                            {checker === 1 ? <Products      SupplierProduct={SupplierProduct }             /> : "" }
                            {checker === 2 ? <About         description={(lang === "AZ" && Supplier.description) || (lang === "EN" && Supplier.description_en) || (lang === "RU" && Supplier.description_ru)}/> : ""}
                            {checker === 3 ? <Certificate   Certificates={Certificates}                    /> : ""}
                            {checker === 4 ? <Reviews       manf_id={id}  post_id={null}                        /> : ""}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default SelectedSupplier

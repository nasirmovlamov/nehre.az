import axios from 'axios'
import React,{useState,useContext} from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import "../assets/css/selectedSupllier.css"
import About from './About'
import Certificate from './Certificate'
import Description from './Description'
import Products from './Products'
import Reviews from './Reviews'
import StarSystem from './StarSystem'
import {ProductListingContext} from '../components/ProductListingProvider'



function SelectedSupplier() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin] = useContext(ProductListingContext)
    let { id } = useParams();
    const [Supplier, setSupplier] = useState(0)
    const [Certificates, setCertificates] = useState(0)
    const [SupplierProduct, setSupplierProduct] = useState([0])
    const [SSReviews, setSSReviews] = useState([0])
    const sendGetRequestSupplier = async () => {
        try {
            const resp = await axios.get(`https://nehra.az/public/api/manufacturer/${id}`)
            setSupplier(resp.data.data)
            setCertificates(resp.data.certificates) 
            setSupplierProduct(resp.data.products)
            setSSReviews(resp.data.reviews)
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
                <p className="category"> <span>{sessionStorage.getItem('lang') === "AZ" && `əsas səhifə` || sessionStorage.getItem('lang') === "EN" && `home` || sessionStorage.getItem('lang') === "RU" && `главная`}  •  {sessionStorage.getItem('lang') === "AZ" && `kəndli` || sessionStorage.getItem('lang') === "EN" && `Manufacturer` || sessionStorage.getItem('lang') === "RU" && `Производитель`} •  {Supplier.name} </span> </p>
                <div className="videoAndAbout">
                    <iframe  className="supplierVideo" src={`https://www.youtube.com/embed/${Supplier.video_link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div className="about">
                        <p className="name">{Supplier.name}</p>
                        <div className="starAndReview"><StarSystem numberStar={Supplier.star_count}/>  <p>{Supplier.review_count}  {sessionStorage.getItem('lang') === "AZ" && `şərh` || sessionStorage.getItem('lang') === "EN" && `reviews` || sessionStorage.getItem('lang') === "RU" && `отзывы`} </p> </div>
                        <p className="text">
                            {Supplier.description}
                        </p>
                    </div>
                 </div>  {/* Video and About */}

                 <div className="topLinks">
                    <div className="btnContForLinks">
                        <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}>Products</button>
                        <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}>About the supplier </button>
                        <button className="button" style={checker ===3 ? styleChanger: null}  id="btnLink3" onClick={() => clickHandler(3)}>Certificates</button>
                        <button className="button" style={checker ===4 ? styleChanger: null}  id="btnLink4" onClick={() => clickHandler(4)}>Product Reviews</button>
                        <hr/>

                        <div className="linkComponent">
                            {checker === 1 ? <Products SupplierProduct={SupplierProduct }/> : "" }
                            {checker === 2 ? <About description={Supplier.description}/> : ""}
                            {checker === 3 ? <Certificate Certificates={Certificates}/> : ""}
                            {checker === 4 ? <Reviews SSReviews={SSReviews}  /> : ""}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default SelectedSupplier

import React,{useState} from 'react'
import "../assets/css/productModal.css"
import OurSlider from './OurSlider'
import StarSystem from './StarSystem'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Button } from '@material-ui/core';
import Button1 from './Button1';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import avatar from "../assets/images/avatar.jpg"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Description from './Description';
import Certificates from './Certificates';
import Reviews from './Reviews';
import testImg6 from "../assets/images/testImg6.jpg"
import testImg7 from "../assets/images/testImg7.jpg"
import SupplierCard from './SupplierCard';
import { useEffect } from 'react';
import axios from 'axios';
function ProductModal(props) {
    const [Product, setProduct] = useState()
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/product/${props.id}`)
            .then(res => setProduct(res.data))
            .catch(err=> console.log(err))
    } , [])
    
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

    const [value, setvalue] = useState(1)

    const clickValueHandler = (num) => {
        if(num===1)
        {
            setvalue(value--)
        }
        else if (num===3)
        {
            setvalue(value++)
        }
    }

    const suppliersCard = []
    suppliersCard.push(  <SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>,<SupplierCard image={avatar} title="Zinaida and Sergey Belan" supplier="Pickles and preserves " image2={testImg6} image3={testImg7}/>)
    
    return (

        <div className="productModal">
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <div className="sliderAndAbout">
                <div className="sliderCont">
                    {<OurSlider elements={suppliersCard} numOfSld={1}/>}
                </div>
                <div className="aboutCont">
                    <p className="titleItem">{Product?.title}</p>
                    <p className="supllierName">{Product?.seller_data.name}</p>
                    <div className="reviewCont">
                        <div className="starsAndReviews"><StarSystem numberStar={props.numberStar}/>  <div className="reviews">33 reviews</div> </div>
                        <div className="favorites"><FavoriteBorderIcon style={{fontSize:"25px",color:"red",}}/> favorite</div> 
                    </div>
                    <p className="desc">
                        {Product?.description}
                    </p>
                    <p className="ingredients"><span className="ingredientsText"> Tərkibi:</span> <span className="ingredientsFront">{Product?.terkibi}</span>    </p>
                    <p className="priceCont"> <span className="priceText">Qiyməti:</span>  <span className="price">{Product?.qiymet}</span> - <span className="weight">{Product?.ceki_hecm}</span></p>
                    <div className="buttonsCont">
                        <div className="part1">
                            <button  value="1" onClick={() => clickValueHandler(value)}  className="decBtn">{<RemoveIcon style={{fontSize:"20px"}}/>}</button>
                            <button   className="valueBtn">1</button>
                            <button  value="3" onClick={() => clickValueHandler(value)}  className="incBtn">+</button>
                        </div>
                        <div className="part2"><Button1 value="Səbətə əlavə et" color="#285999"/></div>
                    </div>
                </div> 
            </div>

            <div className="part2Modal">
                
                
                    <div className="topLinks">
                        <div className="btnContForLinks">
                            <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}>Haqqında</button>
                            <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}>Şərhlər (Num) </button>
                            <button className="button" style={checker ===3 ? styleChanger: null}  id="btnLink3" onClick={() => clickHandler(3)}>Sertifikatlar</button>
                            <hr/>

                            <div className="linkComponent">
                                {checker === 1 ? <Description Product={Product}  functionClose={() => props.functionClose()} /> : "" }
                                {checker === 2 ? <Reviews Product={Product}/> : ""}
                                {checker === 3 ? <Certificates Product={Product}/> : ""}
                            </div>
                        </div>
                    </div>


                    


            </div>




        </div>
    )
}

export default ProductModal

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
function ProductModal(props) {

    
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
                    <p className="titleItem">{props.title}</p>
                    <p className="supllierName">{props.desc}</p>
                    <div className="reviewCont">
                        <div className="starsAndReviews"><StarSystem numberStar={props.numberStar}/>  <div className="reviews">33 reviews</div> </div>
                        <div className="favorites"><FavoriteBorderIcon style={{fontSize:"25px",color:"red",}}/> favorite</div> 
                    </div>
                    <p className="desc">
                        Pumpkin oil is a complete multivitamin complex, including biologically 
                        active substances, minerals, macro- and microelements, polyunsaturated 
                        fatty acids. Gives an aromatic taste to dishes, is used in salads, 
                        cereals and various side dishes, and can also be used as a cosmetic and 
                        medical product.
                    </p>
                    <p className="ingredients"><span className="ingredientsText"> Ingredients:</span> <span className="ingredientsFront">100% pumpkin seed oil.</span>    </p>
                    <p className="priceCont"> <span className="priceText">Price:</span>  <span className="price">1019 RUB</span> for <span className="weight">500ml</span></p>
                    <div className="buttonsCont">
                        
                        <div className="part1">
                            <button  value="1" onClick={() => clickValueHandler(value)}  className="decBtn">{<RemoveIcon style={{fontSize:"20px"}}/>}</button>
                            <button   className="valueBtn">1</button>
                            <button  value="3" onClick={() => clickValueHandler(value)}  className="incBtn">+</button>
                        </div>

                        <div className="part2"><Button1 value="Add to card" color="#FF7A2C"/></div>
                    </div>
                </div> 
            </div>

            <div className="part2Modal">
                
                
                    <div className="topLinks">
                        <div className="btnContForLinks">
                            <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}>Description</button>
                            <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}>Reviews (Num) </button>
                            <button className="button" style={checker ===3 ? styleChanger: null}  id="btnLink3" onClick={() => clickHandler(3)}>Certificates</button>
                            <hr/>

                            <div className="linkComponent">
                                {checker === 1 ? <Description  functionClose={props.functionClose} /> : "" }
                                {checker === 2 ? <Reviews/> : ""}
                                {checker === 3 ? <Certificates/> : ""}
                            </div>
                        </div>
                    </div>


                    


            </div>




        </div>
    )
}

export default ProductModal

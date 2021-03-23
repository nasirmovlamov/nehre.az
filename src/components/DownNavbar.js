import React from 'react'
import "../assets/css/downNavbar.css"
import milkImg from "../assets/images/milk.png"
import meatImg from "../assets/images/meat.png"
import fruitsImg from "../assets/images/fruits.png"
import breadImg from "../assets/images/bread.png"
import conservImg from "../assets/images/conserv.png"
import fishImg from "../assets/images/seafood.png"
import freezedImg from "../assets/images/freezed.png"
import nonfoodImg from "../assets/images/nonFood.png"
import {
    Link, 
    BrowserRouter as  Router
  } from "react-router-dom";
function DownNavbar(props) {
    const clickHandler = (num) => {
        for (let i = 1; i < props.TopCategory.length; i++) {
            document?.getElementById(`btnNav${i}`)?.setAttribute('style' , "border-bottom: 4px solid transparent;")
        }
        document?.getElementById(`btnNav${num}`)?.setAttribute('style' , "border-bottom: 4px solid #285999w;")
    }
    const TopCatArr = []
    if(props.TopCategory.length !== 0)
    {
        props.TopCategory.map(element => TopCatArr.push(<Link to ={`/category/${element.id}`}><button  id={`btnNav${element.id}`} onClick={() => clickHandler(element.id)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={`https://nehra.az/storage/app/public/${element.image}`} alt="" width="70px" height="auto"/></div>  <span>{element.name}</span>  </button></Link>))
    }
    return (
        <div className="navCont">
            <nav className="downNavbar">
                {TopCatArr}
            </nav>
        </div>
    )
}

export default DownNavbar

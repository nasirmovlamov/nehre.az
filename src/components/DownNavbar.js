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
function DownNavbar() {
    const clickHandler = (num) => {
        for (let i = 1; i < 8; i++) {
            document.getElementById(`btnNav${i}`).setAttribute('style' , "border-bottom: 4px solid transparent;")
        }
        document.getElementById(`btnNav${num}`).setAttribute('style' , "border-bottom: 4px solid #285999w;")
}
    return (
        <div className="navCont">
            <nav className="downNavbar">
                <Link to ="/milk-cheese"><button  id="btnNav1" onClick={() => clickHandler(1)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={milkImg} alt="" width="70px" height="auto"/></div>  <span>Süd, pendir, yumurta</span>  </button></Link>
                <Link to ="/meat"><button  id="btnNav2" onClick={() => clickHandler(2)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={meatImg} alt="" width="70px" height="auto"/></div> <span> Ət və quş əti</span></button></Link>
                <Link to ="/fruits"><button  id="btnNav3" onClick={() => clickHandler(3)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={fruitsImg} alt="" width="70px" height="auto"/></div> <span> Meyvə və tərəvəz</span></button></Link>
                <Link to ="/bread"><button  id="btnNav4" onClick={() => clickHandler(4)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={breadImg} alt="" width="70px" height="auto"/></div>  <span>Kulinariya və çörək</span> </button></Link>
                <Link to ="/fish"><button  id="btnNav5" onClick={() => clickHandler(5)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={fishImg} alt="" width="70px" height="auto"/></div>  <span>Dəniz məhsulları</span></button></Link>
                <Link to ="/freezed"><button  id="btnNav6" onClick={() => clickHandler(6)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={freezedImg} alt="" width="70" height="auto"/></div>  <span>Dondurulmuş</span></button></Link>
                <Link to ="/non-food"><button  id="btnNav7" onClick={() => clickHandler(7)} className="buttonNav" > <div id="downNavImgCont" className="imgCont"> <img id="downNavImg" src={nonfoodImg} alt="" width="70" height="auto"/></div>  <span>Qeyri-qida</span></button></Link>
            </nav>
        </div>
    )
}

export default DownNavbar

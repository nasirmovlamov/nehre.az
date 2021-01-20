import React from 'react'
import "../assets/css/downNavbar.css"
import milkImg from "../assets/images/milk.png"
import meatImg from "../assets/images/meat.png"
import fruitsImg from "../assets/images/fruits.png"
import breadImg from "../assets/images/bread.png"
import conservImg from "../assets/images/conserv.png"
import fishImg from "../assets/images/fish.png"
import freezedImg from "../assets/images/freezed.png"
import nonfoodImg from "../assets/images/nonFood.png"
import {
    Link, 
    BrowserRouter as  Router
  } from "react-router-dom";
function DownNavbar() {
    return (
        <div className="navCont">
            <nav className="downNavbar">
                <Link to ="/milk-cheese"><button className="buttonNav"> <div className="imgCont"> <img src={milkImg} alt="" width="auto" height="auto"/></div>  <span>Süd, pendir, yumurta</span>  </button></Link>
                <Link to ="/meat"><button className="buttonNav"> <div className="imgCont"> <img src={meatImg} alt="" width="auto" height="auto"/></div> <span> Ət və quş əti</span></button></Link>
                <Link to ="/fruits"><button className="buttonNav"> <div className="imgCont"> <img src={fruitsImg} alt="" width="auto" height="auto"/></div> <span> Meyvə və tərəvəz</span></button></Link>
                <Link to ="/bread"><button className="buttonNav"> <div className="imgCont"> <img src={breadImg} alt="" width="auto" height="auto"/></div>  <span>Kulinariya və çörək</span> </button></Link>
                <Link to ="/fish"><button className="buttonNav"> <div className="imgCont"> <img src={fishImg} alt="" width="110" height="auto"/></div>  <span>Balıq</span></button></Link>
                <Link to ="/freezed"><button className="buttonNav"> <div className="imgCont"> <img src={freezedImg} alt="" width="auto" height="auto"/></div>  <span>Dondurulmuş</span></button></Link>
                <Link to ="/non-food"><button className="buttonNav"> <div className="imgCont"> <img src={nonfoodImg} alt="" width="auto" height="auto"/></div>  <span>Qeyri-qida</span></button></Link>
            </nav>
        </div>
    )
}

export default DownNavbar

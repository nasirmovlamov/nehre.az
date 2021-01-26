import React from 'react'
import "../assets/css/memberArea.css"
import avatar from "../assets/images/avatar.jpg"
import Button1 from "./Button1"
import { Link, Route, BrowserRouter as Router,Switch } from "react-router-dom"

function cabinet() {
    
    const imgHandler = {
        backgroundImage: `url(${avatar})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div className="cabinetCont">
            <p className="title">My info</p>
            <div className="gridCont">
                <p className="key">Last name and first name</p> <p className="value">Nail Aghaverdiyev</p>
                <p className="key">Bonus group </p> <p className="value">Newbie</p>
                <p className="key">Bonus points</p> <p className="value">You have 0 cows. </p>
                <p className="key">Bonus Bet</p> <p className="value">one%</p>
                <p className="key">Sum of orders</p> <p className="value">0 rubles</p>
                <p className="key">contact number</p> <p className="value">9085748556</p>
                <p className="key">Contact e-mail</p> <p className="value">aqaverdiyev@gmail.com</p>
                <p className="key" style={{alignSelf:"start",}}>Profile picture </p> <div className="valueImg" style={imgHandler}></div>
                <Button1 value="edit" color="#FF7A2C"/>
            </div>
        </div>
    )
}

function contacts() {
    return (
        <div className="cabinetCont">
            <p className="title">Account</p>
            <div className="gridCont">
                <p className="name key">* Name and Surname</p> <input className="value"   type="text" name="" id=""/>
                <p className="email key ">* Email</p> <input  className="value"  type="email" name="" id=""/>
                <p className="phone key">* Phone</p> <input  className="value"  type="tel" name="" id=""/>
                <p className="date key">* Birthday</p> <input  className="value"  type="date" name="" id=""/>
            </div>
        </div>
    )
}
function password(){return (null) }
function address(){return (null) }
function bookmarks(){return (null) }
function orders(){return (null) }
function reminders(){return (null) }
function bonuses(){return (null) }
function deposites(){return (null) }
function freeShiping(){return (null) }
function reviews(){return (null) }
function recommendations(){return (null) }
function output(){return (null) }




function MemberArea() {
    return (
        <Router>
        <div className="memberAreaCont">
            
            <aside className="aside">
                <Link to="/memberarea/cabinet" className="cabinet">                 <img src="cabinet" alt=""/> Cabinet                 </Link>
                <Link to="/memberarea/contacts" className="contact">               <img src="contact" alt=""/> Contact                 </Link>
                <Link to="/memberarea/password" className="password">            <img src="password" alt=""/> Password             </Link>
                <Link to="/memberarea/address" className="address">                <img src="address" alt=""/> Address                </Link>
                <Link to="/memberarea/bookmarks" className="bookmarks">         <img src="bookmarks" alt=""/> Bookmarks         </Link>
                <Link to="/memberarea/orders" className="orders">                    <img src="orders" alt=""/> Orders                   </Link>
                <Link to="/memberarea/reminders" className="reminders"  >         <img src="reminders" alt=""/> Reminders                            </Link>
                <Link to="/memberarea/bonuses" className="bonuses">               <img src="bonuses" alt=""/> Bon   uses                   </Link>
                <Link to="/memberarea/deposite" className="deposites">            <img src="deposites" alt=""/> Deposites               </Link>
                <Link to="/memberarea/free-shipping" className="freeShipping">          <img src="freeShipping" alt=""/>Free shipping                    </Link>
                <Link to="/memberarea/reviews" className="reviews">               <img src="reviews" alt=""/> Reviews                    </Link>
                <Link to="/memberarea/recommendations" className="recommendatios">     <img src="recommendations" alt=""/> Recommendations                   </Link>
                <Link to="/memberarea/output" className="output">                 <img src="outputs" alt=""/> Outputs                  </Link>
            </aside>
            
            <main className="main">
            <Switch>
                <Route path="/memberarea/contacts">{contacts}</Route>
                <Route path="/memberarea/password">{password}</Route>
                <Route path="/memberarea/address">{address}</Route>
                <Route path="/memberarea/bookmarks">{bookmarks}</Route>
                <Route path="/memberarea/orders">{orders}</Route>
                <Route path="/memberarea/reminders">{reminders}</Route>
                <Route path="/memberarea/bonuses">{bonuses}</Route>
                <Route path="/memberarea/deposite">{deposites}</Route>
                <Route path="/memberarea/free-shipping">{freeShiping}</Route>
                <Route path="/memberarea/reviews">{reviews}</Route>
                <Route path="/memberarea/recommendations">{recommendations}</Route>
                <Route path="/memberarea/output">{output}</Route>
                <Route path="/memberarea/cabinet">{cabinet}</Route>
            </Switch>
            </main>
            </div>
        </Router>
    )
}

export default MemberArea

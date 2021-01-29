import React,{useState, useRef} from 'react'
import "../assets/css/memberArea.css"
import avatar from "../assets/images/avatar.jpg"
import Button1 from "./Button1"
import { Link, Route, BrowserRouter as Router,Switch } from "react-router-dom"
import gogerti from "../assets/images/gogerti.jpg"

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import LockIcon from '@material-ui/icons/Lock';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DescriptionIcon from '@material-ui/icons/Description';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ItemCard from './ItemCard'
import Review from './Review'
import Reviews from './Reviews'
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
        <div className="cabinetCont contactCont">
            <p className="title">Contact</p>
            <div className="gridCont">
                <p className="name key">* Name and Surname</p> <input placeholder="Name and Surname" className="value"   type="text" name="" id=""/>
                <p className="email key ">* Email</p> <input placeholder="Email" className="value"  type="email" name="" id=""/>
                <p className="phone key">* Phone</p> <input placeholder="Telephone" className="value"  type="tel" name="" id=""/>
                <p className="date key">* Birthday</p> <input value="1980-08-26"  className="value"  type="date" name="" id=""/>
            </div>
            <Button1 value="save" color="#FF7A2C"/>

        </div>
    )
}
function password(){return (
<div className="cabinetCont contactCont">
    <p className="title">Password</p>
    <div className="gridCont">
        <p className="name key">* Old Password</p> <input placeholder="Old Password" className="value"   type="text" name="" id=""/>
        <p className="email key ">* New Password</p> <input placeholder="New Password"  className="value"  type="email" name="" id=""/>
    </div>
    <Button1 value="save" color="#FF7A2C"/>
</div>
) }
function address(){return (
    <div className="cabinetCont address">
        <p className="title">My Addresses</p>
        <p className="myAdress">The list of addresses in your account is empty.</p>
        <Link to="/memberarea/address/add"><Button1 value="New Address" color="#FF7A2C"/></Link>
    </div>
) }
function addAddress(){return (
    <div className="cabinetCont addAddress">
        <p className="title">My Addresses</p>
        <form action="" className="form">

            <div className="flexContAddress">
                <div className="againDiv">
                    <div className="label">Town</div>
                    <input type="text"  placeholder="Town" className="input1"/>
                </div>
                <div className="againDiv">
                    <div className="label">The outside</div>
                    <input type="text"  className="input1" placeholder="The outside"/>
                </div>
            </div>

            <div className="flexContAddress2">
                <div className="againDiv" >
                    <div className="label">House</div>
                    <input type="text" placeholder="House" className="text"/>
                </div>
                <div className="againDiv">
                    <div className="label">Entrance</div>
                    <input type="text" className="text" placeholder="Entrance"/>
                </div>
                <div className="againDiv">
                    <div className="label">Floor</div>
                    <input type="text" className="text" placeholder="Floor"/>
                </div>
            </div>
            
            <div className="flexContAddress2">
                <div className="againDiv">
                    <div className="label">Sq.</div>
                    <input type="text" placeholder="Sq." className="text"/>
                </div>
                <div className="againDiv">
                    <div className="label">InterCom</div>
                    <input type="text" className="text" placeholder="InterCom"/>
                </div>
            </div>

            <div className="flexContAddress3">
                <div className="againDiv">
                    <div className="label">Comment</div>
                    <input type="text" placeholder="Comment about delivering" className="inputComment"/>
                </div>
            </div>

            <div className="buttonCont">
                <Link to="/memberarea/address" className="backTo">Back To</Link>
                <Button1 value="Save" color="#ff7a2c"/>
            </div>
        </form>
    </div>
) }
function bookmarks(){return (
    <div className="cabinetCont bookmarks ">
        <p className="title">Featured Products</p>
        <p className="selection"><button className="button"><HelpOutlineIcon/> Assortment for: <p>all dates <ArrowRightIcon/></p> </button></p>
        <div className="gridCont1">
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
        </div>
    </div>
) }
function orders(){return (
    <div className="cabinetCont orders bookmarks ">
        <p className="title">Order history</p>
        <div className="gridCont1">
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
            {<ItemCard image={gogerti} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>}
        </div>
    </div>
) }
function reminders(){return (
    <div className="cabinetCont orders bookmarks reminders">
        <p className="title">My notifications</p>
        <p className="subTitle">Add an alert by e-mail or SMS, and we will remind you to place an order.</p>
        <div className="gridCont1">
            <p className="alerts">You have no notfications!</p>
        </div>
    </div>
) }
function bonuses(){return (
    <div className="cabinetCont address deposites bonuses">
        <p className="title">Bonuses</p>
        <p className="myAdress ">Your Current Bonuse is <span className="money"> 10$ </span></p>
        <table>
            <tr className="start"> <td>Date</td> <td>Price</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
        </table>
    </div>
) }
function deposites(){return (
    <div className="cabinetCont address deposites">
        <p className="title">Deposites</p>
        <p className="myAdress ">Your Current balance is <span className="money"> 1300$ </span></p>
        <table>
            <tr className="start"> <td>Date</td> <td>Price</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
            <tr> <td>21.01.2020</td> <td>5000AZN</td> </tr>
        </table>
    </div>
) }

function freeShiping(){return (
    <div className="reviewCont aboutShipping">
            <p className="title">About Shipping</p>
            <p className="subTitle">We have grouped here all products ordered in the last 30 days for which you have not yet had a review.</p>
            <div className="aboutShippingText">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci libero possimus totam incidunt? Aut provident, quidem totam nesciunt qui repudiandae odio, officia, expedita veniam enim quisquam? Obcaecati magni blanditiis vel!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci libero possimus totam incidunt? Aut provident, quidem totam nesciunt qui repudiandae odio, officia, expedita veniam enim quisquam? Obcaecati magni blanditiis vel!</p>
            </div>
    </div>
) }

function reviews() {
    return (
        
        <div className="reviewCont">
            <p className="title">Leave your opinion about the product</p>
            <p className="subTitle">We have grouped here all products ordered in the last 30 days for which you have not yet had a review.</p>
            <div className="reviews">
                <Review/>
                <Review/>
                <Review/>
                <Review/>
            </div>
        </div>


)}

function recommendations(){return (null) }
function output(){return (null) }




function MemberArea() {

    const clickHandler = (num) => {
            for (let i = 1; i < 13; i++) {
                document.getElementById(`btn${i}`).setAttribute('style' , "color: #7d7068;border-left: 3px solid transparent;")
            }
            document.getElementById(`btn${num}`).setAttribute('style' , "color: #ff7a2c;border-left: 3px solid #ff7a2c;")
    }

    return (
        <Router>
        <div className="memberAreaCont">
            
            <aside className="aside">
                <Link to="/memberarea/cabinet" className="cabinet"><button id="btn1" onClick={() => clickHandler(1)}>                 <AccountCircleIcon/>  Cabinet                </button> </Link>
                <Link to="/memberarea/contacts" className="contact"> <button id="btn2" onClick={() => clickHandler(2)}>                 <PermContactCalendarIcon/> Contact                  </button></Link>
                <Link to="/memberarea/password" className="password"><button id="btn3" onClick={() => clickHandler(3)}>                 <LockIcon/> Password              </button></Link>
                <Link to="/memberarea/address" className="address"> <button id="btn4" onClick={() => clickHandler(4)}>                  <LocationOnIcon/>Address                 </button></Link>
                <Link to="/memberarea/bookmarks" className="bookmarks"> <button id="btn5" onClick={() => clickHandler(5)}>              <FavoriteIcon/> Bookmarks          </button></Link>
                <Link to="/memberarea/orders" className="orders">   <button id="btn6" onClick={() => clickHandler(6)}>                  <DescriptionIcon/> Orders                    </button></Link>
                <Link to="/memberarea/reminders" className="reminders"  ><button id="btn7" onClick={() => clickHandler(7)}>            <NotificationsIcon/> Reminders                             </button></Link>
                <Link to="/memberarea/bonuses" className="bonuses">     <button id="btn8" onClick={() => clickHandler(8)}>              <MonetizationOnIcon/>  Bonuses                    </button></Link>
                <Link to="/memberarea/deposite" className="deposites"> <button id="btn9" onClick={() => clickHandler(9)}>               <AccountBalanceWalletIcon/>Deposites                </button></Link>
                <Link to="/memberarea/free-shipping" className="freeShipping"> <button id="btn10" onClick={() => clickHandler(10)}>       <LocalShippingIcon/> Free shipping                    </button> </Link>
                <Link to="/memberarea/reviews" className="reviews">       <button id="btn11" onClick={() => clickHandler(11)}>            <ChatBubbleIcon/>  Reviews                    </button> </Link>
                {<Link to="/memberarea/recommendations" className="recommendatios"> <button id="btn12" onClick={() => clickHandler(12)}>   <ThumbUpAltIcon/> Recommendations                  </button>  </Link>}
                <hr/>
                <a href="/" >       <button>            <ExitToAppIcon/> Log out                   </button></a>
            </aside>
            
            <main className="main">
            <Switch>
                <Route path="/memberarea/contacts">{contacts}</Route>
                <Route path="/memberarea/password">{password}</Route>
                <Route path="/memberarea/address/add">{addAddress}</Route>
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

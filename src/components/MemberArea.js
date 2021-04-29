import React,{useState, useRef, useEffect} from 'react'
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
import { makeStyles } from '@material-ui/core/styles';
import ItemCard from './ItemCard'
import Review from './Review'
import Reviews from './Reviews'
import Cabinet from './Cabinet'
import Contacts from './Contacts'
import PasswordUpdate from './PasswordUpdate'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListIcon from '@material-ui/icons/List';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Orders from './Orders'
import Bookmarks from './Bookmarks'
const stylesForSwiper = makeStyles({
    list: {
      width: "100%",
    },
    fullList: {
      width: "100%",
    },
}); 
  
function address(props){return (
    <div className="cabinetCont address">
        <p className="title">My Addresses</p>
        <p className="myAdress">The list of addresses in your account is empty.</p>
        <Link to="/memberarea/address/add"><Button1 value="New Address" color="#285999"/></Link>
    </div>
) }
function addAddress(props){return (
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
                <Button1 value="Save" color="#285999"/>
            </div>
        </form>
    </div>
) }


function reminders(props){return (
    <div className="cabinetCont orders bookmarks reminders">
        <p className="title">My notifications</p>
        <p className="subTitle">Add an alert by e-mail or SMS, and we will remind you to place an order.</p>
        <div className="gridCont1">
            <p className="alerts">You have no notfications!</p>
        </div>
    </div>
) }
function bonuses(props){return (
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
function deposites(props){return (
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

function freeShiping(props){return (
    <div className="reviewCont aboutShipping">
            <p className="title">About Shipping</p>
            <p className="subTitle">We have grouped here all products ordered in the last 30 days for which you have not yet had a review.</p>
            <div className="aboutShippingText">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci libero possimus totam incidunt? Aut provident, quidem totam nesciunt qui repudiandae odio, officia, expedita veniam enim quisquam? Obcaecati magni blanditiis vel!</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci libero possimus totam incidunt? Aut provident, quidem totam nesciunt qui repudiandae odio, officia, expedita veniam enim quisquam? Obcaecati magni blanditiis vel!</p>
            </div>
    </div>
) }

function reviews(props) {
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

function output(){return (null) }




function MemberArea(props) {
    const memberMQ = useMediaQuery('(min-width:900px)') 

    const clickHandler = (num) => {
            for (let i = 1; i < 11; i++) {
                document.getElementById(`btn${i}`).setAttribute('style' , "color: #7d7068;border-left: 3px solid transparent;")
                document?.getElementById('main')?.setAttribute("style" , "box-shadow: 3px 1px 40px  rgba(0,0,0,0.2);")

            }
            if (num === 6 || num === 5) {
                document?.getElementById('main')?.setAttribute("style" , "box-shadow: none;")
            }
            document.getElementById(`btn${num}`).setAttribute('style' , "color:#285999;border-left: 3px solid #285999")
    }
    const url = window.location.href;
    const lastSegment = url.split("/").pop();
    const borderHandler = (lastItem) => {
        if (lastItem !== undefined && lastItem !== null ) {
            document?.querySelector(`.btn${lastItem}`)?.setAttribute('style' , "color:#285999;border-left: 3px solid #285999")
        }
        if(window.location.href === "http://localhost:3000/memberarea/bookmarks")
        {
                document?.getElementById('main')?.setAttribute("style" , "box-shadow:none;")
        }
    }
    useEffect(() => {
        borderHandler(lastSegment)
    }, [])
    const logOut = () => {
        localStorage.clear()
    }
    

    const classes = stylesForSwiper();
      const [state, setState] = React.useState({
        top: false,
      });
  
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
      const list = (anchor) => (
        <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
        <div className="swiperCMember">
            <div className="menu"> <p>{JSON.parse(localStorage.getItem('LoginUserData')).name}</p>  <button onClick={toggleDrawer(anchor, false)}> &#10006;</button></div>
            <aside className="aside">
                <Link to="/memberarea" className="contact"> <button className="btnmemberarea"    id="btn1"  onClick={() => clickHandler(1)}>                 <AccountCircleIcon/> Şəxsi Kabinet                  </button></Link>
                <Link to="/memberarea/password" className="password"><button className="btnpassword"   id="btn2"  onClick={() => clickHandler(2)}>                 <LockIcon/> Şifrə              </button></Link>
                <Link to="/memberarea/address" className="address"> <button className="btnaddress"   id="btn3"  onClick={() => clickHandler(3)}>                  <LocationOnIcon/>Ünvan                 </button></Link>
                <Link to="/memberarea/bookmarks" className="bookmarks"> <button className="btnbookmarks"   id="btn4"  onClick={() => clickHandler(4)}>              <FavoriteIcon/> Seçilmişlər          </button></Link>
                <Link to="/memberarea/orders" className="orders">   <button className="btnorders"   id="btn5"  onClick={() => clickHandler(5)}>                  <DescriptionIcon/> Sifarişlər                    </button></Link>
                <Link to="/memberarea/reminders" className="reminders"  ><button className="btnreminders"   id="btn6"  onClick={() => clickHandler(6)}>            <NotificationsIcon/> Bildirişlər                             </button></Link>
                <Link to="/memberarea/bonuses" className="bonuses">     <button className="btnbonuses"   id="btn7"  onClick={() => clickHandler(7)}>              <MonetizationOnIcon/>  Bonuslar                   </button></Link>
                <Link to="/memberarea/deposite" className="deposites"> <button className="btndeposite"   id="btn8"  onClick={() => clickHandler(8)}>               <AccountBalanceWalletIcon/>Depozitlər                </button></Link>
                <Link to="/memberarea/free-shipping" className="freeShipping"> <button className="btnfree-shipping"   id="btn9"  onClick={() => clickHandler(9)}>       <LocalShippingIcon/> Çatdırılma                    </button> </Link>
                <Link to="/memberarea/reviews" className="reviews">       <button id="btnreviews"   id="btn10"  onClick={() => clickHandler(10)}>            <ChatBubbleIcon/>  Şərhlər                    </button> </Link>
                <hr/>
                <a href="/" >       <button onClick={logOut}>            <ExitToAppIcon/> Log out                   </button></a>
            </aside>
        </div>
    </div>
    );



    return (
        <Router>
        <div className="memberAreaCont">
            { !memberMQ &&
                <React.Fragment key={'left'}>
                    <button className='memberAreaSwiper' onClick={toggleDrawer('left', true)}><ListIcon/>  <span>Kabinet</span> </button> 
                    <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                        {list('left')}
                    </Drawer> 
                </React.Fragment>
            }
            
            {
                memberMQ &&
                    <aside className="aside">
                    <Link to="/memberarea" className="contact"> <button className="btnmemberarea"    id="btn1"  onClick={() => clickHandler(1)}>                 <AccountCircleIcon/> Şəxsi Kabinet                  </button></Link>
                    <Link to="/memberarea/password" className="password"><button className="btnpassword"   id="btn2"  onClick={() => clickHandler(2)}>                 <LockIcon/> Şifrə              </button></Link>
                    <Link to="/memberarea/address" className="address"> <button className="btnaddress"   id="btn3"  onClick={() => clickHandler(3)}>                  <LocationOnIcon/>Ünvan                 </button></Link>
                    <Link to="/memberarea/bookmarks" className="bookmarks"> <button className="btnbookmarks"   id="btn4"  onClick={() => clickHandler(4)}>              <FavoriteIcon/> Seçilmişlər          </button></Link>
                    <Link to="/memberarea/orders" className="orders">   <button className="btnorders"   id="btn5"  onClick={() => clickHandler(5)}>                  <DescriptionIcon/> Sifarişlər                    </button></Link>
                    <Link to="/memberarea/reminders" className="reminders"  ><button className="btnreminders"   id="btn6"  onClick={() => clickHandler(6)}>            <NotificationsIcon/> Bildirişlər                             </button></Link>
                    <Link to="/memberarea/bonuses" className="bonuses">     <button className="btnbonuses"   id="btn7"  onClick={() => clickHandler(7)}>              <MonetizationOnIcon/>  Bonuslar                   </button></Link>
                    <Link to="/memberarea/deposite" className="deposites"> <button className="btndeposite"   id="btn8"  onClick={() => clickHandler(8)}>               <AccountBalanceWalletIcon/>Depozitlər                </button></Link>
                    <Link to="/memberarea/free-shipping" className="freeShipping"> <button className="btnfree-shipping"   id="btn9"  onClick={() => clickHandler(9)}>       <LocalShippingIcon/> Çatdırılma                    </button> </Link>
                    <Link to="/memberarea/reviews" className="reviews">       <button id="btnreviews"   id="btn10"  onClick={() => clickHandler(10)}>            <ChatBubbleIcon/>  Şərhlər                    </button> </Link>
                    <hr/>
                    <a href="/" >       <button onClick={logOut}>            <ExitToAppIcon/> Log out                   </button></a>
                </aside>
            }
            
            <main className="main" id="main">
                <Switch>
                    <Route path="/memberarea/password"><PasswordUpdate/></Route>
                    <Route path="/memberarea/address/add">{addAddress}</Route>
                    <Route path="/memberarea/address">{address}</Route>
                    <Route path="/memberarea/bookmarks"><Bookmarks/></Route>
                    <Route path="/memberarea/orders"><Orders/></Route>
                    <Route path="/memberarea/reminders">{reminders}</Route>
                    <Route path="/memberarea/bonuses">{bonuses}</Route>
                    <Route path="/memberarea/deposite">{deposites}</Route>
                    <Route path="/memberarea/free-shipping">{freeShiping}</Route>
                    <Route path="/memberarea/reviews">{reviews}</Route>
                    <Route path="/memberarea/output">{output}</Route>
                    <Route path="/memberarea/"><Contacts/></Route>
                </Switch>
            </main>
        </div>
        </Router>
    )
}

export default MemberArea

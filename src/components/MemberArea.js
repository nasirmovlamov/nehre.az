import React, { useState, useRef, useEffect, useContext } from "react";
import "../assets/css/memberArea.css";
import avatar from "../assets/images/avatar.jpg";
import Button1 from "./Button1";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
  useLocation,
} from "react-router-dom";
import gogerti from "../assets/images/gogerti.jpg";
import { ProductListingContext } from "../components/ProductListingProvider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import LockIcon from "@material-ui/icons/Lock";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DescriptionIcon from "@material-ui/icons/Description";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { makeStyles } from "@material-ui/core/styles";
import ItemCard from "./ItemCard";
import Review from "./Review";
import Reviews from "./Reviews";
import Cabinet from "./Cabinet";
import Contacts from "./Contacts";
import PasswordUpdate from "./PasswordUpdate";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ListIcon from "@material-ui/icons/List";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import Orders from "./Orders";
import Bookmarks from "./Bookmarks";
import AddAddress from "./AddAddress";
import Address from "./Address";
import Reminders from "./Reminders";
import Bonuses from "./Bonuses";
import Deposites from "./Deposites";
import Shipping from "./Shipping";
import MemberAreaReviews from "./MemberAreaReviews";
import AddressEdit from "./AddressEdit";



const stylesForSwiper = makeStyles({
  list: {
    width: "100%",
  },
  fullList: {
    width: "100%",
  },
});


function MemberArea(props) {
  function output  () {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href ='/'
  }

  const context = useContext(ProductListingContext)
  const {ProdutData, setProdutData, logout, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,loader, setloader, StaticData,setStaticData} = context
  const memberMQ = useMediaQuery("(min-width:900px)");
  const url = window.location.href;
  const lastSegment = url.split("/").pop();
 

  

//Swiper{
  const classes = stylesForSwiper();
  const [state, setState] = React.useState({
    top: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="swiperCMember">
        <div className="menu">
          <p>{JSON.parse(localStorage.getItem("LoginUserData")).name}</p>{" "}
          <button onClick={toggleDrawer(anchor, false)}> &#10006;</button>
        </div>
        <aside className="aside">
          <Link to="/memberarea" className="contact" >
            <button
              className="btnmemberarea"
              id="btn1"
            >
              <AccountCircleIcon />  {(lang === "AZ" && `Şəxsi Kabinet`) || (lang === "EN" && `Cabinet`) || (lang === "RU" && `Личный кабинет`)}
            </button>
          </Link>
          <Link to="/memberarea/password" className="password">
            <button
              className="btnpassword"
              id="btn2"
            >
              <LockIcon /> {(lang === "AZ" && `Şifrə`) || (lang === "EN" && `Password`) || (lang === "RU" && `Пароль`)}
            </button>
          </Link>
          <Link to="/memberarea/address" className="address">
            <button
              className="btnaddress"
              id="btn3"
            >
              <LocationOnIcon />
              {(lang === "AZ" && `Ünvan`) || (lang === "EN" && `Address`) || (lang === "RU" && `Адрес`)}
            </button>
          </Link>
          <Link to="/memberarea/bookmarks" className="bookmarks">
            <button
              className="btnbookmarks"
              id="btn4"
            >
              <FavoriteIcon /> {(lang === "AZ" && `Seçilmişlər`) || (lang === "EN" && `Selected`) || (lang === "RU" && `Выбрано`)}
            </button>
          </Link>
          <Link to="/memberarea/orders" className="orders">
            <button
              className="btnorders"
              id="btn5"
            >
              <DescriptionIcon />  {(lang === "AZ" && `Sifarişlər`) || (lang === "EN" && `Orders`) || (lang === "RU" && `Заказы`)}
            </button>
          </Link>
          <Link to="/memberarea/reminders" className="reminders">
            <button
              className="btnreminders"
              id="btn6"
            >
              <NotificationsIcon /> {(lang === "AZ" && `Bildirişlər`) || (lang === "EN" && `Notifications`) || (lang === "RU" && `Уведомления`)}
            </button>
          </Link>
          <Link to="/memberarea/bonuses" className="bonuses">
            <button
              className="btnbonuses"
              id="btn7"
            >
              <MonetizationOnIcon /> {(lang === "AZ" && `Bonuslar`) || (lang === "EN" && `Bonuses`) || (lang === "RU" && `Бонусы`)}
            </button>
          </Link>
          <Link to="/memberarea/deposite" className="deposites">
            <button
              className="btndeposite"
              id="btn8"
            >
              <AccountBalanceWalletIcon />
              {(lang === "AZ" && `Depozitlər`) || (lang === "EN" && `Deposites`) || (lang === "RU" && `Депозиты`)}
            </button>
          </Link>
          <Link to="/memberarea/free-shipping" className="freeShipping">
            <button
              className="btnfree-shipping"
              id="btn9"
            >
              <LocalShippingIcon />  {(lang === "AZ" && `Çatdırılma`) || (lang === "EN" && `Delivery`) || (lang === "RU" && `Доставка`)}
            </button>
          </Link>
          <Link to="/memberarea/reviews" className="reviews">
            <button id="btnreviews" id="btn10" >
              <ChatBubbleIcon /> {(lang === "AZ" && `Şərhlər`) || (lang === "EN" && `Comments`) || (lang === "RU" && `Комментарии`)}
            </button>
          </Link>
          <hr />
          <a href="/">
            <button onClick={logout}>
              <ExitToAppIcon />{(lang === "AZ" && ` Çıxış`) || (lang === "EN" && `Log out`) || (lang === "RU" && `Выйти`)}
            </button>
          </a>
        </aside>
      </div>
    </div>
  );
  //}Swiper

  const location = useLocation();


  const buttonBorder = {
        color: "#285999", 
        borderLeft: "3px solid #285999"
  }

  const buttonBorderNormal = {
    color:"#7d7068",
    borderLeft: "3px solid white"
  }

  const styler = (link) => {
    if (location.pathname === link) {
      return buttonBorder
    } 
    else 
    {
      return buttonBorderNormal
    }
  }                                       

  

  return (
      <div className="memberAreaCont pagescroll">
        {!memberMQ && (
          <React.Fragment key={"left"}>
            <button
              className="memberAreaSwiper"
              onClick={toggleDrawer("left", true)}
            >
              <ListIcon /> <span>{(lang === "AZ" && `Şəxsi Kabinet`) || (lang === "EN" && `Cabinet`) || (lang === "RU" && `Личный кабинет`)}</span>{" "}
            </button>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </React.Fragment>
        )}

        {memberMQ && (
          <aside className="aside">
            <Link to="/memberarea" className="contact">
              <button style={styler('/memberarea')} >
                <AccountCircleIcon />  {(lang === "AZ" && `Şəxsi Kabinet `) || (lang === "EN" && `Personal Cabinet`) || (lang === "RU" && `Личный кабинет`)}
              </button>
            </Link>

            <Link to="/memberarea/password" className="password">
              <button  style={styler('/memberarea/password')} >
                <LockIcon />   {(lang === "AZ" && `Şifrə`) || (lang === "EN" && `Password`) || (lang === "RU" && `Пароль`)}
              </button>
            </Link>

            <Link to="/memberarea/address" className="address">
              <button style={styler('/memberarea/address')}  >
                <LocationOnIcon />
                {(lang === "AZ" && `Ünvan`) || (lang === "EN" && `Address`) || (lang === "RU" && `Адрес`)}
              </button>
            </Link>

            <Link to="/memberarea/bookmarks" className="bookmarks">
              <button style={styler('/memberarea/bookmarks')}>
                <FavoriteIcon /> 
                {(lang === "AZ" && `Seçilmişlər`) || (lang === "EN" && `Selected`) || (lang === "RU" && `Выбрано`)}
              </button>
            </Link>

            <Link to="/memberarea/orders" className="orders">
              <button  style={styler('/memberarea/orders')}>
                <DescriptionIcon /> 
                {(lang === "AZ" && `Sifarişlər`) || (lang === "EN" && `Orders`) || (lang === "RU" && `Заказы`)}
              </button>
            </Link>

            <Link to="/memberarea/reminders" className="reminders">
              <button style={styler('/memberarea/reminders')} >
                <NotificationsIcon /> 
                {(lang === "AZ" && `Bildirişlər`) || (lang === "EN" && `Notifications`) || (lang === "RU" && `Уведомления`)}
              </button>
            </Link>

            <Link to="/memberarea/bonuses" className="bonuses">
              <button style={styler('/memberarea/bonuses')}>
                <MonetizationOnIcon /> 
                {(lang === "AZ" && `Bonuslar`) || (lang === "EN" && `Bonuses`) || (lang === "RU" && `Бонусы`)}
              </button>
            </Link>

            <Link to="/memberarea/deposite" className="deposites">
              <button style={styler('/memberarea/deposite')}>
                <AccountBalanceWalletIcon />
                {(lang === "AZ" && `Depozitlər`) || (lang === "EN" && `Deposites`) || (lang === "RU" && `Депозиты`)}
              </button>
            </Link>

            <Link to="/memberarea/free-shipping" className="freeShipping">
              <button style={styler('/memberarea/free-shipping')}>
                <LocalShippingIcon /> 
                {(lang === "AZ" && `Çatdırılma`) || (lang === "EN" && `Delivery`) || (lang === "RU" && `Доставка`)}
              </button>
            </Link>
            <Link to="/memberarea/reviews" className="reviews">
              <button  style={styler('/memberarea/reviews')}>
                <ChatBubbleIcon /> 
                {(lang === "AZ" && `Şərhlər`) || (lang === "EN" && `Comments`) || (lang === "RU" && `Комментарии`)}
              </button>
            </Link>
            <hr />
            <a href="/">
              <button onClick={logout}>
                <ExitToAppIcon /> 
                {(lang === "AZ" && `Çıxış`) || (lang === "EN" && `Exit`) || (lang === "RU" && `Exit`)}
              </button>
            </a>
          </aside>
        )}
        <main className="main" id="main">
          <Switch>
            <Route path="/memberarea/password">
              <PasswordUpdate />
            </Route>
            <Route path="/memberarea/address/edit/:id">
                <AddressEdit />
            </Route>
            <Route path="/memberarea/address/add">
                <AddAddress/>
            </Route>
            <Route path="/memberarea/address">
                <Address/>
            </Route>
            <Route path="/memberarea/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/memberarea/orders">
              <Orders />
            </Route>
            <Route path="/memberarea/reminders">
                <Reminders/>
            </Route>
            <Route path="/memberarea/bonuses">
                <Bonuses/>
            </Route>
            <Route path="/memberarea/deposite">
                <Deposites/>
            </Route>
            <Route path="/memberarea/free-shipping">
                <Shipping/>
            </Route>
            
            <Route path="/memberarea/reviews">
                <MemberAreaReviews />
            </Route>
            <Route path="/memberarea/output">
                {output}
            </Route>
            <Route path="/memberarea/">
              <Contacts/>
            </Route>
          </Switch>
        </main>
      </div>
  );
}

export default MemberArea;

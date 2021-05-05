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

function output  () {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href ='/'
}
function MemberArea(props) {
  const memberMQ = useMediaQuery("(min-width:900px)");
  const [UserData, setUserData] = useState(JSON.parse(localStorage.getItem('LoginUserData')))
  const clickHandler = (num) => {
    for (let i = 1; i < 11; i++) {
      document
        .getElementById(`btn${i}`)
        .setAttribute(
          "style",
          "color: #7d7068;border-left: 3px solid transparent;"
        );
      document
        ?.getElementById("main")
        ?.setAttribute("style", "box-shadow: 3px 1px 40px  rgba(0,0,0,0.2);");
    }
    if (num === 6 || num === 5) {
      document
        ?.getElementById("main")
        ?.setAttribute("style", "box-shadow: none;");
    }
    document
      .getElementById(`btn${num}`)
      .setAttribute("style", "color:#285999;border-left: 3px solid #285999");
  };

  const url = window.location.href;
  const lastSegment = url.split("/").pop();
  const borderHandler = (lastItem) => {
    if (lastItem !== undefined && lastItem !== null) {
      document
        ?.querySelector(`.btn${lastItem}`)
        ?.setAttribute("style", "color:#285999;border-left: 3px solid #285999");
    }
    if (window.location.href === "http://localhost:3000/memberarea/bookmarks") {
      document
        ?.getElementById("main")
        ?.setAttribute("style", "box-shadow:none;");
    }
  };
  useEffect(() => {
    borderHandler(lastSegment);
  }, []);
  const logOut = () => {
    localStorage.clear();
  };

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
          {" "}
          <p>{JSON.parse(localStorage.getItem("LoginUserData")).name}</p>{" "}
          <button onClick={toggleDrawer(anchor, false)}> &#10006;</button>
        </div>
        <aside className="aside">
          <Link to="/memberarea" className="contact">
            {" "}
            <button
              className="btnmemberarea"
              id="btn1"
              onClick={() => clickHandler(1)}
            >
              {" "}
              <AccountCircleIcon /> Şəxsi Kabinet{" "}
            </button>
          </Link>
          <Link to="/memberarea/password" className="password">
            <button
              className="btnpassword"
              id="btn2"
              onClick={() => clickHandler(2)}
            >
              {" "}
              <LockIcon /> Şifrə{" "}
            </button>
          </Link>
          <Link to="/memberarea/address" className="address">
            {" "}
            <button
              className="btnaddress"
              id="btn3"
              onClick={() => clickHandler(3)}
            >
              {" "}
              <LocationOnIcon />
              Ünvan{" "}
            </button>
          </Link>
          <Link to="/memberarea/bookmarks" className="bookmarks">
            {" "}
            <button
              className="btnbookmarks"
              id="btn4"
              onClick={() => clickHandler(4)}
            >
              {" "}
              <FavoriteIcon /> Seçilmişlər{" "}
            </button>
          </Link>
          <Link to="/memberarea/orders" className="orders">
            {" "}
            <button
              className="btnorders"
              id="btn5"
              onClick={() => clickHandler(5)}
            >
              {" "}
              <DescriptionIcon /> Sifarişlər{" "}
            </button>
          </Link>
          <Link to="/memberarea/reminders" className="reminders">
            <button
              className="btnreminders"
              id="btn6"
              onClick={() => clickHandler(6)}
            >
              {" "}
              <NotificationsIcon /> Bildirişlər{" "}
            </button>
          </Link>
          <Link to="/memberarea/bonuses" className="bonuses">
            {" "}
            <button
              className="btnbonuses"
              id="btn7"
              onClick={() => clickHandler(7)}
            >
              {" "}
              <MonetizationOnIcon /> Bonuslar{" "}
            </button>
          </Link>
          <Link to="/memberarea/deposite" className="deposites">
            {" "}
            <button
              className="btndeposite"
              id="btn8"
              onClick={() => clickHandler(8)}
            >
              {" "}
              <AccountBalanceWalletIcon />
              Depozitlər{" "}
            </button>
          </Link>
          <Link to="/memberarea/free-shipping" className="freeShipping">
            {" "}
            <button
              className="btnfree-shipping"
              id="btn9"
              onClick={() => clickHandler(9)}
            >
              {" "}
              <LocalShippingIcon /> Çatdırılma{" "}
            </button>{" "}
          </Link>
          <Link to="/memberarea/reviews" className="reviews">
            {" "}
            <button id="btnreviews" id="btn10" onClick={() => clickHandler(10)}>
              {" "}
              <ChatBubbleIcon /> Şərhlər{" "}
            </button>{" "}
          </Link>
          <hr />
          <a href="/">
            {" "}
            <button onClick={logOut}>
              {" "}
              <ExitToAppIcon /> Log out{" "}
            </button>
          </a>
        </aside>
      </div>
    </div>
  );
  //}Swiper

  return (
    <Router>
      <div className="memberAreaCont">
        {!memberMQ && (
          <React.Fragment key={"left"}>
            <button
              className="memberAreaSwiper"
              onClick={toggleDrawer("left", true)}
            >
              <ListIcon /> <span>Kabinet</span>{" "}
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
              <button className="btnmemberarea" id="btn1" onClick={() => clickHandler(1)}>
                <AccountCircleIcon /> Şəxsi Kabinet
              </button>
            </Link>

            <Link to="/memberarea/password" className="password">
              <button className="btnpassword" id="btn2" onClick={() => clickHandler(2)}>
                <LockIcon /> Şifrə
              </button>
            </Link>

            <Link to="/memberarea/address" className="address">
              <button className="btnaddress" id="btn3" onClick={() => clickHandler(3)}>
                <LocationOnIcon />
                Ünvan
              </button>
            </Link>

            <Link to="/memberarea/bookmarks" className="bookmarks">
              <button className="btnbookmarks" id="btn4" onClick={() => clickHandler(4)}>
                <FavoriteIcon /> Seçilmişlər
              </button>
            </Link>

            <Link to="/memberarea/orders" className="orders">
              <button className="btnorders" id="btn5" onClick={() => clickHandler(5)}>
                <DescriptionIcon /> Sifarişlər
              </button>
            </Link>

            <Link to="/memberarea/reminders" className="reminders">
              <button className="btnreminders" id="btn6" onClick={() => clickHandler(6)}>
                <NotificationsIcon /> Bildirişlər
              </button>
            </Link>

            <Link to="/memberarea/bonuses" className="bonuses">
              <button className="btnbonuses" id="btn7" onClick={() => clickHandler(7)}>
                <MonetizationOnIcon /> Bonuslar
              </button>
            </Link>

            <Link to="/memberarea/deposite" className="deposites">
              <button className="btndeposite" id="btn8" onClick={() => clickHandler(8)}>
                <AccountBalanceWalletIcon />
                Depozitlər
              </button>
            </Link>

            <Link to="/memberarea/free-shipping" className="freeShipping">
              <button className="btnfree-shipping" id="btn9" onClick={() => clickHandler(9)}>
                <LocalShippingIcon /> Çatdırılma
              </button>
            </Link>
            <Link to="/memberarea/reviews" className="reviews">
              <button id="btnreviews" id="btn10" onClick={() => clickHandler(10)}>
                <ChatBubbleIcon /> Şərhlər
              </button>
            </Link>
            <hr />
            <a href="/">
              <button onClick={logOut}>
                <ExitToAppIcon /> Log out
              </button>
            </a>
          </aside>
        )}
        <main className="main" id="main">
          <Switch>
            <Route path="/memberarea/password">
              <PasswordUpdate />
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
            <Route path="/memberarea/reviews/:id">
                <AddressEdit UserId={UserData.id}/>
            </Route>
            <Route path="/memberarea/reviews">
                <MemberAreaReviews UserId={UserData.id}/>
            </Route>
            <Route path="/memberarea/output">
                {output}
            </Route>
            <Route path="/memberarea/">
              <Contacts />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default MemberArea;

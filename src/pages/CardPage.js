import React, {useEffect, useState, useContext} from 'react'
import "../assets/css/cardPage.css"
import clock from "../assets/images/clock.svg"
import Button1 from '../components/Button1'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import avatar from "../assets/images/avatar.jpg"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash'
import CheckoutCard from '../components/CheckoutCard';
import axios from 'axios';
import info from "../assets/images/info.svg"
import InfoIcon from '@material-ui/icons/Info';
import {ProductListingContext} from '../components/ProductListingProvider'
import CircularProgress from '@material-ui/core/CircularProgress';
import { TramRounded } from '@material-ui/icons';
import moment from 'moment';
import { set } from 'js-cookie'
import 'moment/locale/az';
import 'moment/locale/ru';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CardPage(props) {
    const context = useContext(ProductListingContext)
    const {ProdutData, UserStatus , openCheckoutF, setProdutData, closeBucketF, openBucketF, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,clearBucket ,setItems, setMinOrder, Items, MinOrder} = context
    const notifyLogin = () => toast.warning((lang === "AZ" && `Hesabınıza daxil olun!` || lang === "EN" && `Log in to your account!` || lang === "RU" && `Войдите в свою учетную запись!`) , {draggable: true,});

    const functionHandler = () => {
        openBucketF()
        closeBucketF()
    }
    const [loader, setloader] = useState(false)
    
    

    
    
    
    

    const discountHandler = (discount , count , cost) => {
        if (discount !== 0 && discount !== null  && discount !== undefined) {
            var discountPrice = 0;
            discountPrice =  ((parseInt(cost) - (parseInt(count) * parseInt(discount)) / 100))
            return parseInt(discountPrice * parseInt(count));         
        } 
        else {
            return parseInt(cost) * parseInt(count)
        }
    }

    



    moment.locale(lang)

    //Date Problems
    const today = new Date()
    const [nextDelivery, setnextDelivery] = useState()

    const dateSorter = () => {
        var sortedArr = []
        for (let i = 1; i <= 7; i++) {
            if (DateGoods.includes(String(i))) {
                const tomorrow = new Date(today)
                tomorrow.setDate(tomorrow.getDate() + 1)
                const sortedday = new Date()
                sortedday.setDate(tomorrow.getDate() + (i + 7 - tomorrow.getDay()) % 7);
                sortedArr.push(sortedday)
            }
        }
        sortedArr = sortedArr.sort((a, b) => b - a)
        console.log(sortedArr)
        var nextday = moment(sortedArr[sortedArr.length - 1]).format( 'dddd, D MMMM');
        setnextDelivery(nextday)
    }

    useEffect(() => {
        dateSorter()
    }, [DateGoods])




    const goCheckout = () => {
        if (UserStatus) {
            openCheckoutF()
        }
        else 
        {
            notifyLogin()
            closeBucketF()
            OpenLoginF()
        }
    }

    return (
        <div className="cardCont">
           
            <main className="mainSide">
                <p className="title">
                    <p className="basketTitle">{lang === "AZ" && `Səbət` || lang === "EN" && `Basket` || lang === "RU" && `Корзина`} {FinalPrice < parseInt(MinOrder)   ?  <div className="minOrder"> <InfoIcon/> {lang === "AZ" && ` Minimum sifariş qiyməti` || lang === "EN" && `Minimum` || lang === "RU" && `Минимум`} {money === '₼' ? MinOrder : Math.floor(MinOrder / 1.7) } {money}</div> : " " }</p>
                    <hr/>
                </p>
                <div className="gridCont1">

                        {
                            !loader 
                            &&
                            <>
                                {ProdutData.map( product => <CheckoutCard product={product.product}    price={Math.floor(product.product?.qiymet)} />)}
                            </>
                        }
                        {loader &&  <div className="loader"><CircularProgress color="secondary" /></div>}
                        {!loader && ProdutData.length === 0 && <div className="noproduct"><RemoveShoppingCartIcon/></div>}
                </div>
            </main>
            
            <aside className="aside">
                <div className="mainPart">
                    <div className="topPart">
                        <div className="buttonCont"><button onClick={() => closeBucketF()} className="removeModalBtn">×</button></div>
                        <p className="text1"><img width="12px" src={clock} alt=""/> {lang === "AZ" && `Ən tez çatdırılma müddəti` || lang === "EN" && `Delivery soon` || lang === "RU" && `Доставка скоро`} </p>
                        <p className="text">{nextDelivery}</p>
                    </div>
                    
                    <div className="downPart">
                        <div className="goods"><p className="key">{lang === "AZ" && `Ümumi paketin çəkisi` || lang === "EN" && `Weight Parcel` || lang === "RU" && `Вес посылки`}</p> <p className="value ">{Math.abs(FinalWeight.toFixed(2))} {(lang === "AZ" && `kq`) || (lang === "EN" && 'kq') || (lang === "RU" && 'кг')}</p> </div> 
                        <div className="goods"><p className="key">{lang === "AZ" && `Ümumi məhsulların sayı` || lang === "EN" && `Total number of products` || lang === "RU" && `Общее количество продуктов`} </p> <p className="value ">{FinalGoods}</p> </div> 
                        <div className="cost"><p className="key"> {lang === "AZ" && `Yükun Qiymət` || lang === "EN" && `Final Price` || lang === "RU" && `Окончательная цена`}</p> <p className="value value2"> {money === '₼' ? FinalPrice : ((money === "₼" ? FinalPrice : (FinalPrice / 1.7)).toFixed(1) )} {money} </p> </div> 
                        <Button1 disabled={FinalPrice < MinOrder ? true : false} value={lang === "AZ" && `Ödəniş səhifəsinə keçid edin` || lang === "EN" && `Go to payment` || lang === "RU" && `Перейти к оплате`} color="#085096" function={goCheckout} /> 
                        <p className="cashback">{lang === "AZ" && `Alacağınız ümumi bonus` || lang === "EN" && `Bonus` || lang === "RU" && `Бонус`}  {money === '₼' ? FinalBonus : (FinalBonus/1.7).toFixed(2)}  {money} </p>
                    </div>
                </div>
                <button   className="clearBucket" onClick={clearBucket}><DeleteIcon/>{lang === "AZ" && ` Səbəti təmizlə` || lang === "EN" && `Clear the basket` || lang === "RU" && `Очистить корзину`} </button>
            </aside>
        </div>
    )
}

export default CardPage

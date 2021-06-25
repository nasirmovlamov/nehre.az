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

function CardPage(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus] = useContext(ProductListingContext)
    
    const functionHandler = () => {
        if(props.UserId)
        props.functionOpenCheckoutPage()
        props.functionClose()
    }
    const [Items, setItems] = useState(ProdutData)
    const [MinOrder, setMinOrder] = useState()
    const [Product, setProduct] = useState()
    const [loader, setloader] = useState(false)
    useEffect(() => {
        setloader(true)
        axios.get(`https://nehra.az/public/api/product/${props.id}`)
        .then(res => (setProduct(res.data) , setloader(false)) )
        .catch(err=> (console.log(err) , setloader(false)))

        axios.get('https://nehra.az/public/api/settings/')
             .then(res => setMinOrder(res.data.min_order_amount))
             .then(err => console.log(err))
    } , [])
    

    
    const clearBucket = () => {
        setFinalPrice(0)
        setFinalGoods(0)
        setFinalWeight(0)
        setFinalBonus(0)
        setProdutData([])
        setItems([])
        localStorage.setItem('ProdutData' , JSON.stringify([]))
        localStorage.setItem('FinalGoods' , (0))
        localStorage.setItem('FinalPrice' , (0))
        localStorage.setItem('FinalWeight' , (0))
        localStorage.setItem('FinalBonus' , (0))
        localStorage.setItem('DateGoods' , JSON.stringify([]))
    }
    
    const deleteCard = (num , price, dates) => {
        var index = ProdutData.findIndex(x=> x.id === num);
        setFinalPrice(parseInt(FinalPrice) - parseInt(ProdutData[index]?.cost * ProdutData[index]?.count))
        setFinalBonus(parseInt(FinalBonus) - parseInt(ProdutData[index]?.bonus * ProdutData[index]?.count))
        setFinalGoods(parseInt(FinalGoods) - parseInt(ProdutData[index]?.count) )
        if (parseInt(ProdutData[index]?.unitType) === 4) {
            setFinalWeight(parseFloat(FinalWeight) - ((parseFloat(ProdutData[index]?.weight) / 1000) * parseInt(ProdutData[index]?.count)) )
            localStorage.setItem('FinalWeight' , (FinalWeight - ((parseFloat(ProdutData[index]?.weight) / 1000) * ProdutData[index]?.count ) ))
        }
        else 
        {
            setFinalWeight(parseFloat(FinalWeight) - (parseFloat(ProdutData[index]?.weight) * parseInt(ProdutData[index]?.count) ) )
            localStorage.setItem('FinalWeight' , (FinalWeight - (parseFloat(ProdutData[index]?.weight) * ProdutData[index]?.count ) ))
        }
        setProdutData(ProdutData.filter((item) => item.id !== num))
        setItems(Items.filter((item) => item.id !== num))
        var testarr = ProdutData.filter((item) => item.id !== num)
        const datesss = []
        const nonDeletedP = Items.filter((item) => item.id !== num)
        for (let i = 0; i < nonDeletedP.length; i++) {
            for (let j = 0; j < nonDeletedP[i]?.date?.length; j++) {
                datesss.push(nonDeletedP[i]?.date[j])
            }
        }
        let uniqueDates = [...new Set(datesss)];

        setDateGoods(uniqueDates)
        localStorage.setItem('FinalPrice' , (FinalPrice - (ProdutData[index]?.cost * ProdutData[index]?.count)))
        localStorage.setItem('FinalGoods' , (FinalGoods - ProdutData[index]?.count ))
        localStorage.setItem('ProdutData' , (JSON.stringify(ProdutData.filter((item) => item.id !== num))))   
        localStorage.setItem('DateGoods' , (JSON.stringify(uniqueDates)))
    }

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
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const monday = new Date()
    monday.setDate(tomorrow.getDate() + (1 + 7 - tomorrow.getDay()) % 7);
    const tuesday = new Date()
    tuesday.setDate(tomorrow.getDate() + (2 + 7 - tomorrow.getDay()) % 7);
    const wednesday = new Date()
    wednesday.setDate(tomorrow.getDate() + (3 + 7 - tomorrow.getDay()) % 7);
    const thursday = new Date()
    thursday.setDate(tomorrow.getDate() + (4 + 7 - tomorrow.getDay()) % 7);
    const friday = new Date()
    friday.setDate(tomorrow.getDate() + (5 + 7 - tomorrow.getDay()) % 7);
    const saturday = new Date()
    saturday.setDate(tomorrow.getDate() + (6 + 7 - tomorrow.getDay()) % 7);
    const sunday = new Date()
    sunday.setDate(tomorrow.getDate() + (7 + 7 - tomorrow.getDay()) % 7);

    var newmonday = moment(monday).locale('az').format( 'dddd, D MMMM');
    var newtuesday = moment(tuesday).locale('az').format( 'dddd, D MMMM');
    var newwednesday = moment(wednesday).locale('az').format( 'dddd, D MMMM');
    var newthursday = moment(thursday).locale('az').format( 'dddd, D MMMM');
    var newfriday = moment(friday).locale('az').format( 'dddd, D MMMM');
    var newsaturday = moment(saturday).locale('az').format( 'dddd, D MMMM');
    var newsunday = moment(sunday).locale('az').format( 'dddd, D MMMM');

    const [nextDelivery, setnextDelivery] = useState()

    const dateSorter = () => {
        var sortedArr = []
        console.log(DateGoods);
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






    return (
        <div className="cardCont">
            
            <main className="mainSide">
                <p className="title">
                    <p className="basketTitle">{lang === "AZ" && `Səbət` || lang === "EN" && `Basket` || lang === "RU" && `Корзина`} {FinalPrice < MinOrder   ?  <div className="minOrder"> <InfoIcon/> {lang === "AZ" && ` Minimum sifariş qiyməti` || lang === "EN" && `Minimum` || lang === "RU" && `Минимум`} {money === '₼' ? MinOrder : Math.floor(MinOrder / 1.7) } {money}</div> : " " }</p>
                    <hr/>
                </p>
                <div className="gridCont1">

                        {
                            !loader 
                            &&
                            <>
                                {ProdutData.map( element => <CheckoutCard key={element.id} deleteCard={deleteCard}  id={element.id}  delivery={element.date} unitType={element.unitType} bonus={element.bonus}/>)}
                            </>
                        }
                        {loader &&  <div className="loader"><CircularProgress color="secondary" /></div>}
                        {!loader && ProdutData.length === 0 && <div className="noproduct"><RemoveShoppingCartIcon/></div>}
                </div>
            </main>
            
            <aside className="aside">
                <div className="mainPart">
                    <div className="topPart">
                        <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
                        <p className="text1"><img width="12px" src={clock} alt=""/> {lang === "AZ" && `Ən tez çatdırılma müddəti` || lang === "EN" && `Delivery soon` || lang === "RU" && `Доставка скоро`} </p>
                        <p className="text">{nextDelivery}</p>
                    </div>
                    
                    <div className="downPart">
                        <div className="goods"><p className="key">{lang === "AZ" && `Ümumi paketin çəkisi` || lang === "EN" && `Weight Parcel` || lang === "RU" && `Вес посылки`}</p> <p className="value ">{Math.abs(FinalWeight.toFixed(2))} {(lang === "AZ" && `kq`) || (lang === "EN" && 'kq') || (lang === "RU" && 'кг')}</p> </div> 
                        <div className="goods"><p className="key">{lang === "AZ" && `Ümumi məhsulların sayı` || lang === "EN" && `Total number of products` || lang === "RU" && `Общее количество продуктов`} </p> <p className="value ">{FinalGoods}</p> </div> 
                        <div className="cost"><p className="key"> {lang === "AZ" && `Yükun Qiymət` || lang === "EN" && `Final Price` || lang === "RU" && `Окончательная цена`}</p> <p className="value value2"> {money === '₼' ? FinalPrice : ((money === "₼" ? FinalPrice : (FinalPrice / 1.7)).toFixed(1) )} {money} </p> </div> 
                        <Button1 disabled={FinalPrice < MinOrder ? true : false} value={lang === "AZ" && `Ödəniş səhifəsinə keçid edin` || lang === "EN" && `Go to payment` || lang === "RU" && `Перейти к оплате`} color="#085096" function={props.functionOpenCheckoutPage} /> 
                        <p className="cashback">{lang === "AZ" && `Alacağınız ümumi bonus` || lang === "EN" && `Bonus` || lang === "RU" && `Бонус`}  {money === '₼' ? FinalBonus : (FinalBonus/1.7).toFixed(2)}  {money} </p>
                    </div>
                </div>
                <button   className="clearBucket" onClick={clearBucket}><DeleteIcon/>{lang === "AZ" && ` Səbəti təmizlə` || lang === "EN" && `Clear the basket` || lang === "RU" && `Очистить корзину`} </button>
            </aside>
        </div>
    )
}

export default CardPage

import React , {useContext} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'

import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';

function DateSelect (date)  {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    moment.locale(lang)
    //#region date
    //Date //Date //Date
    const today = new Date()

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const monday = new Date(tomorrow)
    monday.setDate(tomorrow.getDate() + ((1 + 7 - tomorrow.getDay()) % 7));

    const tuesday = new Date(tomorrow)
    tuesday.setDate(tomorrow.getDate() + ((2 + 7 - tomorrow.getDay()) % 7));

    const wednesday = new Date(tomorrow)
    wednesday.setDate(tomorrow.getDate() + ((3 + 7 - tomorrow.getDay()) % 7));

    const thursday = new Date(tomorrow)
    thursday.setDate(tomorrow.getDate() + ((4 + 7 - tomorrow.getDay()) % 7));

    const friday = new Date(tomorrow)
    friday.setDate(tomorrow.getDate() + ((5 + 7 - tomorrow.getDay()) % 7));

    const saturday = new Date(tomorrow)
    saturday.setDate(tomorrow.getDate() + ((6 + 7 - tomorrow.getDay()) % 7));

    const sunday = new Date(tomorrow)
    sunday.setDate(tomorrow.getDate() + ((7 + 7 - tomorrow.getDay()) % 7));

    var newmondayExp = moment(monday).format( 'dddd, D MMMM');
    var newtuesdayExp = moment(tuesday).format( 'dddd, D MMMM');
    var newwednesdayExp = moment(wednesday).format( 'dddd, D MMMM');
    var newthursdayExp = moment(thursday).format( 'dddd, D MMMM');
    var newfridayExp = moment(friday).format( 'dddd, D MMMM');
    var newsaturdayExp = moment(saturday).format( 'dddd, D MMMM');
    var newsundayExp = moment(sunday).format( 'dddd, D MMMM');

    const momentDate = {
        newmonday:newmondayExp,
        newtuesday:newtuesdayExp,
        newwednesday:newwednesdayExp,
        newthursday:newthursdayExp,
        newfriday:newfridayExp,
        newsaturday:newsaturdayExp,
        newsunday:newsundayExp
    }

    const momentDateArray = [newmondayExp, newtuesdayExp, newwednesdayExp, newthursdayExp, newfridayExp, newsaturdayExp, newsundayExp] 
        
    

    for (let i = 1; i <= 7; i++) {
        if(parseInt(date) === i)
        {
            return momentDateArray[i-1]
        }
    }
} 
export default DateSelect
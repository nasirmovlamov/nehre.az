import React, {useEffect, useState, useContext} from 'react'
import Button1 from "./Button1";
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch,
    useParams,
    useHistory,
  } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProductListingContext} from '../components/ProductListingProvider'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import '../assets/css/addAddress.css'
import DoneIcon from '@material-ui/icons/Done';
function AddAddress() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
    const history = useHistory()
    const notifyAddress = (rate) => toast.info(((lang === "AZ" && `Ünvan əlavə edildi!`) || (lang === "EN" && `Address added!`) || (lang === "RU" && `Адрес добавлен!`)) , {draggable: true,});

    const [cities, setcities] = useState()
    const sendReq = async () => {
        const resp = await axios.get('https://nehra.az/public/api/getcities')
        setcities(resp.data)
        setselectCity(resp.data[0].id)
    }
    useEffect( () => {
        sendReq()
    }, [])
    const [address, setaddress] = useState("")
    const [selectCity, setselectCity] = useState()
    const [rayon, setrayon] = useState()
    const [ev, setev] = useState()
    const [menzil, setmenzil] = useState()
    const [floor, setfloor] = useState()
    const [block, setblock] = useState()
    const [domofon, setdomofon] = useState()
    const [note, setnote] = useState()

    const onChange = (e) => {
        setaddress(e.target.value)
    }
    const onChangeCity = (e) => {
        setselectCity(e.target.value)
    }
    const onChangeRayon = (e) => {
        setrayon(e.target.value)
    }
    const onChangeEv = (e) => {
        setev(e.target.value)
    }
    const onChangeMenzil = (e) => {
        setmenzil(e.target.value)
    }
    const onChangeFloor = (e) => {
        setfloor(e.target.value)
    }
    const onChangeBlock = (e) => {
        setblock(e.target.value)
    }
    const onChangeDomofon = (e) => {
        setdomofon(e.target.value)
    }
    const onChangeNote = (e) => {
        setnote(e.target.value)
    }

    const submitFunc = async () => {
        try {
            const resp = await axios.post('https://nehra.az/public/api/postaddress' , 
            {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id, 
            city_id:selectCity, 
            rayon:rayon, 
            ev:ev, 
            blok:block, 
            mertebe:floor,
            menzil:menzil, 
            interkom:domofon, 
            qeyd:note})
            notifyAddress() 
            history.push('/memberarea/address/')
        } catch (error) {
            
        }
    }
    return (
        <div className="cabinetCont addAddress">
        <p className="title"> {(lang === "AZ" && `Mənim ünvanlarım`) || (lang === "EN" && `My addresses`) || (lang === "RU" && `Мои адреса`)}</p>
        <form  className="form">
            <div className="flexContAddress">
                {/* <div className="label"> {(lang === "AZ" && `Ünvan`) || (lang === "EN" && `Address`) || (lang === "RU" && `Адрес`)}</div> */}
                <div className="againDiv">
                    {/* <div><input  type="text"  value={address}    onChange={onChange}       placeholder={(lang === "AZ" && `Dəqiq ünvan qeyd edin`) || (lang === "EN" && `Enter the exact address`) || (lang === "RU" && `Введите точный адрес`)}  className="input1"/></div> */}
                        <label htmlFor="city">{(lang === "AZ" && `Şəhər`) || (lang === "EN" && `City`) || (lang === "RU" && `Город`)}</label>
                        <select type="text" name='city'  value={selectCity}  onChange={onChangeCity}  placeholder={(lang === "AZ" && `Dəqiq ünvan qeyd edin`) || (lang === "EN" && `Enter the exact address`) || (lang === "RU" && `Введите точный адрес`)}  className="inputCity">
                            {(cities?.length > 0 && cities!==undefined) && cities?.map(element => <option value={element.id}>{element.name}</option>)}
                        </select>

                        <label htmlFor="district">{(lang === "AZ" && `Küçə`) || (lang === "EN" && `Street`) || (lang === "RU" && `Улица`)}</label>
                        <input className="inputCity" type="text"  value={rayon}  name='district'   onChange={onChangeRayon}  placeholder={(lang === "AZ" && `Küçə`) || (lang === "EN" && `Street`) || (lang === "RU" && `Улица`)}  />

                        <label htmlFor="home">{(lang === "AZ" && `Ev`) || (lang === "EN" && `Home`) || (lang === "RU" && `Дом`)}</label>
                        <input  type="text"  value={ev}   name='home'     onChange={onChangeEv}  placeholder={(lang === "AZ" && `Ev`) || (lang === "EN" && `Home`) || (lang === "RU" && `Дом`)}  className="inputRayon"/>

                        <label htmlFor="enterance">{(lang === "AZ" && `Blok`) || (lang === "EN" && `Entrance`) || (lang === "RU" && `Подъезд`)}</label>
                        <input  type="text" name='enterance'  value={menzil}    onChange={onChangeMenzil}  placeholder={(lang === "AZ" && `Blok`) || (lang === "EN" && `Entrance`) || (lang === "RU" && `Подъезд`)}  className="inputRayon"/>

                        <label htmlFor="floor">{(lang === "AZ" && `Mərtəbə`) || (lang === "EN" && `Floor`) || (lang === "RU" && `Этаж`)}</label>
                        <input  name='floor' type="text"  value={floor}    onChange={onChangeFloor}  placeholder={(lang === "AZ" && `Mərtəbə`) || (lang === "EN" && `Floor`) || (lang === "RU" && `Этаж`)}  className="inputRayon"/>

                        <label htmlFor="square">{(lang === "AZ" && `Mənzil`) || (lang === "EN" && `Sq.`) || (lang === "RU" && `Кв.`)}</label>
                        <input  type="text" name='square'  value={block}    onChange={onChangeBlock}  placeholder={(lang === "AZ" && `Kv.`) || (lang === "EN" && `Sq.`) || (lang === "RU" && `Кв.`)}  className="inputRayon"/>

                        <label htmlFor="domofon">{(lang === "AZ" && `İnterkom`) || (lang === "EN" && `Intercom`) || (lang === "RU" && `Домофон`)}</label>
                        <input  type="text" name='domofon'  value={domofon}    onChange={onChangeDomofon}  placeholder={(lang === "AZ" && `İnterkom`) || (lang === "EN" && `Intercom`) || (lang === "RU" && `Домофон`)}  className="inputRayon"/>

                        <label className='note' htmlFor="note">{(lang === "AZ" && `Qeyd`) || (lang === "EN" && `Note`) || (lang === "RU" && `Комментарий`)}</label>
                        <input className='note'  type="text" name='note' value={note}    onChange={onChangeNote}  placeholder={(lang === "AZ" && `Qeyd`) || (lang === "EN" && `Note`) || (lang === "RU" && `Комментарий`)}  className="inputRayon"/>
                </div>
            </div>
            <div className='btnsCont'>
                <Link to="/memberarea/address" className="backTo"><ArrowBackIcon/> {(lang === "AZ" && `Geriyə`) || (lang === "EN" && `Back To`) || (lang === "RU" && `Вернуться к `)}</Link>
                <Button1 type='button' function={submitFunc} value={(lang === "AZ" && `Əlavə edin`) || (lang === "EN" && `Add`) || (lang === "RU" && `Добавлять`)} color="#285999"/>
            </div>
        </form>
    </div>
    )
}

export default AddAddress

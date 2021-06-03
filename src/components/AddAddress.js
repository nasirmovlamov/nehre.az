import React, {useEffect, useState, useContext} from 'react'
import Button1 from "./Button1";
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch,
    useParams,
  } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProductListingContext} from '../components/ProductListingProvider'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function AddAddress() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    const notifyAddress = (rate) => toast.success(((lang === "AZ" && `Ünvan əlavə edildi!`) || (lang === "EN" && `Address added!`) || (lang === "RU" && `Адрес добавлен!`)) , {draggable: true,});

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
    const onChange = (e) => {
        setaddress(e.target.value)
    }
    const onChangeCity = (e) => {
        setselectCity(e.target.value)
    }
    const onChangeRayon = (e) => {
        setrayon(e.target.value)
    }

    const submitFunc = () => {
        if (address.length > 0) {
            axios.post('https://nehra.az/public/api/postaddress' , {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id, adres:address , city_id:selectCity, rayon:rayon})
                .then(res => res.status === 200 && (notifyAddress() , window.location.href = '/memberarea/address/'))
        }
    }
    return (
        <div className="cabinetCont addAddress">
        <p className="title"> {(lang === "AZ" && `Mənim ünvanlarım`) || (lang === "EN" && `My addresses`) || (lang === "RU" && `Мои адреса`)}</p>
        <form  className="form">
            <div className="flexContAddress">
                <div className="label"> {(lang === "AZ" && `Ünvan`) || (lang === "EN" && `Address`) || (lang === "RU" && `Адрес`)}</div>
                <div className="againDiv">
                    <input  type="text"  value={address}    onChange={onChange}       placeholder={(lang === "AZ" && `Dəqiq ünvan qeyd edin`) || (lang === "EN" && `Enter the exact address`) || (lang === "RU" && `Введите точный адрес`)}  className="input1"/>
                    <select type="text"  value={selectCity}  onChange={onChangeCity}  placeholder={(lang === "AZ" && `Dəqiq ünvan qeyd edin`) || (lang === "EN" && `Enter the exact address`) || (lang === "RU" && `Введите точный адрес`)}  className="inputCity">
                        {(cities?.length > 0 && cities!==undefined) && cities?.map(element => <option value={element.id}>{element.name}</option>)}
                    </select>
                    <input  type="text"  value={rayon}  onChange={onChangeRayon}  placeholder={(lang === "AZ" && `Rayon qeyd edin`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputRayon"/>
                </div>
            </div>
            <div className='btnsCont'>
                <Button1 type='button' function={submitFunc} value={(lang === "AZ" && `Əlavə edin`) || (lang === "EN" && `Add`) || (lang === "RU" && `Добавлять`)} color="#285999"/>
                <Link to="/memberarea/address" className="backTo"><ArrowBackIcon/> {(lang === "AZ" && `Geriyə`) || (lang === "EN" && `Back To`) || (lang === "RU" && `Вернуться к `)}</Link>
            </div>
        </form>
    </div>
    )
}

export default AddAddress

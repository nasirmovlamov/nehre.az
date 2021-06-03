import React, {useEffect, useState, useContext} from 'react'
import Button1 from "./Button1";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch,
    useParams,
  } from "react-router-dom";
import {ProductListingContext} from '../components/ProductListingProvider'

function AddressEdit() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    const [cities, setcities] = useState()

    const notifyAddress = (rate) => toast.success(((lang === "AZ" && `Ünvan yeniləndi!`) || (lang === "EN" && `Address updated!`) || (lang === "RU" && `Адрес обновлен!`)) , {draggable: true,});
    const [address, setaddress] = useState("")
    let { id } = useParams();

    const sendReq = async () => {
        const resp = await axios.get('https://nehra.az/public/api/getcities')
        setcities(resp.data)
        setselectCity(resp.data[0].id)
    }
    useEffect(() => {
        sendReq()
        axios.post(`https://nehra.az/public/api/editshow` , {address:address, id:id , user_id:JSON.parse(localStorage.getItem('LoginUserData')).id})
        .then(res => (setaddress(res.data.adres) , setselectCity(res.data.city_id) , setrayon(res.data.rayon)))
    }, [])
    
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
            axios.post('https://nehra.az/public/api/editaddress' , {id:id , adres:address , rayon:rayon , city_id:selectCity})
                .then(res => res.status === 200 && (notifyAddress() ,  window.location.href = '/memberarea/address'))
        }
    }

    return (
        <div className="cabinetCont addAddress">
        <p className="title">{(lang === "AZ" && `Ünvan əlavə edin`) || (lang === "EN" && `Add address`) || (lang === "RU" && `Добавить адрес`)}</p>
        <form  className="form">
            <div className="flexContAddress">
                <div className="label">{(lang === "AZ" && `Ünvan`) || (lang === "EN" && `Address`) || (lang === "RU" && `Адрес`)}</div>
                <div className="againDiv">
                    <input type="text" value={address} onChange={(e) => onChange(e)}  className="input1"/>
                    <select type="text"  value={selectCity}  onChange={onChangeCity}  placeholder={(lang === "AZ" && `Dəqiq ünvan qeyd edin`) || (lang === "EN" && `Enter the exact address`) || (lang === "RU" && `Введите точный адрес`)}  className="inputCity">
                        {(cities?.length > 0 && cities!==undefined) && cities?.map(element => <option value={element.id}>{element.name}</option>)}
                    </select>
                    <input  type="text"  value={rayon}   onChange={onChangeRayon}  placeholder={(lang === "AZ" && `Rayon qeyd edin`) || (lang === "EN" && `Enter the district`) || (lang === "RU" && `Введите район`)}  className="inputRayon"/>
                </div>
            </div>
            <div className='btnsCont'>
                <Button1 type='button' function={submitFunc} value={(lang === "AZ" && `Yeniləyin`) || (lang === "EN" && `Update`) || (lang === "RU" && `Обновлять`)} color="#285999"/>
                <Link to="/memberarea/address" className="backTo">Back To</Link>
            </div>
        </form>
    </div>
    )
}

export default AddressEdit

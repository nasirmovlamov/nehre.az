import React, {useEffect, useState, useContext} from 'react'
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch,
    useParams,
  } from "react-router-dom";
import Button1 from "./Button1";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {ProductListingContext} from '../components/ProductListingProvider'
import axios from 'axios';

function Address() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    const [address, setaddress] = useState([])
    useEffect(() => {
        axios.get(`https://nehra.az/public/api/getaddress?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
            .then(res => setaddress(res.data))
    }, [])
    const deleteAddress = (id) => {
        axios.post(`https://nehra.az/public/api/removeaddress` , {id:id})
             .then(res => res.status === 200 && window.location.reload())
    }
    
    return (
        <div className="cabinetCont address">
            <p className="title"> {(lang === "AZ" && `Mənim Ünvanlarım`) || (lang === "EN" && `My Addresses`) || (lang === "RU" && `Мои Адреса`)}</p>
            <p className="myAdress">{(lang === "AZ" && `Hesabınızdakı ünvanların siyahısı boşdur.`) || (lang === "EN" && `The list of addresses in your account is empty. `) || (lang === "RU" && `Список адресов в вашем аккаунте пуст.`)}</p>
            <div className='allAddress'>
                {address?.map((address , index) => <div key={address.id} className='addressElement'><p className='addressText'>{(index+1) + ". "}{address.adres}</p>  <Link to={`/memberarea/reviews/${address.id}`}><button className='editAddress'><EditIcon/></button></Link> <button className='removeAddress' onClick={() => deleteAddress(address.id)}><DeleteIcon/></button></div>)}
            </div>
            <Link to="/memberarea/address/add"><Button1 value={(lang === "AZ" && `Yeni Ünvan`) || (lang === "EN" && `New Address`) || (lang === "RU" && `Новый адрес`)} color="#285999"/></Link>
        </div>
    )
}

export default Address

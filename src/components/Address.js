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
import Data from '../assets/language/address.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Address() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
    const notifyAddressDel = (rate) => toast.info(((lang === "AZ" && `Ünvan silindi!`) || (lang === "EN" && `Address deleted!`) || (lang === "RU" && `Адрес удален!`)) , {draggable: true,});
    
    const [address, setaddress] = useState([])
    const staticData = Data[`address-${lang}`]
    
    useEffect(async () => {
        const res = await axios.get(`https://nehra.az/public/api/getaddress?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
        setaddress(res.data)
    }, [])

    const deleteAddress = async (id) => {
        notifyAddressDel()
        const res = await axios.post(`https://nehra.az/public/api/removeaddress` , {id:id , user_id:JSON.parse(localStorage.getItem('LoginUserData')).id})
        const res2 = await axios.get(`https://nehra.az/public/api/getaddress?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
        setaddress(res2.data)
    }
    
    return (
        <div className="cabinetCont address">
            <p className="title"> {(lang === "AZ" && `Mənim Ünvanlarım`) || (lang === "EN" && `My Addresses`) || (lang === "RU" && `Мои Адреса`)}</p>
            {address.length < 1 &&  <p className="myAdress">{(lang === "AZ" && `Hesabınızdakı ünvanların siyahısı boşdur.`) || (lang === "EN" && `The list of addresses in your account is empty. `) || (lang === "RU" && `Список адресов в вашем аккаунте пуст.`)}</p>}
            <div className='allAddress'>
                {address?.map((address , index) => <div key={address.user_id} className='addressElement'><p className='addressText'>{address.city.name}  {address.rayon !== null && (` , ${ staticData.street}`)} {address.rayon} {address.ev !== null && ` , ${staticData.home}`} {address.ev} </p>     <div className="buttons"><Link to={`/memberarea/address/edit/${address.id}`}>  <button className='editAddress'><EditIcon/></button></Link> <button className='removeAddress' onClick={() => deleteAddress(address.id)}><DeleteIcon/></button></div> </div>)}
            </div>
            <Link to="/memberarea/address/add"><Button1 value={(lang === "AZ" && `Yeni Ünvan`) || (lang === "EN" && `New Address`) || (lang === "RU" && `Новый адрес`)} color="#285999"/></Link>
        </div>
    )
}

export default Address

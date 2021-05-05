import React, { useState } from 'react'
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

function AddAddress() {
    const notifyAddress = (rate) => toast.success(`Ünvan əlavə edildi!` , {draggable: true,});
    const [address, setaddress] = useState("")
    const onChange = (e) => {
        setaddress(e.target.value)
    }

    const submitFunc = () => {
        if (address.length > 0) {

            axios.post('https://nehra.az/public/api/postaddress' , {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id, address:address})
                .then(res => res.status === 200 && (notifyAddress() , window.location.href = '/memberarea/address/'))

        }
    }

    return (
        <div className="cabinetCont addAddress">
        <p className="title">Mənim ünvanlarım</p>
        <form  className="form">
            <div className="flexContAddress">
                <div className="againDiv">
                    <div className="label">Ünvan</div>
                    <input type="text" value={address} onChange={onChange} placeholder="Dəqiq ünvan qeyd edin" className="input1"/>
                </div>
            </div>
            <div className='btnsCont'>
                <Button1 type='button' function={submitFunc} value="Əlavə edin" color="#285999"/>
                <Link to="/memberarea/address" className="backTo">Back To</Link>
            </div>
        </form>
    </div>
    )
}

export default AddAddress

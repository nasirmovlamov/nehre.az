import React from 'react'
import '../assets/css/loginPage.scss'
import Button1 from '../components/Button1'
function LoginPage(props) {
    return (
        <form className="loginPage">
            <div className="buttonCont"><button onClick={() => props.functionClose()} className="removeModalBtn">×</button></div>
            <p className="title">Giriş</p>
            <input className="inputLogin" placeholder="Email ünvanınız"/>
            <input className="inputLogin" placeholder="Parolunuz"/>
            <Button1 value="Daxil olun"/>
            <p className="subTitle">Hesabnız yoxdur ? <button className="regBtn">Qeydiyyatdan keçin</button> </p>
        </form>
    )
}

export default LoginPage

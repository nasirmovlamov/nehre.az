import React, { useEffect, useState } from 'react'
import Button1 from './Button1'

function Contacts(props) {
    const [UserData, setUserData] = useState(0)
    
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
            console.log("ALO")
        }
    })
    return (
        <div className="cabinetCont contactCont">
            <p className="title">Contact</p>
            <div className="gridCont">
                <p className="name key">* Name and Surname</p> <input placeholder={`${UserData.name}`} className="value"   type="text" name="" id=""/>
                <p className="email key ">* Email</p> <input placeholder={`${UserData.email}`} className="value"  type="email" name="" id=""/>
                <p className="phone key">* Phone</p> <input placeholder={`${UserData.phone}`} className="value"  type="tel" name="" id=""/>
                <p className="date key">* Birthday</p> <input value={`${UserData.bithday}`}  className="value"  type="date" name="" id=""/>
            </div>
            <Button1 value="save" color="#285999"/>

        </div>
    )
}

export default Contacts

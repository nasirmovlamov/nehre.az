import React, { useEffect, useState } from 'react'
import Button1 from './Button1'

function Cabinet(props) {
    const [UserData, setUserData] = useState(0)
    
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
            console.log("ALO")
        }
    })

    const imgHandler = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${UserData.image})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div className="cabinetCont">
            <p className="title">My info</p>
            <div className="gridCont">
                <p className="key">Last name and first name</p> <p className="value">{UserData.name}</p>
                <p className="key">Balance</p> <p className="value">{UserData.balance}</p>
                <p className="key">contact number</p> <p className="value">{UserData.phone}</p>
                <p className="key">Contact e-mail</p> <p className="value">{UserData.email}</p>
                <p className="key" style={{alignSelf:"start",}}>Profile picture </p> <div className="valueImg" style={imgHandler}></div>
                <Button1 value="edit" color="#285999"/>
            </div>
        </div>
    )
}

export default Cabinet

import React, { useEffect, useState } from 'react'
import Button1 from './Button1'
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
function Contacts(props) {
    const [UserData, setUserData] = useState(0)
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    useEffect(() => {
        if (UserData?.id === undefined) {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
            console.log("ALO")
        }
    })
    return (
        <div className="cabinetCont q">
            <p className="title">Contact</p>
            <div className="gridCont">
                <p className="name key">* Name and Surname</p> <input placeholder={`${UserData.name}`} className="value"   type="text" name="" id=""/>
                <p className="email key ">* Email</p> <input placeholder={`${UserData.email}`} className="value"  type="email" name="" id=""/>
                <p className="phone key">* Phone</p> <input placeholder={`${UserData.phone}`} className="value"  type="tel" name="" id=""/>
                <p className="date key">* Birthday</p> <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label="Doğum tarixiniz"  value={selectedDate} minDate={'02-01-1920'} maxDate={'02-29-2020'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider>
            </div>
            <Button1 value="save" color="#285999"/>

        </div>
    )
}

export default Contacts

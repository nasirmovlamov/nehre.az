import React from 'react'

function Reminders() {
    return (
        <div className="cabinetCont orders bookmarks reminders">
        <p className="title">My notifications</p>
        <p className="subTitle">Add an alert by e-mail or SMS, and we will remind you to place an order.</p>
        <div className="gridCont1">
            <p className="alerts">You have no notfications!</p>
        </div>
    </div>
    )
}

export default Reminders

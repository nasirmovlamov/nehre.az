import React from 'react'
import "../assets/css/button1.css"
function Button1(props) {
    const bgColor = {
        backgroundColor:props.color
    }
    return (
        <button className="moreAbout" style={bgColor}>{props.value}</button>
    )
}

export default Button1

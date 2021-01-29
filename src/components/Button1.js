import React from 'react'
import "../assets/css/button1.css"
function Button1(props) {
    const bgColor = {
        backgroundColor:props.color
    }
    const functionHandler = () => {
        props.function()
    }
    return (
        <button className="moreAbout" style={bgColor} onClick={() => functionHandler()}>{props.value}</button>
    )
}

export default Button1

import React from 'react'
import "../assets/css/button1.css"
function Button1(props) {
    const bgColor = {
        backgroundColor:props.color
    }
    const functionHandler = () => {
        if(props?.function !== undefined)
        {
            props?.function()
        }
    }
    return (
        <button id="btnComp" disabled={props.disabled} className="moreAbout" type={props.type} style={bgColor} onClick={() => functionHandler()}>{props.value}</button>
    )
}

export default Button1

import React from 'react'
import "../assets/css/productAbout.css"
function About(props) {
    return (
        <div className="productAbout">
            {props.description}    
        </div>
    )
}

export default About

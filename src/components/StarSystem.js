import React from 'react'
import emptyStar from "../assets/images/emptyStar.svg"
import fullStar from "../assets/images/fullStar.svg"
import halfStar from "../assets/images/halfStar.svg"
import "../assets/css/starSystem.css"
function StarSystem(props) {
    // Star system
    const stars = []
    if ((props.numberStar - Math.floor(props.numberStar)) === 0) {
        
        for (var i=0;i<props.numberStar;i++) {
            stars.push(<img src={fullStar} alt="ulduz" width="14" height="auto"/> )
          }
        for (var j=(props.numberStar);j<5;j++) {
            stars.push(<img src={emptyStar} alt="ulduz" width="14" height="auto"/> )
        }

    }
    else 
    {
        for (var i=0;i<Math.floor(props.numberStar);i++) {
            stars.push(<img src={fullStar} alt="ulduz" width="14" height="auto"/> )
          }
        stars.push(<img src={halfStar} alt="ulduz" width="14" height="auto"/>)
        for (var i=Math.floor(props.numberStar) + 1;i<5;i++) {
            stars.push(<img src={emptyStar} alt="ulduz" width="14" height="auto"/> )
          }
    }
    // Star system

    return (
        <div className="stars">{stars}</div>
    )
}

export default StarSystem

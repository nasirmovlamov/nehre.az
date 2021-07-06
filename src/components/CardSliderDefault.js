import React from 'react'
import "../assets/css/cardSlider1.css"
import Button1 from './Button1'
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/core/Skeleton';

function CardSliderDefault(props) {
    
    return (
        <div className="cardSliderDefault" >
            
                <div className="textCont">
                    <div className="skeleton">
                        <Skeleton animation="wave" variant="rect" width={210} height={40} />
                    </div>
                    <div className="skeleton1">
                        <Skeleton animation="wave" variant="rect" width={140} height={40} />
                    </div>
                </div>
                <Skeleton className="moreAbout" animation="wave" variant="rect" width={140} height={40} />

        </div>
    )
}

export default CardSliderDefault

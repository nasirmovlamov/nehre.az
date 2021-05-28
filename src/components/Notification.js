import React from 'react'
import "../assets/css/review.css"
import { useEffect  , useContext} from 'react';
import { useState } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import axios from 'axios';
function Notification(props) {

    return (
        <div className="notification">
            <p className="text">
                {props.notf.text}
            </p>
            <div className="dateAndStar">
                <p className="date">{props.notf.created_at.slice(0,10)}</p>
            </div>
        </div>
    )
}

export default Notification

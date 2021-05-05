import React,{useEffect,useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
  } from "react-router-dom";
function ScrolltoTop() {
    const {pathname} = useLocation()
    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname])
    return ( null )
}

export default ScrolltoTop

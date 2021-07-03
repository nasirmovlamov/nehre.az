import axios from "axios";
import React , {useContext, useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import {ProductListingContext} from '../components/ProductListingProvider'
import { authcheck } from "./Auth";

export const ProtectedRoute =  ({
  component: Component,
  ...rest
}) => {
    const context = useContext(ProductListingContext)
    const {SelectedsProduct, ProdutData, addItem,modalIdsetter,removeItem,lang,money, discountHandler, UserData , setSelectedsProduct, OpenLoginF , UserStatus} = context
    const [status, setstatus] = useState(0)
    const [loading, setloading] = useState(true)


    useEffect(async () => {
        try {
          const resstatus = await axios.get(`https://nehra.az/public/api/checkstatus?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
          setstatus(resstatus.data)
          setloading(false)
        } catch (error) {
          console.log('error')
        }
        setstatus(1)
        console.log(status)
    }, []) 
    
    return (
        <Route
        {...rest}
        render={props => {
        if (status) {
          return <Component {...props} />;
        } else {
          return (
            !loading ? <Redirect to='/' /> : ""
          );
        }
      }}
    />
  );
};

import React  , {useContext, useEffect, useState} from 'react'
import {ProductListingContext} from '../components/ProductListingProvider'

function DateCropLang(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    const {day} = props

    const [getday, setgetday] = useState()
    

    useEffect(() => {
        if (lang === 'AZ') {
            if (day === "1") {
                setgetday('Be')
            }
            else if(day === "2")
            {
                setgetday('Ça')
            }
            else if(day === "3")
            {
                setgetday('Ç')
            }
            else if(day === "4")
            {
                setgetday('Ca')
            }
            else if(day === "5")
            {
                setgetday('C')
            }
            else if(day === "6")
            {
                setgetday('Ş')
            }
            else if(day === "7")
            {
                setgetday('B')
            }
            else 
            {
    
            }
        }
        else if (lang === 'EN')
        {
            if (day === "1") {
                setgetday('M')
            }
            else if(day === "2")
            {
                setgetday('Tu')
            }
            else if(day === "3")
            {
                setgetday('W')
            }
            else if(day === "4")
            {
                setgetday('Th')
            }
            else if(day === "5")
            {
                setgetday('F')
            }
            else if(day === "6")
            {
                setgetday('Sa')
            }
            else if(day === "7")
            {
                setgetday('S')
            }
            else 
            {
    
            }
        }
        else if (lang === 'RU')
        {
            if (day === "1") {
                setgetday('По')
            }
            else if(day === "2")
            {
                setgetday('Вт')
            }
            else if(day === "3")
            {
                setgetday('Ср')
            }
            else if(day === "4")
            {
                setgetday('Чт')
            }
            else if(day === "5")
            {
                setgetday('Пт')
            }
            else if(day === "6")
            {
                setgetday('Су')
            }
            else if(day === "7")
            {
                setgetday('Во')
            }
            else 
            {
    
            }
        }
        else 
        {
    
        }
    }, [])
    

    
    return (
        <span style={{cursor:'context-menu'}}>
            {getday}
        </span>
    )
}

export default DateCropLang

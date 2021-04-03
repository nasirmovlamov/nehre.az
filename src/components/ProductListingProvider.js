import React, {useState , createContext} from 'react'

export const ProductListingContext = createContext()

export function ProductListingProvider(props) {
    
    const [ProdutData, setProdutData] = useState([])
    const [FinalPrice, setFinalPrice] = useState(0)
    const [FinalWeight, setFinalWeight] = useState(0)
    const [FinalGoods, setFinalGoods] = useState(0)
    
    const addItem = (num,price , weight) => {
        if(weight !== null && weight !== undefined)
        {
            setFinalWeight(FinalWeight + parseInt(weight))
        }
        setFinalPrice(FinalPrice + parseInt(price))
        setFinalGoods(FinalGoods + 1)
        var index = ProdutData.findIndex(x=> x.id === num);
        if (index === -1) {
            setProdutData([...ProdutData , {id:num , count:1, cost:parseInt(price).toFixed(0)}])
        }
        else 
        {
            var newArr = [...ProdutData]
            newArr[index].count++
            setProdutData(newArr)
        }
        
    }
    const removeItem = (num,price , weight) => {
        var index = ProdutData.findIndex(x=> x.id === num);
        if (ProdutData[index].count >= 1) {
            setFinalPrice(FinalPrice - parseInt(price))
            setFinalGoods(FinalGoods - 1)
            var newArr = [...ProdutData]
            newArr[index].count--
            console.log(newArr);
            setProdutData(newArr)
        }
    }
 

    return (
        <ProductListingContext.Provider value={[ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem]}>
            {props.children}
        </ProductListingContext.Provider>
    )
}


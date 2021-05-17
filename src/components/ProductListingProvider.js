import React, {useState , createContext, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ProductListingContext = createContext()
export function ProductListingProvider(props) {
    const notifyAddBasket = () => toast.success(`Səbətə Əlavə olundu` , {draggable: true, autoClose: 1000,});
    const [ProdutData, setProdutData] = useState(JSON.parse(localStorage.getItem('ProdutData')) !== null ? JSON.parse(localStorage.getItem('ProdutData')) : [])
    const [FinalPrice, setFinalPrice] = useState(localStorage.getItem('FinalPrice') !== null ? parseInt(localStorage.getItem('FinalPrice')) : 0)
    const [FinalWeight, setFinalWeight] = useState(localStorage.getItem('FinalGoods') !== null ?  parseInt(localStorage.getItem('FinalGoods')) : 0)
    const [FinalGoods, setFinalGoods] = useState(localStorage.getItem('FinalWeight') !== null ?  parseInt(localStorage.getItem('FinalWeight')) : 0)
    const [DateGoods, setDateGoods] = useState(localStorage.getItem('DateGoods') !== null ? JSON.parse(localStorage.getItem('DateGoods')) : [])
    const langArr = ["AZ" , "EN" , "RU"]
    const [lang, setlang] = useState(sessionStorage.getItem('lang') === null ? 'AZ' : sessionStorage.getItem('lang'))
    const [money, setmoney] = useState(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
    
    useEffect(() => {
        localStorage.setItem('ProdutData' , JSON.stringify(ProdutData))
        var priceGoodsWeightHandler = (element) => {
            console.log(element)
            for (let i = 0; i < element.count; i++) {
                var arrayA = DateGoods;
                var arrayB = element.date;
                var newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y === x)))
                setDateGoods(newArray)
            }
        }   
        ProdutData.map(element => priceGoodsWeightHandler(element))
    }, [ProdutData])

    const addItem = (num,price , weight , unitType , dates , name) => {
        if (unitType === 2) {
            setFinalWeight(FinalWeight + (parseInt(weight) / 100))
        }
        else 
        {
            setFinalWeight(FinalWeight + parseInt(weight))
        }
        setFinalPrice(FinalPrice + parseInt(price))
        setFinalGoods(FinalGoods + 1)
        var arrayA = DateGoods;
        var arrayB = dates;
        var newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y === x)))
        setDateGoods(newArray)
        var index = ProdutData.findIndex(x=> x.id === num);
        if (index === -1) {
            setProdutData([...ProdutData , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name }])
        }
        else 
        {
            var newArr = [...ProdutData]
            newArr[index].count++
            setProdutData(newArr)
        }
        notifyAddBasket()
        localStorage.setItem('FinalGoods' , (parseInt(FinalGoods) + 1))
        localStorage.setItem('FinalPrice' , (parseInt(FinalPrice) + parseInt(price)))
        localStorage.setItem('FinalWeight' , (parseInt(FinalWeight) + parseInt(weight)))
        localStorage.setItem('DateGoods' , (JSON.stringify(newArray)))
    }

    const removeItem = (num, price , weight , unitType , dates , name) => {
        var index = ProdutData.findIndex(x=> x.id === num);
        if (ProdutData[index].count >= 1) {
            // var arrayB = dates;
            // var newarr = DateGoods.filter(x => !arrayB.some(y => y === x))
            // console.log(newarr);
            // localStorage.setItem('DateGoods' , (JSON.stringify(newarr)))
            // setDateGoods(newarr)
        }
        if (ProdutData[index].count >= 1) {
            setFinalPrice(FinalPrice - parseInt(price))
            setFinalGoods(FinalGoods - 1)
            var newArr = [...ProdutData]
            newArr[index].count--
            newArr = newArr.filter(element => element.count !== 0)
            console.log(newArr);
            setProdutData(newArr)
            console.log(newArr);
            localStorage.setItem('ProdutData' , (JSON.stringify(newArr)))
            localStorage.setItem('FinalGoods' , (parseInt(FinalGoods) - 1))
            localStorage.setItem('FinalPrice' , (parseInt(FinalPrice) - parseInt(price)))
            localStorage.setItem('FinalWeight' , (parseInt(FinalWeight) - parseInt(weight)))
        }
    }
 

    return (
        <ProductListingContext.Provider value={[ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr, DateGoods,setDateGoods]}>
            {props.children}
        </ProductListingContext.Provider>
    )
}


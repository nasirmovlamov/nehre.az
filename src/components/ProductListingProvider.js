import React, {useState , createContext} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const ProductListingContext = createContext()
export function ProductListingProvider(props) {
    const notifyAddBasket = () => toast.success(`Səbətə Əlavə olundu` , {draggable: true, autoClose: 1000,});
    

    const [ProdutData, setProdutData] = useState([])
    const [FinalPrice, setFinalPrice] = useState(0)
    const [FinalWeight, setFinalWeight] = useState(0)
    const [FinalGoods, setFinalGoods] = useState(0)
    const langArr = ["AZ" , "EN" , "RU"]
    const [lang, setlang] = useState(sessionStorage.getItem('lang') === null ? 'AZ' : sessionStorage.getItem('lang'))
    const [money, setmoney] = useState(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))


    const addItem = (num,price , weight , unitType) => {
        if (unitType === 2) {
            setFinalWeight(FinalWeight + (parseInt(weight) / 100))
        }
        else 
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
        notifyAddBasket()
    }

    const removeItem = (num, price , weight , unitType) => {
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
        <ProductListingContext.Provider value={[ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr]}>
            {props.children}
        </ProductListingContext.Provider>
    )
}


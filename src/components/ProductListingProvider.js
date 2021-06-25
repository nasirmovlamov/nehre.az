import React, {useState , createContext, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import ProductModal from './ProductModal';
import Modal from '@material-ui/core/Modal';
import { parse } from 'date-fns';


export const ProductListingContext = createContext()
export function ProductListingProvider(props) {
    const notifyAddBasket = () => toast.success(`Səbətə Əlavə olundu` , {draggable: true, autoClose: 1000,});
    const [ProdutData, setProdutData] = useState(JSON.parse(localStorage.getItem('ProdutData')) !== null ? JSON.parse(localStorage.getItem('ProdutData')) : [])
    const [FinalPrice, setFinalPrice] = useState(localStorage.getItem('FinalPrice') !== null ? parseInt(localStorage.getItem('FinalPrice')) : 0)
    const [FinalWeight, setFinalWeight] = useState(localStorage.getItem('FinalWeight') !== null ?  parseFloat(localStorage.getItem('FinalWeight')) : 0)
    const [FinalGoods, setFinalGoods] = useState(localStorage.getItem('FinalGoods') !== null ?  parseInt(localStorage.getItem('FinalGoods')) : 0)
    const [FinalBonus, setFinalBonus] = useState(localStorage.getItem('FinalBonus') !== null ?  parseInt(localStorage.getItem('FinalBonus')) : 0)
    
    const [DateGoods, setDateGoods] = useState(localStorage.getItem('DateGoods') !== null ? JSON.parse(localStorage.getItem('DateGoods')) : [])
    const [SelectedsProduct, setSelectedsProduct] = useState(sessionStorage.getItem('SecilmishProduct') !== null ? JSON.parse(sessionStorage.getItem('SecilmishProduct')) : [])
    const langArr = ["AZ" , "EN" , "RU"]
    const [lang, setlang] = useState(sessionStorage.getItem('lang') === null ? 'AZ' : sessionStorage.getItem('lang'))
    const [money, setmoney] = useState(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
    const [OpenLogin, setOpenLogin] = useState(false)
    const OpenLoginF = () =>{
        setOpenLogin(true)
    }
    const CloseLoginF = () =>{
        setOpenLogin(false)
    }
    
    useEffect(() => {
        localStorage.setItem('ProdutData' , JSON.stringify(ProdutData))
        var priceGoodsWeightHandler = (element) => {
            for (let i = 0; i < element.count; i++) {
                var arrayA = DateGoods;
                var arrayB = element.date;
                var newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y === x)))
                setDateGoods(newArray)
            }
        }   
        ProdutData.map(element => priceGoodsWeightHandler(element))
    }, [ProdutData])

    const addItem = (num,price , weight , unitType , dates , name, bonus) => {
        console.log(bonus)
        if (parseInt(unitType) === 4) {
            setFinalWeight(FinalWeight + (parseFloat(weight) / 1000))
        }
        else 
        {
            setFinalWeight(parseFloat(FinalWeight) + parseFloat(weight))
        }
        setFinalPrice(FinalPrice + parseInt(price))
        setFinalGoods(FinalGoods + 1)
        setFinalBonus(FinalBonus + parseInt(bonus))
        var arrayA = DateGoods;
        var arrayB = dates;
        var newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y === x)))
        let uniqueDates = [...new Set(newArray)];
        setDateGoods(uniqueDates)
        var index = ProdutData.findIndex(x=> x.id === num);
        if (index === -1) {
            setProdutData([...ProdutData , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name, weight:weight, unitType:unitType, bonus:bonus}])
        }
        else 
        {
            var newArr = [...ProdutData]
            newArr[index].count++
            setProdutData(newArr)
        }
        notifyAddBasket()
        localStorage.setItem('FinalGoods' , (parseInt(FinalGoods) + 1))
        localStorage.setItem('FinalBonus' , (parseInt(FinalBonus) + parseInt(bonus)))
        localStorage.setItem('FinalPrice' , (parseInt(FinalPrice) + parseInt(price)))
        if (parseInt(unitType) === 4) {
            localStorage.setItem('FinalWeight' , (parseFloat(FinalWeight) + (parseFloat(weight) / 1000)).toFixed(2))
        }
        else 
        {
            localStorage.setItem('FinalWeight' , (parseFloat(FinalWeight) + parseFloat(weight) ))
        }

        localStorage.setItem('DateGoods' , (JSON.stringify(uniqueDates)))
    }

    const removeItem = (num, price , weight , unitType , dates , name, bonus) => {
        var index = ProdutData.findIndex(x=> x.id === num);
        if (ProdutData[index].count > 0) {
            setFinalPrice(FinalPrice - parseInt(price))
            setFinalBonus(FinalBonus - parseInt(bonus))
            setFinalGoods(FinalGoods - 1)
            var newArr = [...ProdutData]
            newArr[index].count--
            newArr = newArr.filter(element => element.count !== 0)
            console.log(newArr);
            setProdutData(newArr)

            var arrayA = DateGoods;
            var arrayB = dates;
            var newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y !== x)))

            // for (let i = 0; i < newArr.length; i++) {
            //     for (let i = 0; i < newArr[i]?.date?.length; i++) {
            //         dates.push(newArr[i]?.date[i])
            //     }
            // }
            
            setDateGoods(newArray)

            if (parseInt(ProdutData[index]?.unitType) === 4) {
                setFinalWeight(parseFloat(FinalWeight) - ((parseFloat(ProdutData[index]?.weight) / 1000)) )
                localStorage.setItem('FinalWeight' , (parseFloat(FinalWeight) - (parseFloat(ProdutData[index]?.weight) / 1000)))
            }
            else 
            {
                localStorage.setItem('FinalWeight' , (parseFloat(FinalWeight) - parseFloat(ProdutData[index]?.weight) ))
                setFinalWeight(parseFloat(FinalWeight) - (parseFloat(ProdutData[index]?.weight)) )
            }
            localStorage.setItem('FinalGoods' , (parseInt(FinalGoods) - 1))
            localStorage.setItem('FinalPrice' , (parseInt(FinalPrice) - parseInt(price)))
            localStorage.setItem('FinalBonus' , (parseInt(FinalBonus) - parseInt(bonus)))
            localStorage.setItem('DateGoods' , (JSON.stringify(newArray)))
            localStorage.setItem('ProdutData' , (JSON.stringify(newArr)))
        }
    }
 

    //#region PRDUCTMODAL
    const [open, setOpen] = React.useState(false);
    const handleOpenPM = () => {
        setOpen(true);
    }
    const handleClosePM = () => {
        setOpen(false);
    };
    const [modalId, setmodalId] = useState()
    const modalIdsetter = (id) => {
        setOpen(true);
        setmodalId(id)
    } 
    //#endregion

    
    return (
        <ProductListingContext.Provider value={[ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus]}>
            {props.children}
            <div className="modalCont">
                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<ProductModal  functionClose={handleClosePM}  id={modalId}/>}
                </Modal>
            </div>
        </ProductListingContext.Provider>
    )
}


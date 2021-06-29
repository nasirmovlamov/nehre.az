import React, {useState , createContext, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import ProductModal from './ProductModal';
import Modal from '@material-ui/core/Modal';
import { parse } from 'date-fns';
import axios from 'axios';


export const ProductListingContext = createContext()
export function ProductListingProvider(props) {
    const notifyAddBasket = () => toast.success(`Səbətə Əlavə olundu` , {draggable: true, autoClose: 1000,});


    //#region Default Values
    const [ProdutData, setProdutData] = useState([])
    const [FinalPrice, setFinalPrice] = useState(0)
    const [FinalWeight, setFinalWeight] = useState(0)
    const [FinalGoods, setFinalGoods] = useState(0)
    const [FinalBonus, setFinalBonus] = useState(0)
    const [DateGoods, setDateGoods] = useState([])
    const [SelectedsProduct, setSelectedsProduct] = useState([])
    const langArr = ["AZ" , "EN" , "RU"]
    const [lang, setlang] = useState()
    const [money, setmoney] = useState()
    const [OpenLogin, setOpenLogin] = useState(false)
    //#endregion Default Values

    const OpenLoginF = () =>{
        setOpenLogin(true)
    }
    const CloseLoginF = () =>{
        setOpenLogin(false)
    }
    
   

    const discountHandler = (product) => {
        if (product.discount !== 0 && product.discount !== null) {
            var discountPrice = 0;
            discountPrice =  Math.round( ((product.qiymet - (product.qiymet  * product.discount) / 100)) )
            return Math.floor(discountPrice);         
        } 
        else {
            return Math.floor(product.qiymet)
        }
    }

    const addCart = async (product , FinalPrice, FinalWeight, FinalGoods, FinalBonus, DateGoods) => {
        const string = { 
            product: product,
            FinalPrice:FinalPrice,
            FinalWeight:FinalWeight,
            FinalGoods:FinalGoods,
            FinalBonus:FinalBonus,
            DateGoods:DateGoods
        }
        const resp = await axios.post('https://nehra.az/api/addcart' ,{user_id:JSON.parse(localStorage.getItem('LoginUserData')),  string:JSON.stringify(string)})
    } 

    const weightChecker = (weight , unitType) => {
        let return_weight = 0
        if (parseInt(unitType) === 4) {
            setFinalWeight(FinalWeight + (parseFloat(weight) / 1000))
            return_weight = FinalWeight + (parseFloat(weight) / 1000)
            return return_weight
        }
        else 
        {
            setFinalWeight(parseFloat(FinalWeight) + parseFloat(weight))
            return_weight = parseFloat(FinalWeight) + parseFloat(weight)
            return return_weight
        }
    }

    const addItem = (product) => {
        notifyAddBasket()
        //#region Add Cart Values
        const num = product.id
        const price = discountHandler(product)
        const weight = product.ceki_hecm
        const unitType = product.unit.unit_id
        const dates = product.delivery
        const name = product.title
        const bonus = product.bonus

        let productCartAdd = {} 
        let FinalPriceCartAdd = 0
        let FinalWeightCartAdd = 0
        let FinalGoodsCartAdd = 0
        let FinalBonusCartAdd = 0
        let DateGoodsCartAdd = []
        FinalPriceCartAdd = FinalPrice + parseInt(price)
        FinalGoodsCartAdd = FinalGoods + 1
        FinalBonusCartAdd = FinalBonus + parseInt(bonus)
        //#endregion Add Cart Values
        
        // #region setterfunctions 
        var arrayA = DateGoods;
        var arrayB = dates;
        var newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y === x)))
        let uniqueDates = [...new Set(newArray)];
        // #endregion setterfunctions 
        setFinalPrice(FinalPriceCartAdd)
        setFinalGoods(FinalGoodsCartAdd)
        setFinalBonus(FinalBonusCartAdd)
        setDateGoods(uniqueDates)
        
        var index = ProdutData.findIndex(x=> x.id === num);
        if (index === -1) {
            weightChecker(weight , unitType)
            // product , FinalPrice, FinalWeight, FinalGoods, FinalBonus, DateGoods
            FinalWeightCartAdd = weightChecker(weight , unitType)
            let productAddcartdata = [...ProdutData , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name, weight:weight, unitType:unitType, bonus:bonus, product:product}]
            setProdutData(productAddcartdata)
            addCart(productAddcartdata , FinalPriceCartAdd, FinalWeightCartAdd, FinalGoodsCartAdd, FinalBonusCartAdd, uniqueDates)
        }
        else 
        {
            
            var newArr = [...ProdutData]
            newArr[index].count++
            setProdutData(newArr)
            weightChecker(weight , unitType)
            FinalWeightCartAdd = weightChecker(weight , unitType)
            let productAddcartdata = newArr
            addCart(productAddcartdata , FinalPriceCartAdd, FinalWeightCartAdd, FinalGoodsCartAdd, FinalBonusCartAdd, uniqueDates)
        }


    }

    const removeItem = (product) => {
        const num = product.id
        const price = discountHandler(product)
        const weight = product.ceki_hecm
        const unitType = product.unit.unit_id
        const dates = product.delivery
        const name = product.title
        const bonus = product.bonus
        
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
    const selectItem = (num , product) => {
        // const notify2 = (rate) => toast.success(`Seçilmişlərdən çıxarıldı` , {draggable: true,autoClose: 1000});
        // const notify1 = (rate) => toast.success(`Seçilmişlərə Əlavə olundu` , {draggable: true,autoClose: 1000});
        // if(UserData?.id !== undefined)
        // {  
        //     if(sessionStorage.getItem('SecilmishProduct') === null)
        //     {
        //         sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
        //         var selecteds = []  
        //         selecteds = [...selecteds , {id:product.id , delivery: product.delivery,    thumb:product.thumb,  title:product.title, desc: ((lang === "AZ" && product?.seller_data?.name) || (lang === "EN" && product?.seller_data?.name_en) || (lang === "RU" && product?.seller_data?.name_ru)),  unitType:product.unit.id,  qiymet:props.price , ceki_hecm:product.ceki_hecm , discount:product.discount,  starsall:product.starsall, bonus:product.cashback}]
        //         sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
        //         setSelectedsProduct(selecteds)
        //         axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData?.id , string:JSON.stringify(selecteds)} , headers)
        //         notify1()
        //         return 0 
        //     }        
        //     else 
        //     {
        //         var selecteds = JSON.parse(sessionStorage.getItem('SecilmishProduct'))
        //     }
        //     var index = selecteds.findIndex(x=> x.id === num)
        //     if (index === -1) {
        //         selecteds = [...selecteds , {id:product.id , delivery: product.delivery,    thumb:product.thumb,  title:product.title, desc: ((lang === "AZ" && product?.seller_data?.name) || (lang === "EN" && product?.seller_data?.name_en) || (lang === "RU" && product?.seller_data?.name_ru)),  unitType:product.unit.id,  qiymet:props.price , ceki_hecm:product.ceki_hecm , discount:product.discount,  starsall:product.starsall, bonus:product.cashback}]
        //         sessionStorage.setItem('SecilmishProduct' , JSON.stringify(selecteds))
        //         setSelectedsProduct(selecteds)
        //         axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData?.id , string:JSON.stringify(selecteds)} , headers)
        //         setindexSelected(1)
        //         notify1()
        //     }
        //     else 
        //     {
        //         var newArr = selecteds.filter((item) => item.id !== num)
        //         sessionStorage.setItem('SecilmishProduct' , JSON.stringify(newArr))
        //         setSelectedsProduct(newArr)
        //         axios.post('https://nehra.az/public/api/addstring' , {user_id:UserData?.id , string:JSON.stringify(newArr)}  , headers)
        //         setindexSelected(-1)
        //         notify2()
        //     }
        // }
        // else 
        // {
        //     notifyLogin()
        //     OpenLoginF()
        // }
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
        <ProductListingContext.Provider value={{ProdutData:ProdutData, setProdutData:setProdutData, FinalPrice:FinalPrice, setFinalPrice:setFinalPrice, FinalWeight:FinalWeight, setFinalWeight:setFinalWeight,FinalGoods:FinalGoods, setFinalGoods:setFinalGoods, addItem:addItem, removeItem:removeItem, lang:lang , setlang:setlang,  money:money , langArr:langArr, DateGoods:DateGoods,setDateGoods:setDateGoods , SelectedsProduct:SelectedsProduct, setSelectedsProduct:setSelectedsProduct, OpenLoginF:OpenLoginF,CloseLoginF:CloseLoginF, setOpenLogin:setOpenLogin , OpenLogin:OpenLogin, handleOpenPM:handleOpenPM, handleClosePM:handleClosePM, modalIdsetter:modalIdsetter, modalId:modalId, FinalBonus:FinalBonus, setFinalBonus:setFinalBonus,selectItem:selectItem,discountHandler:discountHandler , setmoney:setmoney}}>
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


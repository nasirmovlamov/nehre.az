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
    const notifyAddBasket = () => toast.info((lang === "AZ" && `Məhsul səbətə əlavə edildi` || lang === "EN" && `The product has added to the cart` || lang === "RU" && `Товар добавлен в корзину`) , {draggable: true, autoClose: 1000,});
    const notifyRemoveBasket = () => toast.info((lang === "AZ" && `Məhsul səbətdən çıxarıldı` || lang === "EN" && `The product was removed from the basket` || lang === "RU" && `Товар удален из корзины`)  , {draggable: true, autoClose: 1000,});
    const [UserData, setUserData] = useState(null)



    //#region Default Values
    const [loader, setloader] = useState(false)

    const [StaticData , setStaticData] = useState({})
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
    const [MinOrder, setMinOrder] = useState()
    const [Items, setItems] = useState()

    //#endregion Default Values

    const OpenLoginF = () =>{
        setOpenLogin(true)
    }
    const CloseLoginF = () =>{
        setOpenLogin(false)
    }
    
   

    const discountHandler = (product) => {
        if (product.discount !== null) {
            var discountPrice = 0;
            discountPrice =  Math.round( ((product.qiymet - (product.qiymet  * product.discount) / 100)) )
            return Math.floor(discountPrice);         
        } 
        else {
            return Math.floor(product.qiymet)
        }
    }

    const addCart = async (product , FinalPrice, FinalWeight, FinalGoods, FinalBonus, DateGoods) => {
        if(UserData !== null)
        {
            const string = { 
                product: product,
                FinalPrice:FinalPrice,
                FinalWeight:FinalWeight,
                FinalGoods:FinalGoods,
                FinalBonus:FinalBonus,
                DateGoods:DateGoods
            }
            const resp = await axios.post('https://nehra.az/public/api/addcart' ,{user_id: UserData.id,  string:JSON.stringify(string)})
        }
    } 

    const weightChecker = (weight , unitType, plus , index) => {
        let return_weight = 0
        if (parseInt(unitType) === 4) {
            if(plus ==='add')
            {
                return_weight = FinalWeight + (parseFloat(weight) / 1000)
                setFinalWeight(return_weight)
                localStorage.setItem('FinalWeight' , return_weight)
            }
            else if(plus ==='remove')
            {
                return_weight = FinalWeight - (parseFloat(weight) / 1000)
                setFinalWeight(return_weight)
                localStorage.setItem('FinalWeight' , (return_weight))
            }
            else 
            {
                return_weight = parseFloat(FinalWeight) - ((parseFloat(weight) / 1000) * parseInt(ProdutData[index]?.count)) 
                setFinalWeight(return_weight)
                localStorage.setItem('FinalWeight' , return_weight)
            }
            return return_weight
        }
        else 
        {
            if(plus === 'add')
            {
                return_weight = parseFloat(FinalWeight) + parseFloat(weight)
                setFinalWeight(return_weight)
                localStorage.setItem('FinalWeight' , return_weight)
            }
            else if(plus ==='remove')
            {
                return_weight = parseFloat(FinalWeight) - parseFloat(weight)
                setFinalWeight(return_weight)
                localStorage.setItem('FinalWeight' , (return_weight))
            }
            else 
            {
                return_weight = parseFloat(FinalWeight) - ((parseFloat(weight)) * parseInt(ProdutData[index]?.count)) 
                setFinalWeight(return_weight)
                localStorage.setItem('FinalWeight' , return_weight)
            }
            return return_weight
        }
    }

    const addItem = (product) => {
        notifyAddBasket()
        //#region Add Cart Values
        const num = parseInt(product.id)
        const price = parseFloat(discountHandler(product))
        const weight = parseFloat(product.ceki_hecm)
        const unitType = parseInt(product.unit.unit_id)
        const dates = product.delivery
        const name = product.title
        const bonus = parseInt(product.bonus)
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
            weightChecker(weight , unitType, 'add' , 0)
            // product , FinalPrice, FinalWeight, FinalGoods, FinalBonus, DateGoods
            FinalWeightCartAdd = weightChecker(weight , unitType, 'add' , 0)
            let productAddcartdata = [...ProdutData , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name, weight:weight, unitType:unitType, bonus:bonus, product:product}]
            setProdutData(productAddcartdata)
            console.log(UserData)
            if (UserData !== null) {
                addCart(productAddcartdata , FinalPriceCartAdd, FinalWeightCartAdd, FinalGoodsCartAdd, FinalBonusCartAdd, uniqueDates)
            }
            else 
            {
                localStorage.setItem('FinalGoods' , FinalGoodsCartAdd)
                localStorage.setItem('FinalPrice' , FinalPriceCartAdd)
                localStorage.setItem('FinalBonus' , FinalBonusCartAdd)
                localStorage.setItem('DateGoods' ,  JSON.stringify(uniqueDates))
                localStorage.setItem('ProdutData' , JSON.stringify(productAddcartdata))
            }
        }
        else 
        {
            
            var newArr = [...ProdutData]
            newArr[index].count++
            setProdutData(newArr)
            weightChecker(weight , unitType , 'add' , 0)
            FinalWeightCartAdd = weightChecker(weight , unitType , 'add' , 0)
            let productAddcartdata = newArr
            if (UserData !== null) {
                addCart(productAddcartdata , FinalPriceCartAdd, FinalWeightCartAdd, FinalGoodsCartAdd, FinalBonusCartAdd, uniqueDates)
            }
            else 
            {
                localStorage.setItem('FinalGoods' , FinalGoodsCartAdd)
                localStorage.setItem('FinalPrice' , FinalPriceCartAdd)
                localStorage.setItem('FinalBonus' , FinalBonusCartAdd)
                localStorage.setItem('DateGoods' ,  JSON.stringify(uniqueDates))
                localStorage.setItem('ProdutData' , JSON.stringify(productAddcartdata))
            }
        }
    }

    const removeItem = (product) => {
        notifyRemoveBasket()
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
       
        //#endregion Add Cart Values
        
        var index = ProdutData.findIndex(x=> x.id === num);
        if (ProdutData[index].count > 0) {
            FinalPriceCartAdd = FinalPrice - parseInt(price)
            FinalGoodsCartAdd = FinalGoods - 1
            FinalBonusCartAdd = FinalBonus - parseInt(bonus)
            var newArr = [...ProdutData]
            newArr[index].count--
            newArr = newArr.filter(element => element.count !== 0)
            let productAddcartdata = newArr
            setProdutData(productAddcartdata)
            let arrayA = DateGoods;
            let arrayB = dates;
            let uniqueDates = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y !== x)))

            // for (let i = 0; i < newArr.length; i++) {
            //     for (let i = 0; i < newArr[i]?.date?.length; i++) {
            //         dates.push(newArr[i]?.date[i])
            //     }
            // }
            setDateGoods(uniqueDates)
            setFinalPrice(FinalPriceCartAdd)
            setFinalGoods(FinalGoodsCartAdd)
            setFinalBonus(FinalBonusCartAdd)
            setDateGoods(uniqueDates)
            weightChecker(weight , unitType , 'remove' , 0)
            FinalWeightCartAdd = weightChecker(weight , unitType , 'remove' , 0)

            if (UserData !== null) {
                addCart(productAddcartdata , FinalPriceCartAdd, FinalWeightCartAdd, FinalGoodsCartAdd, FinalBonusCartAdd, uniqueDates)
            }
            else 
            {
                localStorage.setItem('FinalGoods' , FinalGoodsCartAdd)
                localStorage.setItem('FinalPrice' , FinalPriceCartAdd)
                localStorage.setItem('FinalBonus' , FinalBonusCartAdd)
                localStorage.setItem('DateGoods' ,  JSON.stringify(uniqueDates))
                localStorage.setItem('ProdutData' , JSON.stringify(productAddcartdata))
            }
            
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

    const clearBucket = async () => {
        setFinalPrice(0)
        setFinalGoods(0)
        setFinalWeight(0)
        setFinalBonus(0)
        setProdutData([])
        setItems([])
        localStorage.setItem('ProdutData' , JSON.stringify([]))
        localStorage.setItem('FinalGoods' , (0))
        localStorage.setItem('FinalPrice' , (0))
        localStorage.setItem('FinalWeight' , (0))
        localStorage.setItem('FinalBonus' , (0))
        localStorage.setItem('DateGoods' , JSON.stringify([]))
        if(UserData !== null)
        {
            const resp = await axios.post('https://nehra.az/public/api/addcart' ,{user_id: UserData.id,  string:""})
        }
    }

    const deleteCard = (product) => {
        notifyRemoveBasket()
        //#region Add Cart Values
        const num = parseInt(product.id)
        const price = parseFloat(discountHandler(product))
        const weight = parseFloat(product.ceki_hecm)
        const unitType = parseInt(product.unit.unit_id)
        const dates = product.delivery
        const name = product.title
        const bonus = parseInt(product.bonus)
        let productCartAdd = {} 
        let FinalPriceCartAdd = 0
        let FinalWeightCartAdd = 0
        let FinalGoodsCartAdd = 0
        let FinalBonusCartAdd = 0
        let DateGoodsCartAdd = []
        var index = ProdutData.findIndex(x=> x.id === num);
        
        //#endregion Add Cart Values



        FinalPriceCartAdd = parseFloat(FinalPrice) - parseFloat(ProdutData[index]?.cost * ProdutData[index]?.count)
        FinalGoodsCartAdd = parseInt(FinalGoods) - parseInt(ProdutData[index]?.count)
        FinalBonusCartAdd = parseFloat(FinalBonus) - parseFloat(ProdutData[index]?.bonus * ProdutData[index]?.count)

        weightChecker(weight , unitType , 'delete' , index)
        FinalWeightCartAdd = weightChecker(weight , unitType , 'delete', index)
        
        let productAddcartdata = ProdutData.filter((item) => item.id !== num)
        const filteredItems = Items.filter((item) => item.id !== num)
        setProdutData(productAddcartdata)
        setItems(filteredItems)
        var testarr = ProdutData.filter((item) => item.id !== num)
        const datesss = []
        const nonDeletedP = Items.filter((item) => item.id !== num)
        for (let i = 0; i < nonDeletedP.length; i++) {
            for (let j = 0; j < nonDeletedP[i]?.date?.length; j++) {
                datesss.push(nonDeletedP[i]?.date[j])
            }
        }
        let uniqueDates = [...new Set(datesss)];
        
        setFinalBonus(FinalBonusCartAdd)
        setFinalPrice(FinalPriceCartAdd)
        setFinalGoods(FinalGoodsCartAdd)
        setDateGoods(uniqueDates)

        if (UserData !== null) {
            addCart(productAddcartdata , FinalPriceCartAdd, FinalWeightCartAdd, FinalGoodsCartAdd, FinalBonusCartAdd, uniqueDates)
        }
        else 
        {
            localStorage.setItem('FinalGoods' , FinalGoodsCartAdd)
            localStorage.setItem('FinalPrice' , FinalPriceCartAdd)
            localStorage.setItem('FinalBonus' , FinalBonusCartAdd)
            localStorage.setItem('DateGoods' ,  JSON.stringify(uniqueDates))
            localStorage.setItem('ProdutData' , JSON.stringify(productAddcartdata))
        }
        
    }


    return (
        <ProductListingContext.Provider value={{ProdutData:ProdutData, setProdutData:setProdutData, FinalPrice:FinalPrice, setFinalPrice:setFinalPrice, FinalWeight:FinalWeight, setFinalWeight:setFinalWeight,FinalGoods:FinalGoods, setFinalGoods:setFinalGoods, addItem:addItem, removeItem:removeItem, lang:lang , setlang:setlang,  money:money , langArr:langArr, DateGoods:DateGoods,setDateGoods:setDateGoods , SelectedsProduct:SelectedsProduct, setSelectedsProduct:setSelectedsProduct, OpenLoginF:OpenLoginF,CloseLoginF:CloseLoginF, setOpenLogin:setOpenLogin , OpenLogin:OpenLogin, handleOpenPM:handleOpenPM, handleClosePM:handleClosePM, modalIdsetter:modalIdsetter, modalId:modalId, FinalBonus:FinalBonus, setFinalBonus:setFinalBonus,selectItem:selectItem,discountHandler:discountHandler , setmoney:setmoney, UserData:UserData, setUserData:setUserData, clearBucket:clearBucket, setMinOrder:setMinOrder, MinOrder:MinOrder, setMinOrder:setMinOrder, setItems:setItems , Items:Items , setloader:setloader , loader:loader, deleteCard:deleteCard,StaticData:StaticData, setStaticData:setStaticData , modalId:modalId}}>
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


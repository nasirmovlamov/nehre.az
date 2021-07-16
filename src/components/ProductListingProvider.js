import React, {useState , createContext, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import ProductModal from './ProductModal';
import Modal from '@material-ui/core/Modal';
import { parse } from 'date-fns';
import axios from 'axios';
import CardPage from '../pages/CardPage';
import LoginPage from '../pages/LoginPage';
import AuthSmsL from '../components/AuthSmsL';
import Registration from '../pages/Registration';
import CheckoutPage from '../pages/CheckoutPage';


export const ProductListingContext = createContext()
export function ProductListingProvider(props) {
    const notifyAddBasket = () => toast.info((lang === "AZ" && `Məhsul səbətə əlavə edildi` || lang === "EN" && `The product has added to the cart` || lang === "RU" && `Товар добавлен в корзину`) , {draggable: true, autoClose: 1000,});
    const notifyRemoveBasket = () => toast.info((lang === "AZ" && `Məhsul səbətdən çıxarıldı` || lang === "EN" && `The product was removed from the basket` || lang === "RU" && `Товар удален из корзины`)  , {draggable: true, autoClose: 1000,});
    const notifyLogin = () => toast.warning((lang === "AZ" && `Hesabınıza daxil olun!` || lang === "EN" && `Log in to your account!` || lang === "RU" && `Войдите в свою учетную запись!`) , {draggable: true,});
    const notifyTC = (till) => toast.warn(`${till/60} dəqiqə sonra yenidən cəhd edin`);
    const notifyAuth = () => toast.error(
        <div className="authCont">
          <p className="title">{ <>{"Hesabınızı təsdiqləyin !" }</>} </p>  
          <button onClick={() => smsHandle()} className='phoneAuth'>Telefonla təsdiqləmək</button>
          <button onClick={() => logout()} className='phoneAuth'>Çıxış</button>
          <p>{tillCount > 0 &&  <>{(tillCount/60)} dəqiqə sonra yenidən yoxlayın</> }</p>
        </div>
        , {
        position: "top-right",
        autoClose:8000,
        hideProgressBar: 100,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        width:"450px",
        progress: undefined,
        });
    
    
      
     
    //#region Logout
        const logout = () => {
            localStorage.clear()
            window.location.reload()
        }
    //#endregion Logout

    //#region Default Values
        const [UserData, setUserData] = useState({})
        const [UserStatus, setUserStatus] = useState(false)
      
        const [loader, setloader] = useState(true)
        const [StaticData , setStaticData] = useState({})
        const [ProdutData, setProdutData] = useState([])
        const [FinalPrice, setFinalPrice] = useState(0)
        const [FinalWeight, setFinalWeight] = useState(0)
        const [FinalGoods, setFinalGoods] = useState(0)
        const [FinalBonus, setFinalBonus] = useState(0)
        const [DateGoods, setDateGoods] = useState([])
        const [TopCategory, setTopCategory] = useState([])
        const [number1, setnumber1] = useState("")
        const [number2, setnumber2] = useState("")
        const [SelectedsProduct, setSelectedsProduct] = useState([])
        const langArr = ["AZ" , "EN" , "RU"]
        const [lang, setlang] = useState()
        const [money, setmoney] = useState()
        const [currency, setcurrency] = useState()
        const [MinOrder, setMinOrder] = useState()
        const [Items, setItems] = useState()

        const [TopCards, setTopCards] = useState([])
        const [NewProducts, setProduct] = useState([])
        const [SpecialOffers, setSpecialOffers] = useState([])
        const [SuppliersCard, setSuppliersCard] = useState([])
        const [AnswerCard, setAnswerCard] = useState([])
        const [Assortment, setAssortment] = useState([])
        const [Banners1, setBanners1] = useState([])
        const [Banners2, setBanners2] = useState([])
        const [SearchResult, setSearchResult] = useState()
    //#endregion Default Values

    //#region Product Add Remove Delete DiscountHandler 
        const discountHandler = (product) => {
            if (product?.discount !== null) {
                var discountPrice = 0;
                discountPrice =  Math.round( ((product?.qiymet - (product?.qiymet  * product?.discount) / 100)) )
                return Math.floor(discountPrice);         
            } 
            else {
                return Math.floor(product?.qiymet)
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
                console.log(string)
                setTimeout(() => {}, 300);
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
            let num = parseInt(product.id)
            
            const price = parseFloat(discountHandler(product))
            const weight = parseFloat(product.ceki_hecm)
            const unitType = parseInt(product.unit.unit_id)
            const dates = product.delivery
            const name = product.title
            let bonus = 0
            if (product?.category_data?.cashback > 0 && product?.category_data !== null) {
                bonus = parseInt(product.category_data.cashback)
            }
            else 
            {
                bonus = parseInt(product.cashback)
            }

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
            let arrayA = DateGoods;
            let arrayB = dates;
            let newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y === x)))
            let uniqueDates = [...new Set(newArray)];
            // #endregion setterfunctions 
            setFinalPrice(FinalPriceCartAdd)
            setFinalGoods(FinalGoodsCartAdd)
            setFinalBonus(FinalBonusCartAdd)
            setDateGoods(uniqueDates)
            
            let index = ProdutData.findIndex(x=> x.id === num);
            
            if (index === -1) {
                weightChecker(weight , unitType, 'add' , 0)
                // product , FinalPrice, FinalWeight, FinalGoods, FinalBonus, DateGoods
                FinalWeightCartAdd = weightChecker(weight , unitType, 'add' , 0)
                let productAddcartdata = []
                productAddcartdata = [...ProdutData , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name, weight:weight, unitType:unitType, bonus:bonus, product:product}]
                console.log(productAddcartdata)
                setProdutData(productAddcartdata)
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
                
                let newArr = [...ProdutData]
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
            console.log(uniqueDates)
        }

        const removeItem = (product) => {
            notifyRemoveBasket()
            //#region Add Cart Values
            let num = product.id
            
            const price = discountHandler(product)
            const weight = product.ceki_hecm
            const unitType = product.unit.unit_id
            const dates = product.delivery
            const name = product.title
            let bonus = 0

            if (product?.category_data?.cashback > 0 && product?.category_data !== null) {
                bonus = product.category_data.cashback
            }else 
            {
                bonus = product.cashback
            }
            let productCartAdd = {} 
            let FinalPriceCartAdd = 0
            let FinalWeightCartAdd = 0
            let FinalGoodsCartAdd = 0
            let FinalBonusCartAdd = 0
            let DateGoodsCartAdd = []
        
            //#endregion Add Cart Values
            let index = ProdutData.findIndex(x=> x.id === num);
            
            if (ProdutData[index].count > 0) {
                let uniqueDates = []
                let dateall = []
                FinalPriceCartAdd = FinalPrice - parseInt(price)
                FinalGoodsCartAdd = FinalGoods - 1
                FinalBonusCartAdd = FinalBonus - parseInt(bonus)
                let newArr = [...ProdutData]
                newArr[index].count--
                newArr = newArr.filter(element => element.count !== 0)
                let productAddcartdata = newArr
                setProdutData(productAddcartdata)
                for (let i = 0; i < productAddcartdata.length; i++) {
                    dateall.push(...productAddcartdata[i].product.delivery)
                }
                console.log("dateall" + dateall)
                uniqueDates = [...new Set(dateall)];
                console.log('unique ' + uniqueDates)
                // for (let i = 0; i < newArr.length; i++) {
                //     for (let i = 0; i < newArr[i]?.date?.length; i++) {
                //         dates.push(newArr[i]?.date[i])
                //     }
                // }
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

        const clearBucket = async () => {
            setFinalPrice(0)
            setFinalGoods(0)
            setFinalWeight(0)
            setFinalBonus(0)
            setProdutData([])
            setDateGoods([])
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
            let num = parseInt(product.id)
            
            const price = parseFloat(discountHandler(product))
            const weight = parseFloat(product.ceki_hecm)
            const unitType = parseInt(product.unit.unit_id)
            const dates = product.delivery
            const name = product.title
            let uniqueDates = []
            let dateall = []

            let bonus = 0
            if (product?.category_data?.cashback > 0 && product?.category_data !== null) {
                bonus = parseInt(product.category_data.cashback)
            }else 
            {
                bonus = parseInt(product.cashback)
            }
            let productCartAdd = {} 
            let FinalPriceCartAdd = 0
            let FinalWeightCartAdd = 0
            let FinalGoodsCartAdd = 0
            let FinalBonusCartAdd = 0
            let DateGoodsCartAdd = []
            var index = ProdutData.findIndex(x=> x.id === num);
            
            //#endregion Add Cart Values



            FinalPriceCartAdd = parseFloat(FinalPrice) - parseFloat(price * ProdutData[index]?.count)
            FinalGoodsCartAdd = parseInt(FinalGoods) - parseInt(ProdutData[index]?.count)
            FinalBonusCartAdd = parseFloat(FinalBonus) - parseFloat(bonus * ProdutData[index]?.count)

            weightChecker(weight , unitType , 'delete' , index)
            FinalWeightCartAdd = weightChecker(weight , unitType , 'delete', index)
            let productAddcartdata = ProdutData.filter((item) => item.id !== num)
            let filteredItems = Items.filter((item) => item.id !== num)
            

            setProdutData(productAddcartdata)
            setItems(filteredItems)
            let testarr = ProdutData.filter((item) => item.id !== num)
            
            for (let i = 0; i < testarr.length; i++) {
                console.log('productAddcartdata[i].product.delivery' + testarr[i].product.delivery)
                dateall.push(...testarr[i].product.delivery)
            }
            console.log("dateall" + dateall)
            uniqueDates = [...new Set(dateall)];
            console.log('unique ' + uniqueDates)
            
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
            console.log(uniqueDates)
            
        }
    //#endregion Product Add Remove Delete DiscountHandler 

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
    
    //#region Bucket
    const [openBucket, setOpenBucket]   = React.useState(false);

    const openBucketF = () => {
        setOpenBucket(true);
      }
      
    const closeBucketF = () => {
        setOpenBucket(false);
    };
    //#endregion Bucket

    //#region Checkout
        const [openCheckout, setopenCheckout] = React.useState(false);

        const openCheckoutF = () => {
            if(UserData?.id !== undefined)
            {
                setopenCheckout(true);
            }
            else 
            {
            notifyLogin()
                setTimeout(() => {
                    closeBucketF()
                    OpenLoginF()
                }, 500);
            }
            
        }
        const closeCheckoutF = () => {
            setopenCheckout(false);
        };
    //#endregion Checkout

    //#region Login
    
    const [OpenLogin, setOpenLogin] = useState(false)
    
    const OpenLoginF = () =>{
        if (UserData?.id !== undefined ) {
            axios.get(`https://nehra.az/public/api/checkstatus?user_id=${UserData?.id}`)
            .then(res => (res.data[0] == 1 ? window.location.href = '/memberarea'  : notifyAuth())) 
          }
          else 
          {
           setOpenLogin(true) 
          }
    }
    const CloseLoginF = () =>{
        setOpenLogin(false)  
    }

    //#endregion Login

    //#region SMS
    const [tillCount, settillCount] = useState(null)
    const smsHandle = () => {
        axios.post('https://nehra.az/public/api/resendsms' , {user_id:JSON.parse(localStorage.getItem('LoginUserData')).id})
        .then(res => (res.status ===200 && (((res.data !== ""  && res.data <= 0) && handleOpenSMS()) , ((res.data > 0) && notifyTC(res.data)) )) )
      }

    const [openSMS, setOpenSMS] = React.useState(false);

    const handleOpenSMS = () => {
        setOpenSMS(true);
    }

    const handleCloseSMS = () => {
        setOpenSMS(false);
    }
    //#endregion SMS

    //#region Register
    const [openRegister, setopenRegister] = React.useState(false);
    const openRegisterF = () => {
        setopenRegister(true);
    }
    const closeRegisterF = () => {
        setopenRegister(false);
    }
    //#endregion Register

    

    return (
        <ProductListingContext.Provider value={{ SearchResult:SearchResult, setSearchResult:setSearchResult, ProdutData:ProdutData,currency:currency, setcurrency:setcurrency, addCart:addCart, setProdutData:setProdutData, FinalPrice:FinalPrice, setFinalPrice:setFinalPrice, FinalWeight:FinalWeight, setFinalWeight:setFinalWeight,FinalGoods:FinalGoods, setFinalGoods:setFinalGoods, addItem:addItem, removeItem:removeItem, lang:lang , setlang:setlang,  money:money , langArr:langArr, DateGoods:DateGoods,setDateGoods:setDateGoods , SelectedsProduct:SelectedsProduct, setSelectedsProduct:setSelectedsProduct, OpenLoginF:OpenLoginF,CloseLoginF:CloseLoginF, setOpenLogin:setOpenLogin , OpenLogin:OpenLogin, handleOpenPM:handleOpenPM, handleClosePM:handleClosePM, modalIdsetter:modalIdsetter, modalId:modalId, FinalBonus:FinalBonus, setFinalBonus:setFinalBonus,discountHandler:discountHandler , setmoney:setmoney, UserData:UserData, setUserData:setUserData, clearBucket:clearBucket, setMinOrder:setMinOrder, MinOrder:MinOrder, setMinOrder:setMinOrder, setItems:setItems , Items:Items , setloader:setloader , loader:loader, deleteCard:deleteCard,StaticData:StaticData, setStaticData:setStaticData , modalId:modalId, UserStatus:UserStatus, setUserStatus:setUserStatus, setnumber2:setnumber2, setnumber1:setnumber1, number1:number1, number2:number2 , setTopCategory:setTopCategory, TopCategory:TopCategory ,openCheckoutF:openCheckoutF, closeCheckoutF:closeCheckoutF, closeRegisterF:closeRegisterF, openRegisterF:openRegisterF, openBucketF:openBucketF, closeBucketF:closeBucketF, notifyAuth:notifyAuth, setProduct:setProduct, NewProducts:NewProducts,  setTopCards:setTopCards, TopCards:TopCards, SpecialOffers:SpecialOffers, setSpecialOffers:setSpecialOffers,AnswerCard:AnswerCard, setAnswerCard:setAnswerCard,Assortment:Assortment,setAssortment:setAssortment, Banners1:Banners1,setBanners1:setBanners1,Banners2:Banners2,setBanners2:setBanners2,SuppliersCard:SuppliersCard,setSuppliersCard:setSuppliersCard}}>
            {props.children}
            <div className="modalCont">

                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={OpenLogin}
                    // onClose={handleClose3}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<LoginPage />}
                </Modal>

                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={openRegister}
                    // onClose={handleClose4}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<Registration />}
                </Modal>

                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<ProductModal />}
                </Modal>

                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={openCheckout}
                    onClose={closeCheckoutF}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<CheckoutPage/>}
                </Modal>

                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={openBucket}
                    onClose={closeBucketF}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<CardPage/>}
                </Modal>

                <Modal  
                    style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                    open={openSMS}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {<AuthSmsL functionClose={() => handleCloseSMS() }  tillCount={tillCount}/>}
                </Modal>
            </div>
        </ProductListingContext.Provider>
    )
}


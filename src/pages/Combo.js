import React , {useContext} from 'react'
import '../assets/css/combo.css'
import xalisBal from "../assets/images/xalisBal.jpg"
import ItemCard from '../components/ItemCard'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useParams } from 'react-router';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import {ProductListingContext} from '../components/ProductListingProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));  
function Combo(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    const [loader, setloader] = useState(false)
    let { slug } = useParams();
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => { setAge(event.target.value);};
    const notifyAddBasket = () => toast.success(`Combo səbətə əlavə olundu` , {draggable: true, autoClose: 1000,});


    const [CategoryData, setCategoryData] = useState()
    const [ProductData, setProductData] = useState([0])
    const sendGetRequestCategory = async () => {
      try {
          const resp = await axios.get(`https://nehra.az/public/api/combo/${slug}`)
          setCategoryData(resp.data)
          setProductData(resp.data.products)
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
    };
    const sendGetRequestCategoryFilter = async (id) => {
      setloader(true)
      setProductData([])
      try {
          const resp = await axios.get(`https://nehra.az/public/api/combo/${slug}`)
          setloader(false)
          setProductData(resp.data.products_of_cat)
      } catch (err) {
          setloader(false)
          console.error(err);
      }
    };
    useEffect(() => {
      sendGetRequestCategory()
    }, [])

    const filterHandler = (num) => {
      var tags = document.querySelectorAll('.tag')
      for (let i = 0; i < tags.length; i++) {
          tags[i].setAttribute('style' , 'background-color: white;color: black; border: 1px solid lightgray;transition: 0.5s all;')        
      }
      document.getElementById(`tagone${num}`).setAttribute('style' , 'background-color: #2d5d9b;color: white; border: 1px solid white;transition: 0.5s all;')
      sendGetRequestCategoryFilter(num)
    }

    const greater = (id) => {
      console.log("YES" + id);
    }
    const buyElement = (discount , id , weight , unitType , price , title, dates) => {
        
        greater(id)
        console.log(discount + " " +  id + " " +  weight + " " +  unitType + " " +  price + " " +  title+ " " + " " +  dates);
    }

    const buyCombo = () => {
        const notifyAddBasket = () => toast.success(`Səbətə Əlavə olundu` , {draggable: true, autoClose: 1000,});
        var WholeWeight = FinalWeight
        var WholePrice = FinalPrice
        var WholeGoods = FinalGoods
        var datesCombo = []
        var productsCombo = []

        const addItemCombo  = (num,price , weight , unitType , dates , name) => {
            if (parseInt(unitType) === 4) {
              WholeWeight  += (parseFloat(weight) / 1000)
            }
            else 
            {
              WholeWeight += parseFloat(weight)
            }
            WholePrice += parseInt(price)
            WholeGoods += 1

            var arrayA = DateGoods;
            var arrayB = dates;
            var newArray = arrayA.concat(arrayB.filter(x => !arrayA.some(y => y === x)))
            let uniqueDates = [...new Set(newArray)];
            datesCombo = uniqueDates
            localStorage.setItem('DateGoods' , (JSON.stringify(uniqueDates)))
            var index = ProdutData.findIndex(x=> x.id === num);
            console.log(index)
            if (index === -1) {
                productsCombo = [...productsCombo , {id:num , count:1, cost:parseInt(price).toFixed(0) , date:dates, name:name, weight:weight, unitType:unitType}]
            }
            else 
            {
                var newArr = [... ProdutData]
                newArr[index].count++
                productsCombo = newArr
            }
            
            
          }  
          
          const discountHandler = (discount , mainprice) => {
            if (discount !== 0 && discount !== null) {
              var discountPrice = 0;
              discountPrice =  Math.round( ((mainprice - (mainprice * discount) / 100)) )
              return Math.floor(discountPrice);         
            } 
          else {
            return Math.floor(mainprice)
          }
        }
        
        
        notifyAddBasket()

        for (let i = 0; i < ProductData.length; i++) {
          addItemCombo(ProductData[i].id , discountHandler(ProductData[i].discount , ProductData[i].qiymet) , parseFloat(ProductData[i].ceki_hecm) ,  ProductData[i]?.unit?.id ,  ProductData[i].delivery ,  ProductData[i].title)
        }
        
        setFinalPrice((parseInt(WholePrice)))
        setFinalWeight((parseFloat(WholeWeight)))
        setProdutData((productsCombo))
        setFinalGoods((parseInt(WholeGoods)))
        setDateGoods(datesCombo)
        
        localStorage.setItem('FinalGoods' , (parseInt(WholeGoods)))
        localStorage.setItem('FinalPrice' , (parseInt(WholePrice)))
        localStorage.setItem('FinalWeight' , (parseFloat(WholeWeight)))
      }

    const comboImage =  {
        backgroundImage: `url(https://nehra.az/storage/app/public/${CategoryData?.overvew.images})`,
        backgroundPosition: 'center center',
    }
    
    return (
        <div className="comboPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {(lang === "AZ" && `Əsas Səhifə`) || (lang === "EN" && `Homepage`) || (lang === "RU" && `Домашняя страница`)} • {lang === "AZ" && CategoryData?.overvew.name_az || lang === "EN" && CategoryData?.overvew.name_en || lang === "RU" && CategoryData?.overvew.name_ru }</span>  </p>
                        <h2 className="categoryName">{lang === "AZ" && CategoryData?.overvew.name_az || lang === "EN" && CategoryData?.overvew.name_en || lang === "RU" && CategoryData?.overvew.name_ru }</h2>
                </div>
            </div>

            
            <div className="comboImage" style={comboImage}></div>
            
            <p className="comboDescription">
              {lang === "AZ" && CategoryData?.overvew?.description_az || lang === "EN" && CategoryData?.overvew?.description_en || lang === "RU" && CategoryData?.overvew?.description_ru}
            </p>
            <p className="comboItemsNum">{lang === "AZ" && "Comboya daxil olan məhsullar" || lang === "EN" && "Products included in the combination" || lang === "RU" && "Продукты, входящие в комбинацию"}</p>
            <div className="productsCont">
                {
                  loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> 
                  :
                  ( ProductData.length >= 1 ? ProductData.map(product =>  <ItemCard btnDisable={true}  delivery={product?.delivery} image={product?.thumb}  title={product?.title}  desc={product?.seller_data?.name}  unitType={product?.unit?.id} id={product?.id} price={money === "₼" ? product?.qiymet : Math.floor(product?.qiymet / 1.7)}  weight={product?.ceki_hecm}  discount={product?.discount} productModal={props?.productModal}  id={product?.id}  star={product?.starsall}/>) :  ((lang === "AZ" && `Məhsul stokda mövcud deyil `) || (lang === "EN" && `The product is not available in stock`) || (lang === "RU" && `Товара нет в наличии`)))
                }
            </div>

            <p className="buyComboCont">
                <p className="price"> {(lang === "AZ" && `Dəstin qiyməti: `) || (lang === "EN" && `Price of combo`) || (lang === "RU" && `Цена комбо`)}<span className='number'> {money === "₼" ?  CategoryData?.overvew?.price :  (CategoryData?.overvew?.price / 1.7).toFixed(1)} {money} </span> </p>
                <button onClick={() => buyCombo()} className="buyCombo"> {(lang === "AZ" && `Dəsti Səbətə əlavə edin`) || (lang === "EN" && `Add  comb to the basket`) || (lang === "RU" && `Добавьте в корзину`)}</button>
            </p>

        </div>
    )
}

export default Combo

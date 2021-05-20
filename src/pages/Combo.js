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
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)
    const [loader, setloader] = useState(false)
    let { slug } = useParams();
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => { setAge(event.target.value);};


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
        const discountHandler = (discount) => {
          if (discount !== 0 && discount !== null) {
              var discountPrice = 0;
              discountPrice =  Math.round( ((price - (price * discount) / 100)) )
              return Math.floor(discountPrice);         
          } 
          else {
              return Math.floor(price)
          }
        }
        greater(id)
        console.log(discount + " " +  id + " " +  weight + " " +  unitType + " " +  price + " " +  title+ " " + " " +  dates);
        addItem(id , discountHandler(discount) , weight , unitType , dates , title)
    }

    const buyCombo = () => {
        ProductData.forEach(product => { buyElement(product?.discount , product.id , product?.ceki_hecm , product?.unit , product?.qiymet , product?.title , product?.delivery)});
        // ProductData.map(product => buyElement(product.discount , product.id , product.ceki_hecm , product.unit , product.qiymet))
    }

    const comboImage =  {
        backgroundImage: `url(https://nehra.az/storage/app/public/${CategoryData?.overvew.images})`
    }
    
    return (
        <div className="comboPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`}  • {CategoryData?.overvew.name}</span>  </p>
                        <h2 className="categoryName">{CategoryData?.overvew.name}</h2>
                </div>
            </div>

            
            <div className="comboImage" style={comboImage}></div>
            
            <p className="comboDescription">
              {CategoryData?.overvew?.description}
            </p>
            <p className="comboItemsNum">Comboya daxil olan məhsullar</p>
            <div className="productsCont">
                {
                  loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> 
                  :
                  ( ProductData.length >= 1 ? ProductData.map(product =>  <ItemCard ParcelWeight={props.ParcelWeight} setParcelWeight={props.setParcelWeight} NumberOfGoods={props.NumberOfGoods} setNumberOfGoods={props.setNumberOfGoods} setPaymentPrice={props.setPaymentPrice} PaymentPrice={props.PaymentPrice}  modalOpener3={props.modalOpener3} cardId={product.id} image={product.thumb}    title={product.title} desc={product.seller_id} price={money === "₼" ? product.qiymet : Math.floor(product.qiymet / 1.7)} weight={product.ceki_hecm} discount={product.discount} star={product.star_count}/>) : "Məhsul stokda mövcud deyil ")
                }
            </div>

            <p className="buyComboCont">
                <p className="price">Combonun qiyməti: <span>  {CategoryData?.overvew?.price}</span> </p>
                <button onClick={buyCombo} className="buyCombo">Səbətə əlavə edin</button>
            </p>

        </div>
    )
}

export default Combo

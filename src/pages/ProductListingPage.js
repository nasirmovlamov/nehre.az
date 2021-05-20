import React , {useContext} from 'react'
import '../assets/css/productListingPage.css'
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
function ProductListingPage(props) {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money , langArr, DateGoods,setDateGoods] = useContext(ProductListingContext)
    const [loader, setloader] = useState(false)
    let { id } = useParams()
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [CategoryData, setCategoryData] = useState()
    const [ProductData, setProductData] = useState([0])
    const sendGetRequestCategory = async () => {
      document.getElementById(`tagone${id}`).setAttribute('style' , 'background-color: #2d5d9b;color: white; border: 1px solid white;transition: 0.5s all;')
      try {
          const resp = await axios.get(`https://nehra.az/public/api/category/${id}`)
          setCategoryData(resp.data)
          setProductData(resp.data.products_of_cat)
      } catch (err) {
          // Handle Error Here
          console.error(err);
      }
    };
    const sendGetRequestCategoryFilter = async (id) => {
      setloader(true)
      setProductData([])
      try {
          const resp = await axios.get(`https://nehra.az/public/api/category/${id}`)
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

    return (
        <div className="productPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`}  • {CategoryData?.category_data?.name}</span>  </p>
                        <h2 className="categoryName">{CategoryData?.category_data?.name}</h2>
                        <div className="tags">
                          <button  id={`tagone${id}`} onClick={() => filterHandler(id)} className="tag" >Hamısı</button>
                          {CategoryData?.child_categories?.map(element =>  <button onClick={() => filterHandler(element.id)} id={`tagone${element.id}`} className={`tag tag${id}`} >{element.name}</button>  )}
                        </div>
                    </div>
            </div>

            <div className="titleProductsCont">
                <div className="dateAndItemCont">
                  <select className="selectionFilter">
                      <option value="byPopularity">{lang === "AZ" && `populyarlığa görə` || lang === "EN" && `by popularity` || lang === "RU" &&  `по популярности`}</option>
                      <option value="byPopularity">{lang === "AZ" && `əlifba sırası ilə` || lang === "EN" && `alphabetically` || lang === "RU" && `по алфавиту`}  </option>
                      <option value="byPopularity">{lang === "AZ" && `yeni` || lang === "EN" && `new` || lang === "RU" && `новый`}  </option>
                      <option value="byPopularity">{lang === "AZ" && `bahalı` || lang === "EN" && `expensive` || lang === "RU" && `дорого`}  </option>
                      <option value="byPopularity">{lang === "AZ" && `ucuz` || lang === "EN" && `cheaper` || lang === "RU" && `более дешевый`}  </option>
                  </select>
                    <p className="itemsNumber">{ProductData.length} {lang === "AZ" && `məhsul` || lang === "EN" && `items` || lang === "RU" &&  `предметы`}</p>
                </div>
            </div>

            <div className="productsCont">
                {
                  loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> :
                  ( ProductData.length >= 1 ? ProductData.map(product =>  <ItemCard delivery={product.delivery} id={product.id} ParcelWeight={props.ParcelWeight} setParcelWeight={props.setParcelWeight} NumberOfGoods={props.NumberOfGoods} setNumberOfGoods={props.setNumberOfGoods} setPaymentPrice={props.setPaymentPrice} PaymentPrice={props.PaymentPrice}  modalOpener3={props.modalOpener3} cardId={product.id} image={product.thumb}    title={product.title}  desc={product.seller_id}  unitType={product.unit} price={money === "₼" ? product.qiymet : Math.floor(product.qiymet / 1.7)} weight={product.ceki_hecm} discount={product.discount}   productModal={props.productModal} id={product.id}  star={product.starsall}/>) : "Məhsul stokda mövcud deyil ")
                }
            </div>
        </div>
    )
}

export default ProductListingPage

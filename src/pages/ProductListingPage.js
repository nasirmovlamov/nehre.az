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
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)
    const [loader, setloader] = useState(false)
    let { id } = useParams()
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [CategoryData, setCategoryData] = useState()
    const [CategoryNum, setCategoryNum] = useState(id)
    const [ProductData, setProductData] = useState([])
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
    const sendGetRequestCategoryFilter = async (id=CategoryNum , parameter='') => {
      setloader(true)
      setProductData([])
      try {
          const resp = await axios.get(`https://nehra.az/public/api/category/${id} + ${parameter !== "" ? `?parameter=${parameter}` : ""}`)
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
      setCategoryNum(num)
      sendGetRequestCategoryFilter(num)
    }

    const [filterType, setFilterType] = useState('populyarlığa görə')

    const filterChange = (e) => {
      setFilterType(e.target.value)
      sendGetRequestCategoryFilter(CategoryNum , e.target.value)
    }

    return (
        <div className="productPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`}  • {lang === "AZ" && CategoryData?.category_data?.name || lang === "EN" && CategoryData?.category_data?.name_en || lang === "RU" && CategoryData?.category_data?.name_ru}</span>  </p>
                        <h2 className="categoryName">{lang === "AZ" && CategoryData?.category_data?.name || lang === "EN" && CategoryData?.category_data?.name_en || lang === "RU" && CategoryData?.category_data?.name_ru}</h2>
                        <div className="tags">
                          <button  id={`tagone${id}`} onClick={() => filterHandler(id)} className="tag" >{lang === "AZ" && "Hamısı" || lang === "EN" && "All" || lang === "RU" && "Все"}</button>
                          {CategoryData?.child_categories?.map(element =>  <button onClick={() => filterHandler(element.id)} id={`tagone${element.id}`} className={`tag tag${id}`} > {lang === "AZ" && element.name || lang === "EN" && element.name_en || lang === "RU" && element.name_ru}</button>  )}
                        </div>
                    </div>
            </div>

            <div className="titleProductsCont">
                <div className="dateAndItemCont">
                  <select className="selectionFilter" value={filterType} onChange={(e) => filterChange(e)}>
                      <option value="popular">{lang === "AZ" && `populyarlığa görə` || lang === "EN" && `by popularity` || lang === "RU" &&  `по популярности`}</option>
                      <option value="alphabet">{lang === "AZ" && `əlifba sırası ilə` || lang === "EN" && `alphabetically` || lang === "RU" && `по алфавиту`}  </option>
                      <option value="new">{lang === "AZ" && `yeni` || lang === "EN" && `new` || lang === "RU" && `новый`}  </option>
                      <option value="expensive">{lang === "AZ" && `bahalı` || lang === "EN" && `expensive` || lang === "RU" && `дорого`}  </option>
                      <option value="cheap">{lang === "AZ" && `ucuz` || lang === "EN" && `cheaper` || lang === "RU" && `более дешевый`}  </option>
                  </select>
                    <p className="itemsNumber">{ProductData.length} {lang === "AZ" && `məhsul` || lang === "EN" && `items` || lang === "RU" &&  `предметы`}</p>
                </div>
            </div>

            <div className="productsCont">
                {
                  loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> :
                  ( ProductData.length >= 1 ? ProductData.map(product =>  <ItemCard delivery={product?.delivery} cardId={product?.id} image={product?.thumb}  title={product?.title}  desc={ (lang === "AZ" && product?.seller_data?.name) || (lang === "EN" && product?.seller_data?.name_en) || (lang === "RU" && product?.seller_data?.name_ru)}  unitType={product?.unit.unit_id} unitId={product?.unit.id}  unitAd={ (lang === "AZ" && product?.unit.ad) || (lang === "EN" && product?.unit.ad_en) || (lang === "RU" && product?.unit.ad_ru)} price={Math.floor(product?.qiymet)} weight={product?.ceki_hecm}   discount={product?.discount} productModal={props?.productModal} bonus={product.cashback} star={product?.starsall}/>) : "Məhsul stokda mövcud deyil ")
                }
            </div>
        </div>
    )
}

export default ProductListingPage

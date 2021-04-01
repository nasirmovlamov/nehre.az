import React from 'react'
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
                        <p className="category"> <span>home • {CategoryData?.category_data?.name}</span>  </p>
                        <h2 className="categoryName">{CategoryData?.category_data?.name}</h2>
                        <div className="tags">
                          <button  id={`tagone${id}`} onClick={() => filterHandler(id)} className="tag" >Hamısı</button>
                          {CategoryData?.child_categories?.map(element =>  <button onClick={() => filterHandler(element.id)} id={`tagone${element.id}`} className={`tag tag${id}`} >{element.name}</button>  )}
                        </div>
                    </div>
            </div>

            <div className="titleProductsCont">
                <div className="dateAndItemCont">
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Tarix</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={7}>Son 7 gün </MenuItem>
                  <MenuItem value={30}>Son 30 gün</MenuItem>
                  <MenuItem value={90}>Son 90 gün</MenuItem>
                </Select>
              </FormControl>
                    <p className="itemsNumber">343 items</p>
                </div>
                <select className="selectionFilter">
                    <option value="byPopularity">by popularity</option>
                    <option value="byPopularity">alphabetically</option>
                    <option value="byPopularity">new</option>
                    <option value="byPopularity">expensive</option>
                    <option value="byPopularity">cheaper</option>
                    <option value="byPopularity">by supplier</option>
                </select>
            </div>

            <div className="productsCont">
                
                {
                  loader === true ? <div className="loader"><ReactLoading type={"bubbles"} color={"#2d5d9b"} height={27} width={125} /></div> :
                  ( ProductData.length >= 1 ? ProductData.map(product =>  <ItemCard ParcelWeight={props.ParcelWeight} setParcelWeight={props.setParcelWeight} NumberOfGoods={props.NumberOfGoods} setNumberOfGoods={props.setNumberOfGoods} setPaymentPrice={props.setPaymentPrice} PaymentPrice={props.PaymentPrice}  modalOpener3={props.modalOpener3} cardId={product.id} image={product.thumb}    title={product.title} desc={product.seller_id} price={product.qiymet} weight={product.ceki_hecm} discount={product.discount} star={product.star_count}/>) : "Məhsul stokda mövcud deyil ")
                }
            </div>
        </div>
    )
}

export default ProductListingPage

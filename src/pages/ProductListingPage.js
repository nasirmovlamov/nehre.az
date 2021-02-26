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
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="productPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span>home •</span>  {props.category}</p>
                        <h2 className="categoryName">{props.category}</h2>
                        {!props.notags  &&     
                        (<div className="tags">
                            <button className="tag" > All</button>
                            <button className="tag" > Eggs</button>
                            <button className="tag" > Cheese</button>
                        </div>)
                        }
                    
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
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={10}/>  
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>  
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
                <ItemCard image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
            </div>
        </div>
    )
}

export default ProductListingPage

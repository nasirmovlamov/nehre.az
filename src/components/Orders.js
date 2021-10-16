import axios from 'axios';
import React from 'react'
import { useEffect  , useContext} from 'react';
import { useState } from 'react';
import {ProductListingContext} from '../components/ProductListingProvider'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function createData(id, status, fat, carbs, protein, price) {
    return {
      id,
      status,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const context = useContext(ProductListingContext)
  const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  const notifyCancel = (rate) => toast.info(`${(lang === "AZ" && `Sifariş ləğv olundu!` || lang === "EN" && `Order has canceled!` || lang === "RU" && `Заказ отменен!`)}  ` , {draggable: true,});
  const notifyError = (rate) => toast.error(`${(lang === "AZ" && `Sistem xətası!` || lang === "EN" && `System error!` || lang === "RU" && `Заказ отменен!`)}  ` , {draggable: true,});

    const cancelOrder = async(id) => {
        try {
            const resp  = await axios.post("https://nehra.az/api/cancelorder" , {id:id})
            notifyCancel()
        } catch (error) {
            notifyError()
        }
    }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right" style={{textAlign:"center" , width:"200px"}}>{row.order_status}</TableCell>
        <TableCell align="right">{row.total} 	₼</TableCell>
        <TableCell align="right">{JSON.parse(row.products).length} {(lang === "AZ" && `Ədəd`) || (lang === "EN" && `Products`) || (lang === "RU" && `Продукты`)}</TableCell>
        <TableCell align="right" style={{textAlign:"center" , width:"100px"}}>{row.order_date}</TableCell>
        <TableCell>
                {/* <button
                    style={{marginTop:"0px"}}
                    aria-label="expand row"
                    size="small"
                    
                   
                >
                    
                    
                </button> */}
                <Button 
                    onClick={() => setOpen(!open)}  
                    style={{display:"flex", alignItems:"center", margin:"0px",width:"100px", justifyContent:"center",textTransform:"none"}} 
                    variant="outlined" > 
                    <div 
                    style={{margin:"0px", padding:"0px", display:"flex", alignItems:"center", justifyContent:"center" }}> 
                    <div>{(lang === "AZ" && `Ətraflı`) || (lang === "EN" && `More`) || (lang === "RU" && `Eще`)}</div>
                    </div> 
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Button>
        </TableCell>
        <TableCell>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"120px" , height:"100%", columnGap:"10px"}}>

                <Button 
                    onClick={() => cancelOrder(row.id)}  
                    style={{display:"flex", alignItems:"center", margin:"0px",width:"100px", justifyContent:"center",textTransform:"none"}} 
                    variant="text" > 
                    <div 
                    style={{margin:"0px", padding:"0px", display:"flex", alignItems:"center", justifyContent:"center" }}> 
                    <div>{(lang === "AZ" && `Ləğv et`) || (lang === "EN" && `Cancel`) || (lang === "RU" && `Отмена`)}</div>
                    </div> 
                </Button>
                {/* <button style={{marginTop:"0px"}}>
                   Pay
                </button> */}
            </div>
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {(lang === "AZ" && `Sifariş haqqında ətraflı`) || (lang === "EN" && `More about order`) || (lang === "RU" && `Подробнее о заказе`)}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>{(lang === "AZ" && `Məhsulun Adı`) || (lang === "EN" && `Name`) || (lang === "RU" && `Имя`)}</TableCell>
                    <TableCell>{(lang === "AZ" && `Qiymət`) || (lang === "EN" && `Price`) || (lang === "RU" && `Цена   `)} </TableCell>
                    <TableCell >{(lang === "AZ" && `Çəki`) || (lang === "EN" && `Weight`) || (lang === "RU" && `Масса`)}</TableCell>
                    <TableCell >{(lang === "AZ" && `Bonus`) || (lang === "EN" && `Bonus`) || (lang === "RU" && `Бонус`)}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {JSON.parse(row.products).map((historyRow) => (
                    <TableRow key={historyRow.id}>
                        <TableCell component="th" scope="row">
                            {historyRow.name}
                            {/* {((lang === "AZ" && historyRow.id) || (lang === "EN" && historyRow.unit.ad_en) || (lang === "RU" && historyRow.unit.ad_ru))} */}
                        </TableCell >
                        {/* <TableCell>{historyRow.customerId}</TableCell>
                        <TableCell align="right">{historyRow.amount}</TableCell> */}
                        <TableCell component="th" scope="row">
                            {historyRow.cost} 	₼
                        </TableCell>
                        <TableCell component="th" scope="row">{(historyRow.unit.id === 1 || historyRow.unit.id === 4 ) ?   historyRow.weight : historyRow.count }  {((lang === "AZ" && historyRow.unit.ad) || (lang === "EN" && historyRow.unit.ad_en) || (lang === "RU" && historyRow.unit.ad_ru))}</TableCell>
                        <TableCell component="th" scope="row">{historyRow.bonus } 	₼</TableCell>
                        {/* <TableCell align="right">Total price ($)</TableCell> */}
                        {/*
                        <TableCell align="right"><button> Cancel</button></TableCell>
                        <TableCell align="right"><button> Pay</button></TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function Orders() {
    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    const [Orders, setOrders] = useState([])
    const sendOrderRequest = async () => {
        try {
            const resp = await axios.post('https://nehra.az/public/api/getorder' , {user_id : JSON.parse(localStorage.getItem("LoginUserData")).id })   
            setOrders(resp.data);
            console.log(resp.data)
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        sendOrderRequest()
    }, [])


    

    
    return (
        <div className="cabinetCont address deposites bonuses">
            <p className="title">{(lang === "AZ" && `Sifarişlər Tarixi`) || (lang === "EN" && `Orders' Date`) || (lang === "RU" && `Дата заказа`)}</p>
            


            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell > {(lang === "AZ" && `ID`) || (lang === "EN" && `ID`) || (lang === "RU" && `ИД`)}</TableCell>
                        <TableCell> {(lang === "AZ" && `Status`) || (lang === "EN" && `Status`) || (lang === "RU" && `Cтатус`)} </TableCell>
                        <TableCell align="right"> {(lang === "AZ" && `Qiymət`) || (lang === "EN" && `Price`) || (lang === "RU" && `Цена   `)}</TableCell>
                        <TableCell align="right">{(lang === "AZ" && `Məhsullar`) || (lang === "EN" && `Products`) || (lang === "RU" && `Продукты`)} </TableCell>
                        <TableCell align="right">{(lang === "AZ" && `Tarix`) || (lang === "EN" && `Date`) || (lang === "RU" && `Дата`)} </TableCell>
                    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {Orders.map((order) => (
                        <Row  row={order} />
                    ))}
                    </TableBody>
                </Table>
             </TableContainer>
        </div>
    )
}

export default Orders

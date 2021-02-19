import React from 'react'
import "../assets/css/cardPage.css"
import clock from "../assets/images/clock.svg"
import Button1 from '../components/Button1'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import avatar from "../assets/images/avatar.jpg"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
function CardPage(props) {
    const imgHandler = {
        background: `url(${avatar}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }
    
    const DarkTT = withStyles((theme) => ({
        arrow: {
            color: theme.palette.common.black,
          },
        tooltip: {
          backgroundColor: "black",
          color: 'white',
          boxShadow: theme.shadows[1],
          fontSize: 11,
        },
      }))(Tooltip);
    const colorChang = {
        color: ""
    }

    const functionHandler = () => {
        props.functionOpenCheckoutPage()
        props.functionClose()
    }

    return (
        <div className="cardCont">
        
            <main className="mainSide">
                <p className="title">
                    Basket
                    <hr/>
                </p>
                <div className="gridCont1">
                    <div className="gridCont">
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        <div className="item">
                            <div className="imgCont" style={imgHandler}></div>
                            
                            <div className="aboutItem">
                            
                                <p className="title">Coho salmon salted</p>
                                <p className="priceAndWeight">535  / 250 g.</p>
                                <div className="dates">
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                    <div className="date">Be</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ç</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ça</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">C</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">Ş</div>
                                    </DarkTT>
                                    <DarkTT title="Delivery possible for" placement="top" arrow>
                                        <div className="date">B</div>
                                    </DarkTT>
                                </div>
                            </div>

                            <div className="btnCont">
                                <Button1 value={<RemoveIcon/>} color="#085096"/>
                                <p className="priceValue"> 1 </p>
                                <Button1 value={<AddIcon/>}  color="#085096"/>
                            </div>

                            <p className="price"> 2675 </p>

                            <button className="delete"><DeleteIcon/></button>

                        </div>
                        <hr/>
                        
                    </div>
                </div>


            </main>
            
            
            
            <aside className="aside">
                <div className="topPart">
                    <p className="text1"><img width="12px" src={clock} alt=""/>  Delivery soon </p>
                    <p className="text">30 yanvar <div className="date">BC</div></p>
                </div>
                
                <div className="downPart">
                    <div className="goods"><p className="key">Number of Goods</p> <p className="value ">28</p> </div> 
                    <div className="weight"><p className="key">Parcel  Goods</p> <p className="value value1" >28</p> </div> 
                    <div className="cost"><p className="key">Product cost</p> <p className="value value2">17626 </p> </div> 
                    <Button1 value="Checkout" color="#085096" function={functionHandler} />
                    <p className="cashback">There will be 10$ cashback</p>
                </div>

            </aside>
        </div>
    )
}

export default CardPage

import React,{useState} from 'react'
import "../assets/css/selectedSupllier.css"
import About from './About'
import Certificates from './Certificates'
import Description from './Description'
import Products from './Products'
import Reviews from './Reviews'
import StarSystem from './StarSystem'
function SelectedSupplier() {

    const styleChanger = {
        border:"1px solid lightgray",
        borderBottom: "0px",
        color: "#3b3b3b",
        backgroundColor: " #fff",
    }
    const [checker, setchecker] = useState(1)
    const clickHandler = (num) => {
        setchecker(num)
        
    }

    return (
        <div className="selectedSupllierCont">
            <div className="selectedSupplier">
                <p className="category"> <span>home • Manufacturer • </span>  Zinaida and Sergey Belan</p>


                <div className="videoAndAbout">
                    <iframe  className="supplierVideo" src="https://www.youtube.com/embed/tgbNymZ7vqY" ></iframe>
                    <div className="about">
                        <p className="name">Zinaida and Sergey Belan</p>
                        <div className="starAndReview"><StarSystem numberStar="5"/>  <p> 2,340 reviews </p> </div>
                        <p className="text">
                            Meet our suppliers of homemade pickles and canned food - Zinaida and Sergey Belan.
                            The Belan family prepares pickles and preparations according to unique homemade recipes, 
                            slightly modified in accordance with the technological standards of food production. 
                            “We tried to preserve the taste of homemade tomatoes, pickles and our favorite eggplant 
                            caviar, familiar from childhood,” says Zinaida.
                        </p>
                    </div>
                 </div>  {/* Video and About */}

                 <div className="topLinks">
                    <div className="btnContForLinks">
                        <button className="button" style={checker ===1 ? styleChanger : null } id="btnLink1" onClick={() => clickHandler(1)}>Products</button>
                        <button className="button" style={checker ===2 ? styleChanger : null } id="btnLink2" onClick={() => clickHandler(2)}>About the supplier </button>
                        <button className="button" style={checker ===3 ? styleChanger: null}  id="btnLink3" onClick={() => clickHandler(3)}>Certificates</button>
                        <button className="button" style={checker ===4 ? styleChanger: null}  id="btnLink4" onClick={() => clickHandler(4)}>Product Reviews</button>
                        <hr/>

                        <div className="linkComponent">
                            {checker === 1 ? <Products/> : "" }
                            {checker === 2 ? <About/> : ""}
                            {checker === 3 ? <Certificates/> : ""}
                            {checker === 4 ? <Reviews/> : ""}
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default SelectedSupplier

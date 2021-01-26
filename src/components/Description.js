import React from 'react'
import "../assets/css/description.css"
import Button1 from './Button1';
import avatar from "../assets/images/avatar.jpg"
import xalisBal from "../assets/images/xalisBal.jpg"
import ItemCard from './ItemCard';

function Description(props) {

    const imgHandler = {
        background: `url(${avatar}) no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
    }

    return (
        <div className="description">
            <div className="descAbout">
                <div className="part1">
                    <p className="textCont"><p className="label">Price:</p> <p className="value">the goods are by weight, the final cost will be calculated in accordance with its weight.</p></p>
                    <p className="textCont"><p className="label">Weight:</p> <p className="value">0.5 kg. (450-550 g.).</p></p>
                    <p className="textCont"><p className="label">The nutritional value:</p> <p className="value">proteins - 19 g, fats - 13.4 g, carbohydrates - 0 g; per 100 g.</p></p>
                    <p className="textCont"><p className="label">Energy value:</p> <p className="value">196 kcal / 820.1 kJ.</p></p>
                    <p className="textCont"><p className="label">Shelf life:</p> <p className="value">5 days.</p></p>
                    <p className="textCont"><p className="label">Storage conditions:</p> <p className="value">at temperatures from -2 to +4 ° С.</p></p>
                    <p className="textCont"><p className="label">Packaging:</p> <p className="value">vacuum packaging.</p></p>
                    <p className="textCont"><p className="label">Place of origin:</p> <p className="value">Krasnodar Territory, Slavyansky District.</p></p>
                </div>
                <div className="part2">
                        <div className="imgCont" style={imgHandler}> </div>

                        <div className="textCont"> 
                            <p className="name">
                                Evgeny Roshal
                            </p>
                            <p className="about">
                                Evgeny Roshal has been farming since 2012. His poultry farm "Kubansky Khutorok" is located in the Krasnodar Territory. Introduce Eugene to us ..
                            </p>
                            
                            <p className="moreDetails">
                                <Button1  value="More details" color="white"/>
                            </p>

                        </div>
                </div>
                
            </div>


            <div className="similarProductsCont">
                    <p className="title"> Similar products </p>
                    <div className="similarProducts">
                        <ItemCard functionClose={props.functionClose} image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={10}/> 
                        <ItemCard  image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>  
                        <ItemCard  image={xalisBal} title="Altai sunflower oil_500 ml." desc="from Maria Fursenko" price={100} weight="50gr" discount={0}/>
                    </div>

            </div>
        </div>
    )
}

export default Description

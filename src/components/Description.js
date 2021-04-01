import React from 'react'
import "../assets/css/description.css"
import Button1 from './Button1';
import avatar from "../assets/images/avatar.jpg"
import xalisBal from "../assets/images/xalisBal.jpg"
import ItemCard from './ItemCard';
import SimilarCard from './SimilarCard';

function Description(props) {

    const imgHandler = {
        backgroundImage: `url(https://nehra.az/storage/app/public/${props?.Product?.seller_data?.avatar})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: "center",
        backgroundSize: "cover",
    }

    return (
        <div className="description">
            <div className="descAbout">
                <div className="part1">
                    <p className="textCont"><p className="label">Qiymət:</p> <p className="value">{props?.Product?.qiymet}</p></p>
                    <p className="textCont"><p className="label">Çəki:</p> <p className="value">{props?.Product?.ceki_hecm}</p></p>
                    <p className="textCont"><p className="label">Tərkibi:</p> <p className="value">{props?.Product?.terkibi}</p></p>
                    <p className="textCont"><p className="label">Enerji dəyəri:</p> <p className="value">{props?.Product?.enerji_deyeri}</p></p>
                    <p className="textCont"><p className="label">Saxlanma müddəti:</p> <p className="value">{props?.Product?.srok}</p></p>
                    <p className="textCont"><p className="label">Saxlanma şəraiti:</p> <p className="value">{props?.Product?.saxlanma_seraiti}</p></p>
                    <p className="textCont"><p className="label">Qablaşdırma növü:</p> <p className="value">{props?.Product?.qablasdirma_data}</p></p>
                    <p className="textCont"><p className="label">İstehsal olunduğu yer:</p> <p className="value">{props?.Product?.hazirlanma_yeri}</p></p>
                </div>
                <div className="part2">
                        <div className="imgCont" style={imgHandler}> </div>

                        <div className="textCont"> 
                            <p className="name">
                                {props?.Product?.seller_data?.name}
                            </p>
                            <p className="about">
                                {props?.Product?.seller_data?.description}
                            </p>
                            
                            <p className="moreDetails">
                                <Button1  value="More details" color="white"/>
                            </p>

                        </div>
                </div>
                
            </div>


            <div className="similarProductsCont">
                    <p className="title"> Oxşar məhsullar </p>
                    <div className="similarProducts">
                        <SimilarCard beforeClose={() => props.functionClose()}/>
                    </div>
            </div>
        </div>
    )
}

export default Description

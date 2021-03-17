import React from 'react'
import "../assets/css/footer.css"
import logoFooter from "../assets/images/logo_footer.png"
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
function Footer() {
    return (
        <footer>
            <div className="footerCont">
                <div> 
                    <h3>Müştərilər üçün</h3>
                    <p>Çatdırılma və ödəniş </p>
                    <p>Rəylər</p>
                    <p>Bonuslar </p>
                    <p>Pulsuz çatdırılma </p>
                    <p>Reseptlər </p>
                    <p>Məhsulların ger qaytarılması </p>
                </div>
                
                <div>
                    <h3>Şirkət Haqqında</h3>
                    <p>Biz kimik</p>
                    <p>Bloq</p>
                    <p>Əlaqə</p>
                </div>
                    
                <div>
                    <h3>Partnyorlar</h3>
                    <p>Fermerlər</p>
                    <p>Kuryerlər haqqında</p>
                </div>
                
                <div>
                <h3>Əlaqə</h3>
                    <p>+7 495  532 05 75 </p>
                    <p>+7 495  532 05 75 </p>
                    <p>Baku, Maiden Tower home 6</p>
                    <p>nehra.az@gmail.com</p>
                    <p className="social"> <FacebookIcon/> <InstagramIcon/> <TwitterIcon/> </p>
                </div>
                <img src={logoFooter} alt="" width="auto" height="120"/>
            </div>

        </footer>
    )
}

export default Footer

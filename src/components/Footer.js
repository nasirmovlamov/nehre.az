import React from 'react'
import "../assets/css/footer.css"
import logoFooter from "../assets/images/logo_footer.png"
function Footer() {
    return (
        <footer>
            <div className="footerCont">
                <div> 
                    <h3>Məhsul Kateqoriyaları</h3>
                    <p>Kateqoriya adı 001 </p>
                    <p>Kateqoriya adı 001 </p>
                    <p>Kateqoriya adı 001 </p>
                    <p>Kateqoriya adı 001 </p>
                    <p>Kateqoriya adı 001 </p>
                </div>
                
                <div>
                    <h3>Şirkət Haqqında</h3>
                    <p>Çatdırılma</p>
                    <p>Keyfiyyət</p>
                    <p>Rəylər</p>
                </div>
                    
                <div>
                    <h3>Partnyorlar</h3>
                    <p>Partnyor adı</p>
                    <p>Partnyor adı</p>
                    <p>Partnyor adı</p>
                </div>
                
                <div>
                <h3>Əlaqə</h3>
                    <p>Partnyor adı</p>
                    <p>Partnyor adı</p>
                    <p>Partnyor adı</p>
                </div>
                <img src={logoFooter} alt="" width="auto" height="120"/>
            </div>

        </footer>
    )
}

export default Footer

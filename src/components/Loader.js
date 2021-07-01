import React from 'react'
import '../assets/css/loaderPage.css'
import logo from '../assets/images/logoNehre2.png'
function Loader({loader}) {
    
    return (
        <React.Fragment>
        {
            loader ? 
            <div className='loaderPage'>
            
                <div className="loaderImgCont">
                    {/* <img src={logo} width='200px' height='auto' alt="" /> */}
                    <div class="snippet" data-title=".dot-flashing">
                        <div class="stage">
                            <div class="dot-flashing"></div>
                        </div>
                    </div>
                </div>
            </div>
            :
            ""
            }
        </React.Fragment>
    )
}

export default Loader

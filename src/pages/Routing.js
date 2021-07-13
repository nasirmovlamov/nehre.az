import React , {useContext, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {ProductListingContext} from '../components/ProductListingProvider'
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import ProductListingPage from '../pages/ProductListingPage';
import Combo from '../pages/Combo';
import Contact from '../pages/Contact';
import ForgetPassword from '../pages/ForgetPassword';
import Who from '../pages/Who';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Quality from '../pages/Quality';
import ReviewPage from '../pages/ReviewPage';
import F04 from '../pages/F04';
import SearchResult from '../components/SearchResult';
import SelectedSupplier from '../components/SelectedSupplier';
import Suppliers from '../components/Suppliers';
import Contacts from '../components/Contacts';
import MemberArea from '../components/MemberArea';
import { ProtectedRoute } from '../pages/Protected';
import Loader from '../components/Loader';
import axios from 'axios';


function Routing() {
    const context = useContext(ProductListingContext)
    const {UserData ,currency, setcurrency, setUserData , ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem,setmoney, setItems, setMinOrder,loader, setloader , UserStatus, setUserStatus ,  setnumber2, setnumber1, number1, number2 , setTopCategory, TopCategory} = context
    const sendGetRequest10 = async () => {
        setloader(true)
        try {
          let resp = ""
          if(JSON.parse(localStorage.getItem('LoginUserData')) !== null)
          { 
            //#region Status setting 
            const respStatus  = await axios.get(`https://nehra.az/public/api/checkstatus?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}`)
              if(respStatus.data === 0)
              {
                setUserStatus(false)
              }
              else 
              {
                setUserStatus(true)
              }
            //#endregion Status setting 
            resp  = await axios.get(`https://nehra.az/public/api/settings?user_id=${JSON.parse(localStorage.getItem('LoginUserData'))?.id}`)
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
            setMinOrder(resp.data.min_order_amount)
            setnumber1(resp.data.phone1) 
            setnumber2(resp.data.phone2)
            setTopCategory(resp.data.featuredcats)
            setmoney(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
            setlang((resp.data.lang === "az" && "AZ") || (resp.data.lang === "en" && "EN") || (resp.data.lang === "ru" && "RU"))
            setSelectedsProduct(JSON.parse(resp.data.selected.text))
            if(resp.data.cart.text !== null)
            {
              const dataparsed = JSON.parse(resp.data.cart.text)
              if(dataparsed !== undefined && dataparsed !== null && dataparsed !== "")
              {
                setProdutData((dataparsed.product      !== null  && dataparsed.product      !== undefined && dataparsed.product      !== "")   ?  dataparsed.product  : [])
                setFinalPrice((dataparsed.FinalPrice   !== null  && dataparsed.FinalPrice   !== undefined && dataparsed.FinalPrice   !== "")   ?  parseFloat(dataparsed.FinalPrice)  : 0)
                setFinalWeight((dataparsed.FinalWeight !== null  && dataparsed.FinalWeight  !== undefined && dataparsed.FinalWeight  !== "")   ?  parseFloat(dataparsed.FinalWeight)  : 0)
                setFinalGoods((dataparsed.FinalGoods   !== null  && dataparsed.FinalGoods   !== undefined && dataparsed.FinalGoods   !== "")   ?  parseInt(dataparsed.FinalGoods)  : 0)
                setFinalBonus((dataparsed.FinalBonus   !== null  && dataparsed.FinalBonus   !== undefined && dataparsed.FinalBonus   !== "")   ?  parseInt(dataparsed.FinalBonus)  : 0)
                setDateGoods((dataparsed.DateGoods     !== null  && dataparsed.DateGoods    !== undefined && dataparsed.DateGoods    !== "")   ?  dataparsed.DateGoods  : [])
                setItems((dataparsed.product      !== null  && dataparsed.product      !== undefined && dataparsed.product      !== "")   ?  dataparsed.product  : [])
              }
            }
            else 
            {
                setProdutData([])
                setFinalPrice(0)
                setFinalWeight(0)
                setFinalGoods(0)
                setFinalBonus(0)
                setDateGoods([])
                setItems([])
            }
          }
          else if (JSON.parse(localStorage.getItem('LoginUserData')) === null)
          {
            setProdutData([])
            setFinalPrice(0 )
            setFinalWeight(0)
            setFinalGoods(0)
            setFinalBonus(0)
            setDateGoods([])
            setItems([])
            resp = await axios.get(`https://nehra.az/public/api/settings`)
            setTopCategory(resp.data.featuredcats)
            setMinOrder(resp.data.min_order_amount)
            setnumber1(resp.data.phone1) 
            setnumber2(resp.data.phone2)
            setSelectedsProduct([])
            setlang((resp.data.lang === "az" && "AZ") || (resp.data.lang === "en" && "EN") || (resp.data.lang === "ru" && "RU"))
            setmoney(sessionStorage.getItem('money') === null ? "₼" : sessionStorage.getItem('money'))
            setUserStatus(false)
          }
          else 
          {}
          
          setloader(false)
        } 
        catch (err) {
          console.error(err);
          setloader(false)
        }
      };
    useEffect(  async  () => {
        await sendGetRequest10()
        const currentDate = new Date()
        console.log(currentDate.getDate() + "." +  (currentDate.getMonth() + 1 < 10 && 0)+ (currentDate.getMonth() + 1) + "." + currentDate.getFullYear())
        const headers= { 
          'Access-Control-Allow-Origin' :'*'
        }
        const currency = await axios.get(`https://www.cbar.az/currencies/${currentDate.getDate() + "." + (currentDate.getMonth() + 1 < 10 && 0) + (currentDate.getMonth() + 1) + "." + currentDate.getFullYear()}.xml` , headers)
        let parser = new DOMParser()
        let xmlDoc = parser.parseFromString(currency.data, 'text/xml')
        setcurrency(parseFloat(xmlDoc.querySelectorAll('ValType')[1].querySelectorAll('Valute')[0].querySelector('Value').textContent))
      }, [])

  return (
      <>
                    {loader ? <Route path="/">   <Loader />   </Route> :
                    <Layout>
                            <Switch>
                                    <Route   exact  path="/">                 <HomePage />                </Route>
                                    <ProtectedRoute   path='/memberarea'  component={ MemberArea}/>
                                    <Route   path="/category/:id">            <ProductListingPage />      </Route>
                                    <Route   path="/about" >                  <About/>                    </Route>
                                    <Route   path="/elaqe" >                  <Contact/>                  </Route>
                                    <Route   path="/forgetpassword/:slug" >  <ForgetPassword/>           </Route>
                                    <Route   path="/who" >                    <Who/>                      </Route>
                                    <Route   path="/privacy-policy" >         <PrivacyPolicy/>            </Route>
                                    <Route   path="/quality" >                <Quality/>                  </Route>
                                    <Route   path="/reviews" >                <ReviewPage/>               </Route>
                                    <Route   path="/search" >                 <SearchResult/>             </Route>
                                    <Route   path="/suppliers/:id" >          <SelectedSupplier/>         </Route>
                                    <Route   path="/suppliers" >              <Suppliers/>                </Route>
                                    <Route   path="/:slug" >           <Combo/>                    </Route>
                                    <Route   path="*">                        <F04  />                    </Route>
                            </Switch> 
                    </Layout>
                    }
     </>
  );
}

export default Routing;

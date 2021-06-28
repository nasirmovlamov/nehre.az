import React , {useContext} from 'react'

import '../assets/css/quality.scss'
import {ProductListingContext} from '../components/ProductListingProvider'

function Quality() {

    const context = useContext(ProductListingContext)
    const {ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct, OpenLoginF,CloseLoginF, setOpenLogin , OpenLogin, handleOpenPM, handleClosePM, modalIdsetter, modalId, FinalBonus, setFinalBonus,selectItem} = context
  
    return (
        <div className="qualityPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`} • {lang === "AZ" && `Keyfiyyət` || lang === "EN" && `Quality` || lang === "RU" && `Качество`}</span>  </p>
                </div>
            </div>

            <div className='bannerWho'> 
                <h1 className="title">Как мы контролируем качество?</h1>
                <hr/>
                <p className="text">Здорово, что вы здесь, в том разделе, где мы рассказываем о качестве. Это значит, что вы бережно относитесь к своему здоровью и вам совершенно точно небезразлично, какая еда попадает на ваш стол.</p>
            </div>

            <div className="imgVideoText">
                <div className="img"></div>
                <p className="text">Начнем с главного. Команда “Ешь Деревенское” выстраивает работу с основными поставщиками по принципу Farm-to-Fork, то есть доставка продуктов от фермеров осуществляется максимально оперативно - без длинных логистических цепочек и посредников.</p>
                <iframe width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>
                <h1 className="title">Кто наши поставщики?</h1>
                <hr/>
                <p className="text">Мы сотрудничаем с малыми и средними фермерскими хозяйствами: семейными производствами, небольшими заводами и местными фермами. Несмотря на небольшой объём поставок, производства наших поставщиков отвечают современным стандартам качества и имеют необходимое оборудование для контроля процессов. Наши фермеры придерживаются методов органического земледелия и не используют пестициды, гербициды, антибиотики, гормоны роста.</p>
            </div>
        </div>
    )
}

export default Quality

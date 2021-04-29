import React , {useContext} from 'react'
import '../assets/css/who.scss'
import {ProductListingContext} from '../components/ProductListingProvider'

function Who() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)

    return (
        <div className="whoPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`} • {lang === "AZ" && `Biz kimik?` || lang === "EN" && `Who us?` || lang === "RU" && `Кто нас?`}</span>  </p>
                        {/* <h2 className="categoryName">Biz kimik?</h2> */}
                </div>
            </div>

            <div className='bannerWho'> 
                <h1 className="title">{lang === "AZ" && `Haqqımızda` || lang === "EN" && `About us` || lang === "RU" && `О нас`}</h1>
                <hr/>
                <p className="text">{lang === "AZ" && `Ailəndən ailəyə məhsulların ən qısa "keyfiyyət, təravət və təbii dad yolu"` || lang === "EN" && `The shortest "path of quality, freshness and natural taste" of products from family to family` || lang === "RU" && `Кратчайший «путь качества, свежести и натурального вкуса» продуктов от семьи к семье`}</p>
            </div>

            <div className="imgVideoText">
                <h1 className="title">{lang === "AZ" && `Biz kimik?` || lang === "EN" && `What is "Nehra"?` || lang === "RU" && `Что такое Nehra»?`}</h1>
                <hr/>
                <p className="text">{lang === "AZ" && `Nehra, evə çatdırılma ilə təsərrüfat məhsullarının onlayn birləşdiricisidir. Saytımızda 200 kiçik istehsalçıdan 1500-dən çox məhsul var.` || lang === "EN" && `Nehra is an online aggregator of farm products with home delivery. On our site there are more than 1500 products from 200 small manufacturers.` || lang === "RU" && `Nehra - онлайн-агрегатор фермерских продуктов с доставкой на дом. На нашем сайте более 1500 продуктов от 200 малых производителей.`}</p>
                <iframe width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>
                <p className="text">{lang === "AZ" && `Məhsulların əksəriyyəti sifariş əsasında hazırlanır. Fermerlər sifarişin müştərilərə göndərilməsindən bir gün əvvəl ərzaq hazırlamağa başlayır. Bu səbəbdən əvvəlcədən sifariş alır və məhsulları mümkün qədər təzə şəkildə çatdırırıq.` || lang === "EN" && `Most of the products are made to order. Farmers start preparing food the day before the order is sent to customers. That is why we take orders in advance and deliver products as fresh as possible.` || lang === "RU" && `Большая часть продуктов изготавливается под заказ. Фермеры начинают готовить продукты за день до отправки заказа клиентам. Именно поэтому мы принимаем заказы заранее и доставляем продукты, максимально свежими.`}</p>
                <div className="img"></div>
                <p className="text">{lang === "AZ" && `Bizim çeşiddə yalnız ən yaxşı məhsulları tapmaq olar. Buna görə dad, rəng və qoxu üçün süni qatqı istifadə etməyən istehsalçıları seçirik. Antibiotiklər və böyümə hormonları heyvanların yeməyinə əlavə edilmir və tərəvəz və meyvələrdə pestisid yoxdur, istehsalçılar azotlu gübrələrdən sui-istifadə etmirlər.` || lang === "EN" && `Only the very best products can be found in our range. Therefore, we select manufacturers who do not use artificial additives for taste, color and smell. Antibiotics and growth hormones are not added to the food of animals, and there are no pesticides in vegetables and fruits, manufacturers do not abuse nitrogenous fertilizers.` || lang === "RU" && `Только самые лучшие продукты могут попасть в наш ассортимент. Поэтому мы отбираем производителей, которые не используют искусственные добавки для вкуса, цвета и запаха. В пищу животным не добавляют антибиотики и гормоны роста, а в овощах и фруктах нет пестицидов, производители не злоупотребляют азотистыми удобрениями.`}</p>
            </div>
        </div>
    )
}

export default Who

import React , {useContext} from 'react'
import '../assets/css/who.scss'
import {ProductListingContext} from '../components/ProductListingProvider'

function Who() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , money, langArr] = useContext(ProductListingContext)

    return (
        <div className="whoPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`} • {lang === "AZ" && `Biz kimik?` || lang === "EN" && `About us` || lang === "RU" && `О нас`}</span>  </p>
                        {/* <h2 className="categoryName">Biz kimik?</h2> */}
                </div>
            </div>

            <div className='bannerWho'> 
                <h1 className="title">{lang === "AZ" && `Haqqımızda` || lang === "EN" && `About us` || lang === "RU" && `О нас`}</h1>
                <hr/>
                <p className="text">{lang === "AZ" && `“Nənələrdən nəvələrə ötürülən dad” şüarı ilə hərəkət edən “nehra.az”ın məqsədi əhaliyə təbii məhsul və sağlam qidanı əlçatan etməkdir. "` || lang === "EN" && `“Nehra.az” company, acting under the motto “Taste passed by grandmothers to grandchildren”, strives to make natural products and healthy food products available to all.` || lang === "RU" && `Компания “Nehra.az”, действующая под девизом “Вкус, переданный бабушками внукам”, стремится сделать натуральную продукцию и продукты здорового питания доступными для всех. `}</p>
            </div>

            <div className="imgVideoText">
                <h1 className="title">{lang === "AZ" && `Biz kimik?` || lang === "EN" && `About us` || lang === "RU" && `О нас`}</h1>
                <hr/>
                <p className="text">{lang === "AZ" && `Biz Azərbaycanda kəndlilərlə birgə inkişaf etmək qərarına gəldik və eyni zamanda əhalininin sağlam qida və təbii məhsul ilə təmin etmək vəzifəsini öz üzərimizə götürdük. Dadını unutmadığınız o ləziz kənd məhsullarını tədarükçüdən birbaşa sizə çatdırırıq. Bir sözlə biz “sağlam qida körpüsü”nü yaradırıq.` || lang === "EN" && `We decided to develop together with farmers in Azerbaijan, thereby undertaking the obligation to provide residents with natural and healthy food. We deliver you agricultural products with an unforgettable taste directly from the manufacturer. In short, "paving the way for healthy nutrition."` || lang === "RU" && `Мы решили развиваться вместе с фермерами в Азербайджане, тем самым взяв на себя обязанность обеспечить жителей натуральными и полезными продуктами питания. Мы доставляем вам сельские продукты с незабываемым вкусом непосредственно от производителя. Словом, “прокладывая путь к полезному питанию”.`}</p>
                <iframe width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>
                <p className="text">{lang === "AZ" && `Kəndlilər, kiçik və orta fermerlərlə əməkdaşlıq edərək müxtəlif say və çeşiddə məhsul təqdim edirik. Təqdim edilən bu məhsullar yalnız sifariş qəbul edildikdən sonra bir neçə gün ərzində hazırlanır və müştəriyə çatdırılır. Məhsulların sifariş edildikdən sonra satışa hazırlanması bu məhsulun yeni olmasına əsas verir. Həmçinin ləziz dadını da özündə saxlayır. ` || lang === "EN" && `Cooperating with small and medium-sized farms, we provide products of various quantities and assortments. The provided products are manufactured within a few days after the order is accepted and dispatched to customers. The production of goods for sale immediately after ordering is a testament to their freshness as well as the preservation of delicious taste.` || lang === "RU" && `Сотрудничая с малыми и средними фермерскими хозяйствами, мы предоставляем продукцию разного количества и ассортимента. Предоставляемые продукты изготавливаются в течение нескольких дней после принятия заказа и отправляются клиентам. Производство товаров для продажи непосредственно после оформления заказа, свидетельствует об их свежести, а также о сохранении восхитительного вкуса.`}</p>
                <div className="img"></div>
                <p className="text">{lang === "AZ" && `Biz kəndlilər, kiçik və orta fermerlərə məhsullarını nehra.az saytında rahatlıqla, heç bir əlavə xərc çəkmədən satmağı təklif edirik. ` || lang === "EN" && `In addition to food producers, nehra.az also cooperates with rural non-food producers and provides their products to consumers. The main goal of such a partnership is to provide support to manual workers.` || lang === "RU" && `Вы производите продукты, мы же, в свою очередь, занимаемся продвижением и доставкой заказанных продуктов клиентам.q`}</p>
            </div>
        </div>
    )
}

export default Who

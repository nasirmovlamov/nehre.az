import React , {useContext} from 'react'
import '../assets/css/who.scss'
import {ProductListingContext} from '../components/ProductListingProvider'

function Who() {
    const [ProdutData, setProdutData, FinalPrice, setFinalPrice, FinalWeight, setFinalWeight,FinalGoods, setFinalGoods, addItem, removeItem, lang , setlang,  money , langArr, DateGoods,setDateGoods , SelectedsProduct, setSelectedsProduct] = useContext(ProductListingContext)

    return (
        <div className="whoPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span> {lang === "AZ" && `Əsas Səhifə` || lang === "EN" && `Homepage` || lang === "RU" && `Домашняя страница`} • {lang === "AZ" && `Biz kimik?` || lang === "EN" && `About us` || lang === "RU" && `О нас`}</span>  </p>
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
                <p className="text">Satıcı barədə məlumatlar:<br/><br/>Vergi ödəyicisinin adı: Nehrə MMC<br/><br/>Dövlət qeydiyyatı № (VÖEN) : <span className='number'>7100566271</span>, <br/><br/>   Vergi ödəyicisinin ünvanı: AZ <span className='number'>5315</span>, Siyəzən Rayonu, Zarat kəndi<br/></p>
                <p className="text">{lang === "AZ" && `Biz Azərbaycanda kəndlilərlə birgə inkişaf etmək qərarına gəldik və eyni zamanda əhalininin sağlam qida və təbii məhsul ilə təmin etmək vəzifəsini öz üzərimizə götürdük. Dadını unutmadığınız o ləziz kənd məhsullarını tədarükçüdən birbaşa sizə çatdırırıq. Bir sözlə biz “sağlam qida körpüsü”nü yaradırıq.` || lang === "EN" && `We decided to develop together with farmers in Azerbaijan, thereby undertaking the obligation to provide residents with natural and healthy food. We deliver you agricultural products with an unforgettable taste directly from the manufacturer. In short, "paving the way for healthy nutrition."` || lang === "RU" && `Мы решили развиваться вместе с фермерами в Азербайджане, тем самым взяв на себя обязанность обеспечить жителей натуральными и полезными продуктами питания. Мы доставляем вам сельские продукты с незабываемым вкусом непосредственно от производителя. Словом, “прокладывая путь к полезному питанию”.`}</p>
                <iframe width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>
                <p className="text">
                {
                lang === "EN" && 
                        <> 
                        

                        Cooperating with small and medium-sized farms, we provide products of various quantities and assortments. The provided products are manufactured within a few days after the order is accepted and dispatched to customers. The production of goods for sale immediately after ordering is a testament to their freshness as well as the preservation of delicious taste.
                        <br/>
                        <br/>
                        We invite small and medium-sized farms to sell their products on nehra.az without extra financial costs. You produce products, and we, in turn, are engaged in the promotion and delivery of ordered products to customers.
                        <br/>
                        <br/>
                        In addition to food producers, nehra.az also cooperates with rural non-food producers and provides their products to consumers. The main goal of such a partnership is to provide support to manual workers.
                        <br/>
                        <br/>
                        For agricultural products that do not have any additives, careful research should be done and an honest manufacturer should be selected. Nehra.az has undertaken this responsibility and, for the convenience of customers, sells products of guaranteed quality. We buy the product you ordered from the farmer and deliver it to you - to the specified address. We cooperate with farmers from all regions of Azerbaijan that sell natural and healthy food products.
                        <br/>
                        <br/>
                        Since we cooperate with small and medium-sized farms, the production and delivery of orders are carried out within 2-5 days. At the same time, in the process of purchasing from suppliers and delivering orders to customers, all storage conditions of products are observed, and the products are immediately sent to the delivery address. 
                        <br/>
                        <br/>
                        The nehra.az website has been prepared in an easy-to-use form. When placing an order, you can choose the date and time of delivery and follow the entire process from ordering products to delivery. 
                        <br/>
                        <br/>
                        Control over the quality of products is carried out by the Food Safety Agency of the Republic of Azerbaijan.
                        </> || 
                lang === "RU" && 
                        <>
                                Сотрудничая с малыми и средними фермерскими хозяйствами, мы предоставляем продукцию разного количества и ассортимента. Предоставляемые продукты изготавливаются в течение нескольких дней после принятия заказа и отправляются клиентам. Производство товаров для продажи непосредственно после оформления заказа, свидетельствует об их свежести, а также о сохранении восхитительного вкуса.
                            <br/>
                            <br/>
                                Мы предлагаем малым и средним фермерским хозяйствам продавать свою продукцию на nehra.az без лишних финансовых затрат.
                            <br/>
                            <br/>
                                Вы производите продукты, мы же, в свою очередь, занимаемся продвижением и доставкой заказанных продуктов клиентам.
                            <br/>
                            <br/>
                                Помимо производителей продуктов питания, nehra.az также сотрудничает с сельскими производителями непродовольственных товаров и предоставляет их товары потребителям. Основная цель такого партнёрства – оказание поддержки лицам, занимающимся ручным трудом.
                            <br/>
                            <br/>
                                Для приобретения сельскохозяйственных продуктов, не имеющих каких – либо добавок, следует проводить тщательное исследование и выбирать честного производителя.
                            <br/>
                            <br/>
                                Nehra.az взяла на себя эту обязанность и для удобства клиентов реализует продажу продукции гарантированного качества. 
                            <br/>
                            <br/>
                                Мы покупаем у фермера, заказанный вами продукт, и доставляем его Вам – в указанный адрес.
                            <br/>
                            <br/>
                                Мы сотрудничаем с фермерами со всех регионов Азербайджана, осуществляем продажу натуральной продукции и продуктов здорового питания. 
                            <br/>
                            <br/>
                                Так как мы сотрудничаем с малыми и средними фермерскими хозяйствами, производство и доставка заказов осуществляется в течение 2-5 дней. При этом, в процессе закупки у поставщиков и доставки заказов клиентам, соблюдаются все условия хранения продукции, и продукция немедленно отправляется по адресу доставки.
                            <br/>
                            <br/>
                                Сайт nehra.az подготовлен в удобной для использования форме. При оформлении заказа вы можете выбрать дату и время доставки и проследить весь процесс от заказа продукции вплоть до доставки.
                        </>}</p>
                <p className="text">{lang === "AZ" && 
                        <>
                        
                            Kəndlilər, kiçik və orta fermerlərlə əməkdaşlıq edərək müxtəlif say və çeşiddə məhsul təqdim edirik. Təqdim edilən bu məhsullar yalnız sifariş qəbul edildikdən sonra bir neçə gün ərzində hazırlanır və müştəriyə çatdırılır. Məhsulların sifariş edildikdən sonra satışa hazırlanması bu məhsulun yeni olmasına əsas verir. Həmçinin ləziz dadını da özündə saxlayır. 
                            <br/><br/> 
                            Siz məhsulu hazırlayacaqsınız, bizsə, o məhsulların tanıdılması, sifariş edilən məhsulun müştəriyə çatdırılması proseslərini həyata keçirəcəyik. 
                            <br/><br/> 
                            Nehra.az qida məhsullarının istehsalçıları ilə yanaşı, həm də qeyri-qida sahəsində çalışan kəndlilərlə əməkdaşlıq edib istehsal etdikləri məhsulları müştərilərə təklif edir. Bu əməkdaşlıq əl əməyi ilə məşğul olan şəxslərə dəstək məqsədi daşıyır. 
                            <br/><br/> 
                            Biz kəndlilər, kiçik və orta fermerlərə məhsullarını nehra.az saytında rahatlıqla, heç bir əlavə xərc çəkmədən satmağı təklif edirik.

                            Kənd təsərrüfatı məhsullarını qatqısız əldə etmək üçün araşdırma etmək və doğru satıcını tapmaq lazımdır. Biz nehra.az olaraq bu vəzifəni öz üzərimizə götürdük və müştərilərin rahatlığı üçün keyfiyyətinə zəmanət verilən məhsulların satışını həyata keçiririk. Sifariş etdiyiniz məhsulu fermerdən alıb, sizə - qeyd etdiyiniz ünvana gətiririk. 
                            <br/>
                            <br/>
                            Azərbaycanın bütün bölgələrində fəaliyyət göstərən kəndlilər və fermerlərlə əməkdaşlıq edir, təbii məhsul və sağlam qidaların satışını həyata keçiririk. Kiçik və orta fermerlərlə əməkdaşlıq etdiyimiz üçün sifarişlərin hazırlanma və çatdırılma müddəti 2-5 gün aralığında dəyişə bilər. Sifarişlərin tədarükçülərdən alınıb müştəriyə çatdırılması prosesində məhsulun saxlanılma şəraitinə tam əməl edilir və məhsul tədarükçüdən alınan kimi dərhal çatdırılma ünvanına göndərilir. 
                            <br/>
                            <br/>
                            Nehra.az saytı müştərilərin rahat istifadəsinə uyğun şəkildə hazırlanıb. Belə ki, məhsulu sifariş edərkən çatdırılma günü və saatını seçə, məhsul sizə çatan ana qədərki bütün prosesi saytdan izləyə bilərsiniz. 
                            <br/>
                            <br/>
                            Məhsulların keyfiyyətinə Azərbaycan Respublikasının Qida Təhlükəsizliyi Agentliyi nəzarət edir! 

                        </> }
                </p>
                <div className="img"></div>
            </div>
        </div>
    )
}

export default Who

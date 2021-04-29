import React from 'react'
import '../assets/css/who.scss'

function Who() {
    return (
        <div className="whoPage"> 
            <div className="topPart">
                <div className="titleProducts">
                        <p className="category"> <span>home • Biz kimik?</span>  </p>
                        {/* <h2 className="categoryName">Biz kimik?</h2> */}
                </div>
            </div>

            <div className='bannerWho'> 
                <h1 className="title">О нас</h1>
                <hr/>
                <p className="text">Кратчайший «путь качества, свежести и натурального вкуса» продуктов от семьи к семье</p>
            </div>

            <div className="imgVideoText">
                <h1 className="title">Что такое «Ешь Деревенское»?</h1>
                <hr/>
                <p className="text">Ешь Деревенское - онлайн-агрегатор фермерских продуктов с доставкой на дом. На нашем сайте более 1500 продуктов от 200 малых производителей.</p>
                <iframe width="520" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>
                <p className="text">Большая часть продуктов изготавливается под заказ. Фермеры начинают готовить продукты за день до отправки заказа клиентам. Именно поэтому мы принимаем заказы заранее и доставляем продукты, максимально свежими.</p>
                <div className="img"></div>
                <p className="text">Только самые лучшие продукты могут попасть в наш ассортимент. Поэтому мы отбираем производителей, которые не используют искусственные добавки для вкуса, цвета и запаха. В пищу животным не добавляют антибиотики и гормоны роста, а в овощах и фруктах нет пестицидов, производители не злоупотребляют азотистыми удобрениями.</p>
            </div>
        </div>
    )
}

export default Who

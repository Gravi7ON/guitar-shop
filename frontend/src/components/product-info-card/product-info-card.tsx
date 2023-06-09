export default function ProductInfoCard(): JSX.Element {
  return (
    <div className="product-container">
      <img className="product-container__img" src="../img/content/catalog-product-1.png" srcSet="../img/content/catalog-product-1@2x.png 2x" width="90" height="235" alt="" />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">СURT Z30 Plus</h2>
        <div className="rate product-container__rating">
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="14" height="14" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: Хорошо</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>15</p>
        </div>
        <div className="tabs">
          <a className="button button--medium tabs__button" href="#characteristics">Характеристики</a>
          <a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
          <div className="tabs__content" id="characteristics">
            <table className="tabs__table">
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">SO754565</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">Электрогитара</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">6 струнная</td>
                </tr>
              </tbody>
            </table>
            <p className="tabs__product-description hidden">Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.</p>
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">52 000 ₽</p>
        <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
      </div>
    </div>
  );
}

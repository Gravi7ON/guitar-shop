export default function AdminProductCard(): JSX.Element {
  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары" />
        <div className="catalog-item__data-wrapper">
          <p className="catalog-item__data-title">ЭлектроГитара Честер bass</p>
          <div className="rate catalog-item__data-rate">
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
            <p className="visually-hidden">Оценка: Хорошо</p>
          </div>
          <p className="catalog-item__data-date">Дата добавления 19.09.2022</p>
          <p className="catalog-item__data-price">17 500 ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons"><a className="button button--small button--black-border" href="edit-item.html" aria-label="Редактировать товар">Редактировать</a>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
      </div>
    </li>
  );
}

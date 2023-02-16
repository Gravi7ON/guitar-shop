export default function OrderCard(): JSX.Element {
  return (
    <li className="order-list__item">
      <div className="order-list__data">
        <img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="60" height="130" alt="Картинка гитары" />
        <div className="order-list__container">
          <p className="order-list__name">ЭлектроГитара Честер bass</p>
          <p className="order-list__lot">Артикул: SO757575</p>
          <p className="order-list__parameters">Электрогитара, 6 струнная</p>
        </div>
      </div><span className="order-list__quantity">1</span><span className="order-list__price">17 500 ₽</span>
      <button className="order-list__button button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span>
      </button>
    </li>
  );
}

export default function OrderInfo(): JSX.Element {
  return (
    <li className="orders__item">
      <h3 className="orders__number">Заказ №00-000-000</h3><span className="orders__items">товаров&nbsp;<b className="orders__items-qty">4</b></span><span className="orders__date">13.09.2022</span><b className="orders__sum">35 000<span className="orders__rouble">₽</span></b>
      <button className="button button--small orders__remove-button" type="button">Удалить</button>
    </li>
  );
}

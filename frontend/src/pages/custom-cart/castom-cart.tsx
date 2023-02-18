import CommonSpace from '../../components/common-space/common-space';
import CustomCartProduct from '../../components/custom-cart-product/custom-cart-product';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function CustomCart(): JSX.Element {
  return (
    <CommonSpace>
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.CustomCart}/>
      <div className="cart">
        <CustomCartProduct />
        <div className="cart__footer">
          <div className="cart__total-info">
            <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span><span className="cart__total-value">52 000 ₽</span></p>
            <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span><span className="cart__total-value cart__total-value--payment">52 000 ₽</span></p>
            <button className="button button--red button--big cart__order-button">Оформить заказ</button>
          </div>
        </div>
      </div>
    </CommonSpace>
  );
}

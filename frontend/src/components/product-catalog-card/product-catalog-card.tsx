import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from 'src/constant';
import { useAppSelector } from 'src/hooks';
import { getAuthorizationStatus } from 'src/store/user-process/selector';
import { Product } from 'src/types/product';

type ProductCatalogCardProps = {
  product: Product;
  onChangeCatalogModalEnter: Dispatch<SetStateAction<boolean>>;
  onChangeCatalogAddCard: Dispatch<SetStateAction<{isShow: boolean, id: number}>>;
};

const MAX_STAR = 5;

const RATING = ['Отсутствует', 'Отвратительно', 'Плохо', 'Удовлетворительно', 'Хорошо', 'Отлично'];

export default function ProductCatalogCard({product, onChangeCatalogModalEnter: changeCatalogModalEnter, onChangeCatalogAddCard: changeCatalogAddCard}: ProductCatalogCardProps): JSX.Element {
  const {id, title, cost, image, amountOfReview, rating} = product;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const buttonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    if (authorizationStatus === AuthorizationStatus.Auth) {
      changeCatalogAddCard((prev) => (
        {
          ...prev,
          isShow: !prev.isShow,
          id: id
        }
      ));
    } else {
      changeCatalogModalEnter((prev) => !prev);
    }
  }

  return (
    <div className="product-card">
      <img src={image} srcSet={`${image} 2x`} width="75" height="190" alt="Liana Z100" />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {
            Array(MAX_STAR)
              .fill('')
              .map((_item, index) => index += 1)
              .map((number) => {
                return (
                  <svg key={number} width="12" height="11" aria-hidden="true">
                    <use xlinkHref={number <= rating ? '#icon-full-star' : '#icon-star'}></use>
                  </svg>
                )
              })
          }
          <p className="visually-hidden">Рейтинг: {RATING[rating]}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{amountOfReview}
          </p>
        </div>
        <p className="product-card__title">{title}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{cost.toLocaleString('ru')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`${AppRoute.ProductInfo}/${id}`}>Подробнее</Link>
        <button onClick={buttonClickHandler}  className="button button--red button--mini button--add-to-cart">Купить</button>
      </div>
    </div>
  );
}

import { Dispatch, SetStateAction } from 'react';
import { useModalClose } from 'src/hooks';
import { Product } from 'src/types/product';

type ModalCardAddProps = {
  onChangeCatalogAddCard: Dispatch<SetStateAction<{isShow: boolean, id: number}>>;
  product: Product | undefined;
}

export default function ModalCardAdd({onChangeCatalogAddCard: changeCatalogAddCard, product}: ModalCardAddProps): JSX.Element | null {
  const buttonClickHandler = () => {
    changeCatalogAddCard((prev) => (
      {
        ...prev,
        isShow: !prev.isShow
      }
    ))
  };

  useModalClose(buttonClickHandler);

  if (product) {
    const {image, title, vendorCode, cost, amountOfString, productType} = product;

    return (
      <div className="modal is-active modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={image} srcSet={`${image} 2x`} width="67" height="137" alt={title} />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {title}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{productType === 'электро' ? 'Электрогитара' : productType.split('')[0].toUpperCase() + productType.slice(1)}, {amountOfString} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{cost.toLocaleString('ru')} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button className="button button--red button--big modal__button modal__button--add">Добавить в корзину</button>
            </div>
            <button onClick={buttonClickHandler} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null
}

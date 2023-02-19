import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchProductsAction } from 'src/store/api-actions';
import { changeAcoustic, changeElectric, changeFour, changeFrom, changeSeven, changeSix, changeTo, changeTwelve, changeUkulele, setInitial } from 'src/store/control-element/control-element';
import { getControlElement } from 'src/store/control-element/selector';
import { getProducts } from 'src/store/product-data/selector';
import { filterPoducts, generateQueryString } from 'src/utils/helpers';

type FilterGoodsProps = {
  isCatalog?: boolean;
}

enum ElementOfControl {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
  Four = 'four',
  Six = 'six',
  Seven = 'seven',
  Twelve = 'twelve'
}

const adapter: {[key: string]: string | number} = {
  acoustic: 'аккустика',
  electric: 'электро',
  ukulele: 'укулеле',
  four: 4,
  six: 6,
  seven: 7,
  twelve: 12,
  from: 'from',
  to: 'to'
}

export default function FilterGoods({isCatalog}: FilterGoodsProps): JSX.Element {
  const products = useAppSelector(getProducts);
  const controlElement = useAppSelector(getControlElement);
  const dispatch = useAppDispatch();

  const ascSortProducts = [...products].sort((a, b) => a.cost - b.cost);
  const minPrice = ascSortProducts[0]?.cost ?? 0;
  const maxPrice = ascSortProducts.at(-1)?.cost ?? 0;

  const inputChangeRangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    if (name === adapter.from) {
      dispatch(changeFrom(value));
      filterPoducts();
      return;
    }

    dispatch(changeTo(value));
    filterPoducts();
  };

  const inputChangeProductTypeHandler = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name} = evt.target;
    switch (name) {
      case ElementOfControl.Acoustic:
        dispatch(changeAcoustic());
        await dispatch(fetchProductsAction(generateQueryString()));
        filterPoducts();
        break;
      case ElementOfControl.Ukulele:
        dispatch(changeUkulele());
        await dispatch(fetchProductsAction(generateQueryString()));
        filterPoducts();
        break;
      case ElementOfControl.Electric:
        dispatch(changeElectric());
        await dispatch(fetchProductsAction(generateQueryString()));
        filterPoducts();
    }
  };

  const inputChangeAmountStringHandler = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name} = evt.target;
    switch (name || Boolean) {
      case ElementOfControl.Four:
        if (controlElement.ukulele) {
          await dispatch(fetchProductsAction(generateQueryString()));
          filterPoducts();
          return;
        }
        dispatch(changeFour());
        await dispatch(fetchProductsAction(generateQueryString()));
        filterPoducts();
        break;
      case ElementOfControl.Six:
        dispatch(changeSix());
        await dispatch(fetchProductsAction(generateQueryString()));
        filterPoducts();
        break;
      case ElementOfControl.Seven:
        dispatch(changeSeven());
        await dispatch(fetchProductsAction(generateQueryString()));
        filterPoducts();
        break;
      case ElementOfControl.Twelve:
        dispatch(changeTwelve());
        await dispatch(fetchProductsAction(generateQueryString()));
        filterPoducts();
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      {
        isCatalog &&
        <fieldset className="catalog-filter__block">
          <legend className="catalog-filter__block-title">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="form-input">
              <label className="visually-hidden">Минимальная цена</label>
              <input onChange={inputChangeRangeHandler} type="number" placeholder={minPrice.toString()} id="priceMin" name="from" value={controlElement.from}/>
            </div>
            <div className="form-input">
              <label className="visually-hidden">Максимальная цена</label>
              <input onChange={inputChangeRangeHandler} type="number" placeholder={maxPrice.toString()} id="priceMax" name="to" value={controlElement.to}/>
            </div>
          </div>
        </fieldset>
      }
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeProductTypeHandler} className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" checked={controlElement.acoustic} disabled={!products.some((product) => product.productType === adapter.acoustic)}/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeProductTypeHandler} className="visually-hidden" type="checkbox" id="electric" name="electric" checked={controlElement.electric} disabled={!products.some((product) => product.productType === adapter.electric)}/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeProductTypeHandler} className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={controlElement.ukulele} disabled={!products.some((product) => product.productType === adapter.ukulele)}/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="4-strings" name="four" checked={controlElement.four || controlElement.ukulele} disabled={!products.some((product) => product.amountOfString === adapter.four)}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="6-strings" name="six" checked={controlElement.six} disabled={!products.some((product) => product.amountOfString === adapter.six)}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="7-strings" name="seven" checked={controlElement.seven} disabled={!products.some((product) => product.amountOfString === adapter.seven)}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="12-strings" name="twelve" checked={controlElement.twelve} disabled={!products.some((product) => product.amountOfString === adapter.twelve)}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button onClick={
        () => {
          dispatch(setInitial());
          dispatch(fetchProductsAction(generateQueryString()));
        }
      } className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

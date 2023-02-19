import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchProductsAction } from 'src/store/api-actions';
import { getInitialProducts, getProducts } from 'src/store/product-data/selector';

type FilterGoodsProps = {
  isCatalog?: boolean;
}

const adapter: {[key: string]: string | number} = {
  acoustic: 'аккустика',
  electric: 'электро',
  ukulele: 'укулеле',
  four: 4,
  six: 6,
  seven: 7,
  twelve: 12
}

export default function FilterGoods({isCatalog}: FilterGoodsProps): JSX.Element {
  const products = useAppSelector(getProducts);
  const initialProducts = useAppSelector(getInitialProducts);
  const dispatch = useAppDispatch();

  const [rangeCost, setRangeCost] = useState({
    from: '',
    to: ''
  });

  const [productType, setProductType] = useState<{
    [key: string]: boolean
  }>({
    acoustic: false,
    electric: false,
    ukulele: false
  });

  const [amoutString, setAmountString] = useState<{
    [key: string]: boolean
  }>({
    four: false,
    six: false,
    seven: false,
    twelve: false
  });

  // useEffect(() => {
  //   if (Object.values(productType).includes(true)) {
  //     let filteredProducts: Product[] = [];
  //     for (const [key, value] of Object.entries(productType)) {
  //       if (value) {
  //         filteredProducts = filteredProducts.concat([...initialProducts].filter((product) => product.productType === adapter[key]));
  //       }
  //     }
  //     console.log(filteredProducts);

  //     dispatch(sortProduct(filteredProducts));
  //   }

  //   if (Object.values(productType).every((value) => value === false)) {
  //     dispatch(sortProduct(initialProducts));
  //   }
  // }, [initialProducts, productType])

  const ascSortProducts = [...products].sort((a, b) => a.cost - b.cost);
  const minPrice = ascSortProducts[0].cost ?? 0;
  const maxPrice = ascSortProducts.at(-1)?.cost ?? 0;

  const inputChangeRangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setRangeCost((prev) => ({...prev, [name]: value}));
  };

  const inputChangeProductTypeHandler = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name} = evt.target;
    setProductType((prev) => ({...prev, [name]: !prev[name]}));
    dispatch(fetchProductsAction(`?limit=10000&sortField=cost&sortDirection=asc&productType=${encodeURIComponent(adapter[name])}`))
  };

  const inputChangeAmountStringHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {name} = evt.target;
    setAmountString((prev) => ({...prev, [name]: !prev[name]}));
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
              <input onChange={inputChangeRangeHandler} type="number" placeholder={minPrice.toString()} id="priceMin" name="from" value={rangeCost.from}/>
            </div>
            <div className="form-input">
              <label className="visually-hidden">Максимальная цена</label>
              <input onChange={inputChangeRangeHandler} type="number" placeholder={maxPrice.toString()} id="priceMax" name="to" value={rangeCost.to}/>
            </div>
          </div>
        </fieldset>
      }
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeProductTypeHandler} className="visually-hidden" type="checkbox" id="acoustic" name="acoustic" checked={productType.acoustic} disabled={!initialProducts.some((product) => product.productType === adapter.acoustic)}/>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeProductTypeHandler} className="visually-hidden" type="checkbox" id="electric" name="electric" checked={productType.electric} disabled={!initialProducts.some((product) => product.productType === adapter.electric)}/>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeProductTypeHandler} className="visually-hidden" type="checkbox" id="ukulele" name="ukulele" checked={productType.ukulele} disabled={!initialProducts.some((product) => product.productType === adapter.ukulele)}/>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="4-strings" name="four" checked={amoutString.four} disabled={!initialProducts.some((product) => product.amountOfString === adapter.four)}/>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="6-strings" name="six" checked={amoutString.six} disabled={!initialProducts.some((product) => product.amountOfString === adapter.six)}/>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="7-strings" name="seven" checked={amoutString.seven} disabled={!initialProducts.some((product) => product.amountOfString === adapter.seven)}/>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input onChange={inputChangeAmountStringHandler} className="visually-hidden" type="checkbox" id="12-strings" name="twelve" checked={amoutString.twelve} disabled={!initialProducts.some((product) => product.amountOfString === adapter.twelve)}/>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button onClick={() => {
        setRangeCost(() => ({
          from: '',
          to: ''
        }));
        setProductType(() => ({
          acoustic: false,
          electric: false,
          ukulele: false
        }));
        setAmountString(() => ({
          four: false,
          six: false,
          seven: false,
          twelve: false
        }))
      }} className="catalog-filter__reset-btn button button--black-border button--medium" type="reset">Очистить</button>
    </form>
  );
}

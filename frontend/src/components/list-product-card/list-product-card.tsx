import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from 'src/hooks';
import { getProducts } from 'src/store/product-data/selector';
import ProductCatalogCard from '../product-catalog-card/product-catalog-card';

type ListProductCardProps = {
  onChangeCatalogModalEnter: Dispatch<SetStateAction<boolean>>;
  onChangeCatalogAddCard: Dispatch<SetStateAction<{isShow: boolean, id: number}>>;
}
export default function ListProductCard({onChangeCatalogModalEnter: changeCatalogModalEnter, onChangeCatalogAddCard: changeCatalogAddCard}: ListProductCardProps): JSX.Element {
  const products = useAppSelector(getProducts);

  return (
    <div className="cards catalog__cards">
      {
        products.map((product) => (
          <ProductCatalogCard
            key={product.id}
            product={product}
            onChangeCatalogModalEnter={changeCatalogModalEnter}
            onChangeCatalogAddCard={changeCatalogAddCard}
          />
        ))
      }
    </div>
  );
}

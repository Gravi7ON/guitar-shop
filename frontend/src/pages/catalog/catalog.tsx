import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import ModalCardAdd from 'src/components/modal-card-add/modal-card-add';
import ModalCardEnter from 'src/components/modal-card-enter/modal-card-enter';
import { useAppSelector } from 'src/hooks';
import { getProducts } from 'src/store/product-data/selector';
import CatalogProduct from '../../components/catalog-product/catalog-product';
import CommonSpace from '../../components/common-space/common-space';
import FilterGoods from '../../components/filter-goods/filter-goods';
import ListProductCard from '../../components/list-product-card/list-product-card';
import Pagination from '../../components/pagination/pagination';
import SortBar, { PageTitleForSort } from '../../components/sort-bar/sort-bar';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function Catalog(): JSX.Element {
  const [isModalEnter, setIsModalEnter] = useState(false);
  const [isAddCart, setIsAddCart] = useState({
    isShow: false,
    id: 0
  });

  const products = useAppSelector(getProducts);
  return (
    <CommonSpace>
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.Catalog}/>
      <CatalogProduct>
        <FilterGoods isCatalog/>
        {
          products.length === 0 ?
          <div style={{marginLeft: '50px'}}><h2><b>No content</b></h2></div> :
          <>
            <SortBar pageTitle={PageTitleForSort.Catalog} />
            <ListProductCard
                onChangeCatalogModalEnter={setIsModalEnter}
                onChangeCatalogAddCard={setIsAddCart}
            />
            <Pagination />
          </>
        }
      </CatalogProduct>
      {
        isModalEnter &&
        <Dialog open={isModalEnter} onClose={() => isModalEnter}>
          <ModalCardEnter onChangeCatalogModalEnter={setIsModalEnter}/>
        </Dialog>
      }
      {
        isAddCart.isShow &&
        <Dialog open={isAddCart.isShow} onClose={() => isAddCart.isShow}>
          <ModalCardAdd product={products.find((product) => product.id === isAddCart.id)} onChangeCatalogAddCard={setIsAddCart}/>
        </Dialog>
      }
    </CommonSpace>
  );
}

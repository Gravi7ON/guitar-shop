import CatalogProduct from '../../components/catalog-product/catalog-product';
import CommonSpace from '../../components/common-space/common-space';
import FilterGoods from '../../components/filter-goods/filter-goods';
import ListProductCard from '../../components/list-product-card/list-product-card';
import Pagination from '../../components/pagination/pagination';
import ProductCatalogCard from '../../components/product-catalog-card/product-catalog-card';
import SortBar, { PageTitleForSort } from '../../components/sort-bar/sort-bar';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

type CatalogProps = {
  userStatus?: string ;
}

export default function Catalog({userStatus}: CatalogProps): JSX.Element {
  return (
    <CommonSpace userStatus={userStatus}>
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.Catalog}/>
      <CatalogProduct>
        <FilterGoods isCatalog/>
        <SortBar pageTitle={PageTitleForSort.Catalog}/>
        <ListProductCard>
          <ProductCatalogCard />
        </ListProductCard>
        <Pagination />
      </CatalogProduct>
    </CommonSpace>
  );
}

import AdminListProductCard from '../../components/admin-list-product-card/admin-list-product-card';
import AdminProductCard from '../../components/admin-product-card/admin-product-card';
import CatalogProduct from '../../components/catalog-product/catalog-product';
import CommonSpace, { PageTitleForCommonSpace } from '../../components/common-space/common-space';
import FilterGoods from '../../components/filter-goods/filter-goods';
import { UserStatus } from '../../components/header/header';
import Pagination, { PageTitleForPagination } from '../../components/pagination/pagination';
import SortBar, { PageTitleForSort } from '../../components/sort-bar/sort-bar';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function ProductList(): JSX.Element {
  return (
    <CommonSpace
      pageTitle={PageTitleForCommonSpace.ProductsList}
      userStatus={UserStatus.Admin}
    >
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.ProductsList}/>
      <CatalogProduct>
        <FilterGoods />
        <SortBar pageTitle={PageTitleForSort.ProductsList}/>
        <AdminListProductCard>
          <AdminProductCard />
        </AdminListProductCard>
      </CatalogProduct>
      <button className="button product-list__button button--red button--big">Добавить новый товар</button>
      <Pagination pageTitle={PageTitleForPagination.ProductsList}/>
    </CommonSpace>
  );
}

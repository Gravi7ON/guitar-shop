import CommonSpace, { PageTitleForCommonSpace } from '../../components/common-space/common-space';
import OrderInfo from '../../components/order-info/order-info';
import Pagination, { PageTitleForPagination } from '../../components/pagination/pagination';
import SortBar, { PageTitleForSort } from '../../components/sort-bar/sort-bar';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function OrderList(): JSX.Element {
  return (
    <CommonSpace
      pageTitle={PageTitleForCommonSpace.OrdersList}
    >
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.OrdersList} />
      <SortBar pageTitle={PageTitleForSort.OrdersList}/>
      <ul className="orders__list">
        <OrderInfo />
      </ul>
      <Pagination pageTitle={PageTitleForPagination.OrdersList}/>
    </CommonSpace>
  );
}

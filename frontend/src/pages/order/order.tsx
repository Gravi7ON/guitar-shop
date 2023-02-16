import CommonSpace, { PageTitleForCommonSpace } from '../../components/common-space/common-space';
import { UserStatus } from '../../components/header/header';
import OrderCard from '../../components/order-card/order-card';
import OrderTable from '../../components/order-table/order-table';
import TitleAndBreadcrumbs, { PageTitleForBreadcrumbs } from '../../components/title-breadcrumbs/title-breadcrumbs';

export default function Order(): JSX.Element {
  return (
    <CommonSpace
      pageTitle={PageTitleForCommonSpace.Order}
      userStatus={UserStatus.Admin}
    >
      <TitleAndBreadcrumbs pageTitle={PageTitleForBreadcrumbs.Order}/>
      <OrderTable />
      <ul className="order__list order-list">
        <OrderCard />
      </ul>
      <button className="button order__button button--small button--black-border">Вернуться к списку заказов</button>
    </CommonSpace>
  );
}

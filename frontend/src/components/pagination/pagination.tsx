type PaginationProps = {
  pageTitle?: PageTitleForPagination;
}

export enum PageTitleForPagination {
  OrdersList = 'OrdersList',
  ProductsList = 'ProductsList'
}

const getClassListDependsPage = (pageTitle?: string) => {
  switch (pageTitle) {
    case PageTitleForPagination.OrdersList:
      return 'pagination orders__pagination';
    case PageTitleForPagination.ProductsList:
      return 'pagination product-list__pagination';
    default:
      return 'pagination page-content__pagination';
  }
};

export default function Pagination({pageTitle}: PaginationProps): JSX.Element {
  return (
    <div className={getClassListDependsPage(pageTitle)}>
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--active">
          <a className="link pagination__page-link" href="1">1</a>
        </li>
        <li className="pagination__page">
          <a className="link pagination__page-link" href="2">2</a>
        </li>
        <li className="pagination__page">
          <a className="link pagination__page-link" href="3">3</a>
        </li>
        <li className="pagination__page pagination__page--next" id="next">
          <a className="link pagination__page-link" href="2">Далее</a>
        </li>
      </ul>
    </div>
  );
}

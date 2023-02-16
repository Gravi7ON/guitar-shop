import { PageTitleForBreadcrumbs } from './title-breadcrumbs';

export const getClasslistDependsPage = (pageTitle?: string) => {
  switch (pageTitle) {
    case PageTitleForBreadcrumbs.OrdersList:
      return {
        header: 'title title--bigger orders__title',
        unorderedList: 'breadcrumbs orders__breadcrumps'
      };
    case PageTitleForBreadcrumbs.ProductsList:
      return {
        header: 'product-list__title',
        unorderedList: 'breadcrumbs'
      };
    case PageTitleForBreadcrumbs.AddNewProduct:
      return {
        header: 'add-item__title',
        unorderedList: 'breadcrumbs'
      };
    case PageTitleForBreadcrumbs.EditProduct:
      return {
        header: 'edit-item__title',
        unorderedList: 'breadcrumbs'
      };
    case PageTitleForBreadcrumbs.Order:
      return {
        header: 'order__title',
        unorderedList: 'breadcrumbs'
      };
    default:
      return {
        header: 'page-content__title title title--bigger',
        unorderedList: 'breadcrumbs page-content__breadcrumbs'
      };
  }
};

import { Link } from 'react-router-dom';
import { Page } from './breadcrumbs.constant';
import { getClasslistDependsPage } from './helper';

type TitleAndBreadcrumbsProps = {
  pageTitle: PageTitleForBreadcrumbs;
}

export enum PageTitleForBreadcrumbs {
  Catalog = 'Catalog',
  OrdersList = 'OrdersList',
  ProductsList = 'ProductsList',
  CustomCart = 'CustomCart',
  Product = 'Product',
  AddNewProduct = 'AddNewProduct',
  EditProduct = 'EditProduct',
  Order = 'Order'
}

export default function TitleAndBreadcrumbs({pageTitle}: TitleAndBreadcrumbsProps): JSX.Element {
  const {header, unorderedList} = getClasslistDependsPage(pageTitle);

  return (
    <>
      <h1 className={header}>{Page[pageTitle].titleBig}</h1>
      <ul className={unorderedList}>
        {
          Page[pageTitle].breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.title} className="breadcrumbs__item">
              <Link className="link" to={breadcrumb.link}>{breadcrumb.title}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}

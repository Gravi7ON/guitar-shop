import { PropsWithChildren, ReactNode } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';

type CommonSpaceProps = PropsWithChildren<{
  pageTitle?: PageTitleForCommonSpace | undefined;
  userStatus?: string | undefined;
}>

export enum PageTitleForCommonSpace {
  OrdersList = 'OrdersList',
  ProductsList = 'ProductsList',
  AddNewProduct = 'AddNewProduct',
  EditProduct = 'EditProduct',
  Order = 'Order'
}

const getSpaceDependsPage = (children: ReactNode | undefined, pageTitle?: string | undefined) => {
  switch (pageTitle) {
    case PageTitleForCommonSpace.ProductsList:
      return (
        <main className="page-content">
          <section className="product-list">
            <div className="container">
              {children}
            </div>
          </section>
        </main>
      );
    case PageTitleForCommonSpace.OrdersList:
      return (
        <main className="page-content orders__main">
          <section className="orders">
            <div className="container">
              {children}
            </div>
          </section>
        </main>
      );
    case PageTitleForCommonSpace.AddNewProduct:
      return (
        <main className="page-content">
          <section className="add-item">
            <div className="container">
              {children}
            </div>
          </section>
        </main>
      );
    case PageTitleForCommonSpace.EditProduct:
      return (
        <main className="page-content">
          <section className="edit-item">
            <div className="container">
              {children}
            </div>
          </section>
        </main>
      );
    case PageTitleForCommonSpace.Order:
      return (
        <main className="page-content">
          <section className="order">
            <div className="container">
              {children}
            </div>
          </section>
        </main>
      );
    default:
      return (
        <main className="page-content">
          <div className="container">
            {children}
          </div>
        </main>
      );
  }
};

export default function CommonSpace({children, pageTitle, userStatus}: CommonSpaceProps): JSX.Element {
  return (
    <>
      <Header userStatus={userStatus}/>
      {
        getSpaceDependsPage(children, pageTitle)
      }
      <Footer />
    </>
  );
}

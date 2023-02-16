import { AppRoute } from '../../constant';

export const Page = {
  Catalog: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      }
    ],
    titleBig: 'Каталог гитар'
  },
  OrdersList: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      },
      {
        title: 'Заказы',
        link: AppRoute.OrderList
      }
    ],
    titleBig: 'Список заказов'
  },
  ProductsList: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      },
      {
        title: 'Товары',
        link: AppRoute.ProductList
      }
    ],
    titleBig: 'Список товаров'
  },
  CustomCart: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      },
      {
        title: 'Корзина',
        link: AppRoute.CustomCart
      }
    ],
    titleBig: 'Корзина'
  },
  Product: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      },
      {
        title: 'Товар',
        link: AppRoute.ProductInfo
      }
    ],
    titleBig: 'Товар'
  },
  AddNewProduct: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      },
      {
        title: 'Товары',
        link: AppRoute.ProductList
      },
      {
        title: 'Новый товар',
        link: AppRoute.AddProduct
      }
    ],
    titleBig: 'Новый товар'
  },
  EditProduct: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      },
      {
        title: 'Товары',
        link: AppRoute.ProductList
      },
      {
        title: 'productTitle',
        link: AppRoute.ProductInfo
      }
    ],
    titleBig: 'productTitle'
  },
  Order: {
    breadcrumbs: [
      {
        title: 'Каталог',
        link: AppRoute.Catalog
      },
      {
        title: 'Товары',
        link: AppRoute.ProductList
      },
      {
        title: 'orderId',
        link: AppRoute.Order
      }
    ],
    titleBig: 'orderId'
  }
} as const;

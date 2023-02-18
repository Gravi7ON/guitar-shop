export enum AppRoute {
  Catalog = '/',
  SignIn = '/login',
  SignUp = '/register',
  ProductList = '/products',
  ProductInfo = '/product',
  OrderList = '/orders',
  Order = '/order/:id',
  NotFound = '/not-found',
  CustomCart = '/cart',
  AddProduct = 'add-product',
  EditProduct = 'edit-product'
}
export enum UserRole {
  User = 'User',
  Admin = 'Admin'
}

export enum AuthorizationStatus {
  Auth = 'Auth',
  NoAuth = 'No auth',
  Unknown = 'Unknown'
}

export enum NameSpaceStore {
  Product = 'PRODUCT',
  User = 'USER',
}

export enum APIRoute {
  SignUp = '/register',
  SignIn = '/login',
  CheckAuth = '/check-authorization',
  Products = '/product'
}

export enum ProductQuery {
  Default = '?limit=10000&sortField=cost&sortDirection=asc'
}

export enum AppRoute {
  Catalog = '/',
  SignIn = '/login',
  SignUp = '/register',
  ProductList = '/products',
  ProductInfo = '/product/:id',
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


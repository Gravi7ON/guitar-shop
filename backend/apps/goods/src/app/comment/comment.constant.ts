export enum CommentQueryDefault {
  CountLimit = 50,
  SortDirection = 'desc'
}

export enum CommentMessageException {
  CommentNotFound = `Comments to this productId aren't exist yet`,
  ProductNotFound = 'Product with this id not found'
}
export const PRODUCT_URL = 'http://localhost:3335/api/product/';

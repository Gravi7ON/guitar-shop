export enum ProductMessageException {
  BadFormat = `The possible format of a image is 'png' or 'jpg | jpeg'`,
  NotFound = 'Product not found'
}

export enum ClientQueryProduct {
  DefaultLimit = 9,
  DefaultSortDirection = 'desc',
  DefaultSortField = 'createdAt'
}

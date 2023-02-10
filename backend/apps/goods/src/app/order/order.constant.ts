export enum OrderMessageException {
  NotFound = 'Order not found',
  NoOne = 'No one of order not found'
}

export enum OrderQueryDefault {
  CountLimit = 6,
  SortDirection = 'desc',
  DefaultSortField = 'createdAt'
}

export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');

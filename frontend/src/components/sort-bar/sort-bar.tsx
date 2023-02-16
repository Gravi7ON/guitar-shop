type SortBarProps = {
  pageTitle: PageTitleForSort;
}

export enum PageTitleForSort {
  Catalog = 'Catalog',
  OrdersList = 'OrdersList',
  ProductsList = 'ProductsList'
}

const SortTab = {
  Catalog: ['по цене', 'по популярности'],
  OrdersList: ['по дате', 'по цене'],
  ProductsList: ['по дате', 'по цене', 'по популярности']
} as const;

export default function SortBar({pageTitle}: SortBarProps): JSX.Element {
  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {
          SortTab[pageTitle].map((tab, index) => {
            if (!index) {
              return <button key={tab} className="catalog-sort__type-button catalog-sort__type-button--active" aria-label={tab}>{tab}</button>;
            }
            return <button key={tab} className="catalog-sort__type-button" aria-label={tab}>{tab}</button>;
          })
        }
      </div>
      <div className="catalog-sort__order">
        <button className="catalog-sort__order-button catalog-sort__order-button--up catalog-sort__order-button--active" aria-label="По возрастанию"></button>
        <button className="catalog-sort__order-button catalog-sort__order-button--down" aria-label="По убыванию"></button>
      </div>
    </div>
  );
}

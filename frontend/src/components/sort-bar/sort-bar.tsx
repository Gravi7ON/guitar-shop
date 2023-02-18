import { useState } from 'react';
import { useAppDispatch } from 'src/hooks';
import { fetchProductsAction } from 'src/store/api-actions';

type SortBarProps = {
  pageTitle: PageTitleForSort;
}

export enum PageTitleForSort {
  Catalog = 'Catalog',
  OrdersList = 'OrdersList',
  ProductsList = 'ProductsList'
}

enum SortButton {
  Asc = 'asc',
  Desc = 'desc',
  Cost = 'cost',
  Date = 'date',
  Rating = 'rating'
}

const SortTab = {
  Catalog: ['по цене', 'по популярности'],
  OrdersList: ['по дате', 'по цене'],
  ProductsList: ['по дате', 'по цене', 'по популярности']
} as const;

const activeTabQueryAsc: {[key: string]: string} = {
  cost: '?limit=10000&sortField=cost&sortDirection=asc',
  rating: '?limit=10000&sortField=rating&sortDirection=asc'
};

const activeTabQueryDesc: {[key: string]: string} = {
  cost: '?limit=10000&sortField=cost&sortDirection=desc',
  rating: '?limit=10000&sortField=rating&sortDirection=desc'
}

export default function SortBar({pageTitle}: SortBarProps): JSX.Element {
  const [isSortTabActive, setIsSortTabActive] = useState<{
    [key: string]: boolean
  }>({
    cost: true,
    rating: false,
    date: false
  });

  const [isSortDirectionActive, setIsSortDirectionActive] = useState<{
    [key: string]: boolean
  }>({
    asc: true,
    desc: false
  });

  const dispatch = useAppDispatch();

  const getSortTabClassActive = (tab: string) => {
    if (tab === SortTab.ProductsList[0]) {
      return isSortTabActive.date ? 'catalog-sort__type-button--active' : '';
    }

    if (tab === SortTab.ProductsList[1]) {
      return isSortTabActive.cost ? 'catalog-sort__type-button--active' : '';
    }

    if (tab === SortTab.ProductsList[2]) {
      return isSortTabActive.rating ? 'catalog-sort__type-button--active' : '';
    }
  };

  const getSortDirectionClassActive = (buttonTitle: string) => {
    if (buttonTitle === SortButton.Asc) {
      return isSortDirectionActive.asc ? 'catalog-sort__order-button--active' : '';
    }

    if (buttonTitle === SortButton.Desc) {
      return isSortDirectionActive.desc ? 'catalog-sort__order-button--active' : '';
    }
  };

  const setOnlyOneTrue = (
    cbState: (
      cb: (prev: {[key: string]: boolean}) => typeof prev
    ) => void, prevKey: string
  ) => {
    cbState((previos) => {
      const prev = {...previos};
      for (const button of Object.keys(prev)) {
        prev[button] = false;
      }
      prev[prevKey] = true;
      return prev;
    });
  }

  const getButtonSortHandler = (buttonTitle: string) => {
    switch (buttonTitle) {
      case SortTab.ProductsList[0]:
        return () => {
          setOnlyOneTrue(setIsSortTabActive, SortButton.Date);
        };
      case SortTab.ProductsList[1]:
        return () => {
          setOnlyOneTrue(setIsSortTabActive, SortButton.Cost);
          for (const [key, value] of Object.entries(isSortDirectionActive)) {
            if (value) {
              if (key === SortButton.Asc) {
                dispatch(fetchProductsAction(activeTabQueryAsc.cost));
                return;
              }
              dispatch(fetchProductsAction(activeTabQueryDesc.cost));
            }
          }
        };
      case SortTab.ProductsList[2]:
        return () => {
          setOnlyOneTrue(setIsSortTabActive, SortButton.Rating);
          for (const [key, value] of Object.entries(isSortDirectionActive)) {
            if (value) {
              if (key === SortButton.Asc) {
                dispatch(fetchProductsAction(activeTabQueryAsc.rating));
                return;
              }
              dispatch(fetchProductsAction(activeTabQueryDesc.rating));
            }
          }
        };
      case SortButton.Asc:
        return () => {
          setOnlyOneTrue(setIsSortDirectionActive, SortButton.Asc);
          for (const [key, value] of Object.entries(isSortTabActive)) {
            if (value) {
              dispatch(fetchProductsAction(activeTabQueryAsc[key]));
            }
          }
        };
      case SortButton.Desc:
        return () => {
          setOnlyOneTrue(setIsSortDirectionActive, SortButton.Desc);
          for (const [key, value] of Object.entries(isSortTabActive)) {
            if (value) {
              dispatch(fetchProductsAction(activeTabQueryDesc[key]));
            }
          }
        };
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        {
          SortTab[pageTitle].map((tab) => {
            return <button onClick={getButtonSortHandler(tab)} key={tab} className={`catalog-sort__type-button ${getSortTabClassActive(tab)}`} aria-label={tab}>{tab}</button>;
          })
        }
      </div>
      <div className="catalog-sort__order">
        <button onClick={getButtonSortHandler(SortButton.Asc)} className={`catalog-sort__order-button catalog-sort__order-button--up ${getSortDirectionClassActive(SortButton.Asc)}`} aria-label="По возрастанию"></button>
        <button onClick={getButtonSortHandler(SortButton.Desc)} className={`catalog-sort__order-button catalog-sort__order-button--down ${getSortDirectionClassActive(SortButton.Desc)}`} aria-label="По убыванию"></button>
      </div>
    </div>
  );
}

import { useAppDispatch, useAppSelector } from 'src/hooks';
import { fetchProductsAction } from 'src/store/api-actions';
import { changeAsc, changeCost, changeDate, changeDesc, changeRating } from 'src/store/control-element/control-element';
import { getControlElement } from 'src/store/control-element/selector';
import { filterPoducts, generateQueryString } from 'src/utils/helpers';

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
  Rating = 'rating',
  Date = 'date'
}

const SortTab = {
  Catalog: ['по цене', 'по популярности'],
  OrdersList: ['по дате', 'по цене'],
  ProductsList: ['по дате', 'по цене', 'по популярности']
} as const;

export default function SortBar({pageTitle}: SortBarProps): JSX.Element {
  const dispatch = useAppDispatch();
  const controlElement = useAppSelector(getControlElement);

  const getSortTabClassActive = (tab: string) => {
    if (tab === SortTab.ProductsList[0]) {
      return controlElement.date ? 'catalog-sort__type-button--active' : '';
    }

    if (tab === SortTab.ProductsList[1]) {
      return controlElement.cost ? 'catalog-sort__type-button--active' : '';
    }

    if (tab === SortTab.ProductsList[2]) {
      return controlElement.rating ? 'catalog-sort__type-button--active' : '';
    }
  };

  const getSortDirectionClassActive = (buttonTitle: string) => {
    if (buttonTitle === SortButton.Asc) {
      return controlElement.asc ? 'catalog-sort__order-button--active' : '';
    }

    if (buttonTitle === SortButton.Desc) {
      return controlElement.desc ? 'catalog-sort__order-button--active' : '';
    }
  };

  const completeSortTab = async (typeButton: SortButton) => {
    switch (typeButton) {
      case SortButton.Cost:
        dispatch(changeCost());
        break;
      case SortButton.Date:
        dispatch(changeDate());
        break;
      case SortButton.Rating:
        dispatch(changeRating());
    }

    await dispatch(fetchProductsAction(generateQueryString()));
    filterPoducts();
  }

  const completeSortDirection = async () => {
    dispatch(changeAsc());
    dispatch(changeDesc());
    await dispatch(fetchProductsAction(generateQueryString()));
    filterPoducts();
  }

  const getButtonSortHandler = (buttonTitle: string) => {
    switch (buttonTitle) {
      case SortTab.ProductsList[0]:
        return () => {
          completeSortTab(SortButton.Date);
        };
      case SortTab.ProductsList[1]:
        return () => {
          completeSortTab(SortButton.Cost);
        };
      case SortTab.ProductsList[2]:
        return () => {
          completeSortTab(SortButton.Rating);
        };
      case SortButton.Asc:
        return () => {
          completeSortDirection();
        };
      case SortButton.Desc:
        return () => {
          completeSortDirection();
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

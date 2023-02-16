import { PropsWithChildren } from 'react';

export default function AdminListProductCard({children}: PropsWithChildren): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {children}
      </ul>
    </div>
  );
}

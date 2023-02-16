import { PropsWithChildren } from 'react';

export default function CatalogProduct({children}: PropsWithChildren): JSX.Element {
  return (
    <div className="catalog">
      {children}
    </div>
  );
}

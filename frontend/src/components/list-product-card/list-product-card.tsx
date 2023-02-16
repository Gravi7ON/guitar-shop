import { PropsWithChildren } from 'react';

export default function ListProductCard({children}: PropsWithChildren): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {children}
    </div>
  );
}

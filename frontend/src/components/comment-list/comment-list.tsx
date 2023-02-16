import { PropsWithChildren } from 'react';

export default function CommentList({children}: PropsWithChildren): JSX.Element {
  return (
    <section className="reviews">
      <h3 className="reviews__title title title--bigger">Отзывы</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
      {children}
      <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
      <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
    </section>
  );
}

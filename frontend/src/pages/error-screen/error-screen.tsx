import { useNavigate } from 'react-router-dom';
import CommonSpace from '../../components/common-space/common-space';
import { AppRoute } from '../../constant';

export default function ErrorScreen(): JSX.Element {
  const navigate = useNavigate();

  return (
    <CommonSpace>
      <section className="error">
        <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
        <p className="error__text"> Возможно, страница была удалена или<br />её вовсе не существовало.</p>
        <button
          className="button button__error button--small button--black-border"
          onClick={() => navigate(AppRoute.Catalog)}
        >
          Продолжить покупки
        </button>
      </section>
    </CommonSpace>
  );
}

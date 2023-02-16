import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../constant';

type HeaderProps = {
  userStatus?: string | undefined;
}

export enum UserStatus {
  Logged = 'logged',
  LoggedAndGoodsInCart = 'goods in cart',
  Admin = 'admin'
}
const getHeaderAtribute = (userStatus: string | undefined) => {
  const headerAtribute = {
    navLinkTitle: ['Где купить?', 'О компании']
  };

  switch (userStatus) {
    case UserStatus.Logged:
      return {
        ...headerAtribute,
        iconStyle: 'header--logged-empty header'
      };
    case UserStatus.LoggedAndGoodsInCart:
      return {
        ...headerAtribute,
        iconStyle: 'header--logged header'
      };
    case UserStatus.Admin:
      return {
        navLinkTitle: ['Список заказов', 'Список товаров'],
        iconStyle: 'header--admin header'
      };
    default:
      return {
        ...headerAtribute,
        iconStyle: 'header'
      };
  }
};

export default function Header({userStatus}: HeaderProps): JSX.Element {
  const headerAtribute = getHeaderAtribute(userStatus);
  const location = useLocation();

  return (
    <header className={headerAtribute.iconStyle} id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to='#'>
            <img className="logo__img" width="70" height="70" src="../img/svg/logo.svg" alt="Логотип" />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link
                  className={
                    `link main-nav__link ${location.pathname === AppRoute.Catalog ? 'link--current' : ''}`
                  } to={AppRoute.Catalog}
                >Каталог
                </Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to="#">{headerAtribute.navLinkTitle[0]}</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to="#">{headerAtribute.navLinkTitle[1]}</Link>
              </li>
            </ul>
          </nav>
          <div className="header__container">
            <span className="header__user-name">Имя</span>
            <Link className="header__link" to={AppRoute.SignIn} aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span className="header__link-text">Вход</span>
            </Link>
            <Link className="header__cart-link" to={AppRoute.CustomCart} aria-label="Перейти в корзину">
              <svg className="header__cart-icon" width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-basket"></use>
              </svg>
              <span className="header__cart-count">2</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

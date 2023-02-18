import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';
import { getAuthorizationStatus, getUserName } from 'src/store/user-process/selector';
import { AppRoute, AuthorizationStatus } from '../../constant';

export default function Header(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userName = useAppSelector(getUserName);
  const [isDroped, setIsDroped] = useState(false);

  return (
    <header className={`header ${authorizationStatus === AuthorizationStatus.Auth ? 'header--logged-empty' : ''}`} id="header">
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
                <Link className="link main-nav__link" to="#">Где купить?</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to="#">О компании</Link>
              </li>
            </ul>
          </nav>
          <div className="header__container">
            <span style={{marginRight: '7px'}} className="header__user-name">{userName}</span>
            <Link className="header__link" to="#" aria-label="Перейти в личный кабинет">
              <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
                <use xlinkHref="#icon-account"></use>
              </svg>
              <span
                style={{color: isDroped ? 'red' : 'inherit'}}
                onClick={(evt) => {
                evt.preventDefault();
                navigate(AppRoute.SignIn)
                }}
                onMouseEnter={() => setIsDroped((prev) => !prev)}
                onMouseLeave={() => setIsDroped((prev) => !prev)}
                className="header__link-text"
              >Вход</span>
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

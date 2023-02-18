import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from 'src/constant';
import { useModalClose } from 'src/hooks';

type ModalCardEnterProps = {
  onChangeCatalogModalEnter: Dispatch<SetStateAction<boolean>>
};

export default function ModalCardEnter({onChangeCatalogModalEnter: changeCatalogModalEnter}: ModalCardEnterProps): JSX.Element {
  const buttonClickHandler = () => {
    changeCatalogModalEnter((prev) => !prev);
  };

  useModalClose(buttonClickHandler);

  return (
    <div className="modal is-active modal--enter modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__content">
          <div className="modal-enter">
            <h2 className="modal-enter__title">Для выполнения данного действия необходимо войти в&nbsp;систему</h2>
            <Link tabIndex={0} className="button button--big modal-enter__link" to={AppRoute.SignIn}>Войти</Link>
            <p className="modal-enter__text">Если у вас ещё нет аккаунта, необходимо <br />
              <Link tabIndex={1} to={AppRoute.SignUp}>Зарегистрироваться</Link>
            </p>
          </div>
          <button onClick={buttonClickHandler} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

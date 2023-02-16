export default function ModalCardEnter(): JSX.Element {
  return (
    <div className="modal is-active modal--enter modal-for-ui-kit">
      <div className="modal__wrapper">
        <div className="modal__content">
          <div className="modal-enter">
            <h2 className="modal-enter__title">Для выполнения данного действия необходимо войти в&nbsp;систему</h2>
            <a className="button button--big modal-enter__link" href="/login.html">Войти</a>
            <p className="modal-enter__text">Если у вас ещё нет аккаунта, необходимо <br />
              <a href="/registration.html">Зарегистрироваться</a>
            </p>
          </div>
          <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon"></span>
            <span className="modal__close-btn-interactive-area"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

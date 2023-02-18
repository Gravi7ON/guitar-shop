import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks';
import { userLoginAction } from 'src/store/api-actions';
import { AppRoute } from '../../constant';
import Spinner from '../spinner/spinner';

export default function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {email, password} = formData;

  const [defaultType, setDefaultType] = useState('password');

  const [isSendToServer, setIsSendToServer] = useState(false);

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    })
  };

  const submitButtonHandler = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    if (email && password) {
      setIsSendToServer((prev) => !prev);
      const response = await dispatch(userLoginAction(formData));

      if (response.meta.requestStatus === 'fulfilled') {
        setIsSendToServer((prev) => !prev);
      }
    }
  }
  return (
    <section className="login">
      <h1 className="login__title">Войти</h1>
      <p className="login__text">Hовый пользователь? <Link className="login__link" to={AppRoute.SignUp}>Зарегистрируйтесь</Link> прямо сейчас</p>
      <form method="post" action="/">
        <div className="input-login">
          <label htmlFor="email">Введите e-mail</label>
          <input onChange={inputChangeHandler} type="email" id="email" name="email" autoComplete="off" required value={formData.email}/>
          {
            !formData.email && <p className="input-login__error">Заполните поле</p>
          }
        </div>
        <div className="input-login">
          <label htmlFor="passwordLogin">Введите пароль</label>
          <span>
            <input onChange={inputChangeHandler} type={defaultType} placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password" autoComplete="off" required value={formData.password}/>
            <button onClick={() => setDefaultType((prev) => prev === 'password' ? 'text' : 'password')} className="input-login__button-eye" type="button">
              <svg width="14" height="8" aria-hidden="true">
                <use xlinkHref="#icon-eye"></use>
              </svg>
            </button>
          </span>
          {
            !formData.password && <p className="input-login__error">Заполните поле</p>
          }
        </div>
        <button disabled={isSendToServer} onClick={submitButtonHandler} className="button login__button button--medium" type="submit">{isSendToServer ? <Spinner /> : 'Войти'}</button>
      </form>
    </section>
  );
}

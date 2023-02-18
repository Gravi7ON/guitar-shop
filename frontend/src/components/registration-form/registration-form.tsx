import { useState } from 'react';
import { useAppDispatch } from 'src/hooks';
import { userRegisterAction } from 'src/store/api-actions';
import '../loading-screen/loading-screen.css'
import Spinner from '../spinner/spinner';

export default function RegistrationForm(): JSX.Element {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const {name, email, password} = formData;

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
    if (name && email && password) {
      setIsSendToServer((prev) => !prev);
      const response = await dispatch(userRegisterAction(formData));

      if (response.meta.requestStatus === 'fulfilled') {
        setIsSendToServer((prev) => !prev);
      }
    }
  }

  return (
    <section className="login">
      <h1 className="login__title">Регистрация</h1>
      <form method="post" action="/">
        <div className="input-login">
          <label htmlFor="name">Введите имя</label>
          <input onChange={inputChangeHandler} type="text" id="name" name="name" autoComplete="off" required value={formData.name}/>
          {
            !formData.name && <p className="input-login__error">Заполните поле</p>
          }
        </div>
        <div className="input-login">
          <label htmlFor="email">Введите e-mail</label>
          <input onChange={inputChangeHandler} type="email" id="email" name="email" autoComplete="off" required value={formData.email}/>
          {
            !formData.email && <p className="input-login__error">Заполните поле</p>
          }
        </div>
        <div className="input-login">
          <label htmlFor="password">Придумайте пароль</label>
          <span>
            <input onChange={inputChangeHandler} type={defaultType} placeholder="• • • • • • • • • • • •" id="password" name="password" autoComplete="off" required value={formData.password}/>
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
        <button disabled={isSendToServer} onClick={submitButtonHandler} className="button login__button button--medium" type="submit">{isSendToServer ? <Spinner /> : 'Зарегистрироваться'}</button>
      </form>
    </section>
  );
}

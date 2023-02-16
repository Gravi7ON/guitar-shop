import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constant';
import Catalog from '../../pages/catalog/catalog';
import CustomCart from '../../pages/custom-cart/castom-cart';
import ErrorScreen from '../../pages/error-screen/error-screen';
import ProductInfo from '../../pages/product-info/product-info';
import SignIn from '../../pages/sign-in/sign-in';
import SignUp from '../../pages/sign-up/sign-up';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  return (
    <Routes>
      <Route
        path={AppRoute.Catalog}
        element={<Catalog />}
      />
      <Route
        path={AppRoute.SignIn}
        element={<SignIn />}
      />
      <Route
        path={AppRoute.SignUp}
        element={<SignUp />}
      />
      <Route
        path={AppRoute.CustomCart}
        element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <CustomCart />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.ProductInfo}
        element={<ProductInfo />}
      />
      <Route
        path="*"
        element={<ErrorScreen />}
      />
    </Routes>
  );
}

export default App;

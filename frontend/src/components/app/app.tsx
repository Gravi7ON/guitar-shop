import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from 'src/hooks';
import { getLoadedProductsStatus } from 'src/store/product-data/selector';
import { getAuthorizationStatus } from 'src/store/user-process/selector';
import { AppRoute, AuthorizationStatus } from '../../constant';
import Catalog from '../../pages/catalog/catalog';
import CustomCart from '../../pages/custom-cart/castom-cart';
import ErrorScreen from '../../pages/error-screen/error-screen';
import ProductInfo from '../../pages/product-info/product-info';
import SignIn from '../../pages/sign-in/sign-in';
import SignUp from '../../pages/sign-up/sign-up';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isProductLoaded = useAppSelector(getLoadedProductsStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isProductLoaded) {
    return (
      <LoadingScreen />
    );
  }

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
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <CustomCart />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.ProductInfo}>
        <Route
          path=':id'
          element={<ProductInfo />}
        />
      </Route>
      <Route
        path="*"
        element={<ErrorScreen />}
      />
    </Routes>
  );
}

export default App;

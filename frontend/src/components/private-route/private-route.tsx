import { AuthorizationStatus } from '../../constant';
import SignIn from '../../pages/sign-in/sign-in';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

export default function PrivateRoute({authorizationStatus, children}: PrivateRouteProps): JSX.Element {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <SignIn />
  );
}

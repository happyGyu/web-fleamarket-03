import { Route, Routes as RouterRoutes } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import OAuthRedirectPage from './OAuthRedirectPage';
import SignUpPage from './SignUpPage';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth-redirect" element={<OAuthRedirectPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/error" element={<ErrorPage />} />
      {/* <Route path="/" element={isLogin ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<MainPage />} />
      </Route> */}
    </RouterRoutes>
  );
}

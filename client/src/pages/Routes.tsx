import { Route, Routes as RouterRoutes } from 'react-router-dom';
import LoginPage from './LoginPage';
import OAuthRedirectPage from './OAuthRedirectPage';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth-redirect" element={<OAuthRedirectPage />} />
      {/* <Route path="/signUp" element={<JoinPage />} /> */}
      {/* <Route path="/" element={isLogin ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<MainPage />} />
      </Route> */}
    </RouterRoutes>
  );
}

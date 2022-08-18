import { Route, Routes as RouterRoutes } from 'react-router-dom';
import LoginPage from './LoginPage';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/signUp" element={<JoinPage />} />
      <Route path="/callback" element={<OauthCallbackPage />} /> */}
      {/* <Route path="/" element={isLogin ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<MainPage />} />
      </Route> */}
    </RouterRoutes>
  );
}

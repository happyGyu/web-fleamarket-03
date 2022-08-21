import { requestRelogin } from '@apis/user';
import { LoginAPIResponseDto } from '@customTypes/user';
import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import OAuthRedirectPage from './OAuthRedirectPage';
import SignUpPage from './SignUpPage';

export default function Routes() {
  requestRelogin();
  const isLogin = true;

  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth-redirect" element={<OAuthRedirectPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/" element={isLogin ? <MainPage /> : <Navigate to="/login" />} />
    </RouterRoutes>
  );
}

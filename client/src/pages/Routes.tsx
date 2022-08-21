import { Navigate, Route, Routes as RouterRoutes } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import OAuthRedirectPage from './OAuthRedirectPage';
import PostPage from './PostPage';
import SignUpPage from './SignUpPage';

export default function Routes() {
  const isLogin = true;

  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth-redirect" element={<OAuthRedirectPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/" element={isLogin ? <MainPage /> : <Navigate to="/login" />} />
    </RouterRoutes>
  );
}

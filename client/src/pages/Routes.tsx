import { Route, Routes as RouterRoutes } from 'react-router-dom';
import DetailPage from './DetailPage';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import MyPage from './MyPage';
import OAuthRedirectPage from './OAuthRedirectPage';
import PostPage from './PostPage';
import ProductEditPage from './ProductEditPage';
import SignUpPage from './SignUpPage';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth-redirect" element={<OAuthRedirectPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/product/:productId" element={<DetailPage />} />
      <Route path="/product/edit/:productId" element={<ProductEditPage />} />
      <Route path="/my" element={<MyPage />} />
      <Route path="/post" element={<PostPage />} />
    </RouterRoutes>
  );
}

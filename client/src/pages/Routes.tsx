import { AnimatePresence } from '@hooks/animation/AnimatedPresence';
import { Route, Routes as RouterRoutes, useLocation, useNavigate } from 'react-router-dom';
import CategoryProductPage from './CategortProductPage';
import CategoryListPage from './CategoryListPage';
import DetailPage from './DetailPage';
import ErrorPage from './ErrorPage';
import LoginPage from './LoginPage';
import LogOutPage from './LogOutPage';
import MainPage from './MainPage';
import MyPage from './MyPage';
import OAuthRedirectPage from './OAuthRedirectPage';
import PostPage from './PostPage';
import ProductEditPage from './ProductEditPage';
import SignUpPage from './SignUpPage';
import UserRegionPage from './UserRegionPage';

export default function Routes() {
  const location = useLocation();
  return (
    <AnimatePresence animateBeforeExit>
      <RouterRoutes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-redirect" element={<OAuthRedirectPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/product/:productId" element={<DetailPage />} />
        <Route path="/product/edit/:productId" element={<ProductEditPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/user/region" element={<UserRegionPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/category/list" element={<CategoryListPage />} />
        <Route path="/category/products/:categoryId" element={<CategoryProductPage />} />
        <Route path="/logout" element={<LogOutPage />} />
      </RouterRoutes>
    </AnimatePresence>
  );
}

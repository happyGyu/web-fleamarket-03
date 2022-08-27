import CategoryGrid from '@components/CategoryPage/CategoryGrid';
import NavigationBar from '@components/common/NavigationBar';

export default function CategoryPage() {
  return (
    <>
      <NavigationBar title="카테고리" />
      <CategoryGrid />
    </>
  );
}

import { useParams } from 'react-router-dom';
import DetailPageNavigationBar from '@components/DetailPageNavigationBar';

export default function ErrorPDetailPageage() {
  const { productId } = useParams();

  return <DetailPageNavigationBar />;
}

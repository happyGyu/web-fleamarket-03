import { useParams } from 'react-router-dom';

export default function ErrorPDetailPageage() {
  const { productId } = useParams();

  return <div>{productId}</div>;
}

import { getCategories } from '@apis/product';
import { useQuery } from '@tanstack/react-query';

export const useCategory = () => useQuery(['category'], getCategories);

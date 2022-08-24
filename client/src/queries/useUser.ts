import { getUser } from '@apis/user';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const { data } = useQuery(['user'], getUser, {
    staleTime: 30000,
  });
  return data;
};

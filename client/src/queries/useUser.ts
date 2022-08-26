import { getUser } from '@apis/user';
import { useQuery } from '@tanstack/react-query';

const initialUser = {
  id: -1,
  name: '',
  regions: [{ id: -1, address: '', isPrimary: true }],
};

export const useUser = () => {
  const { data = initialUser } = useQuery(['user'], getUser, {
    staleTime: 30000,
  });
  return data;
};

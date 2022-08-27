import { IUser } from '@customTypes/user';
import { requestUser } from '@apis/user';
import { useQuery } from '@tanstack/react-query';

const initialUser = {
  id: -1,
  name: '',
  regions: [{ id: -1, address: '', isPrimary: true }],
};

export default function useUser() {
  const getUser = () =>
    useQuery<IUser>(['user'], requestUser, {
      staleTime: 30000,
      initialData: initialUser,
    });

  return { getUser };
}

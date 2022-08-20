import { CheckDuplicatedResponseDto } from '@customTypes/user';
import { makeQueryString } from '@utils/queryParser';
import axios from 'axios';

export const checkDuplicatedUser = async (nickname: string) => {
  const queryConfig = {
    nickname,
  };
  const queryString = makeQueryString(queryConfig);
  const response = await axios.get<CheckDuplicatedResponseDto>(`/user${queryString}`);
  return response.data.data;
};

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginAPIResponseDto } from '@customTypes/user';
import { useQuery } from '@tanstack/react-query';
import { requestLogin } from '@apis/user';
import LoadingIndicator from '@components/common/LoadingIndicator';
import React from 'react';

export default function useLogin() {
  const navigate = useNavigate();

  const setAccessTokenOnHeader = (accessToken: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  };

  const login = async (code: string, oAuthOrigin: string) => {
    const { data, error, isLoading } = useQuery<LoginAPIResponseDto>(['user'], () =>
      requestLogin(code, oAuthOrigin),
    );
    if (!data || isLoading) {
      return <LoadingIndicator />;
    }

    if (data.isRegistered) {
      setAccessTokenOnHeader(data.accessToken);
      navigate('/');
    }

    if (!data.isRegistered) {
      navigate('/signUp', { state: { ...data.oAuthInfo } });
    }

    if (error) {
      navigate('/error');
    }

    return <LoadingIndicator />;
  };

  return { login };
}

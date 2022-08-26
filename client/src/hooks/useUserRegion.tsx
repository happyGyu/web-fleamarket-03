import { getUser, requestChangePrimaryRegion, requestDeleteRegion } from '@apis/user';
import { IRegion } from '@customTypes/region';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function useUserRegion() {
  // TODO useUser로 변경
  const { data: user, refetch } = useQuery(['user'], getUser);
  const regions = user?.regions || [];

  const deleteRegion = (region: IRegion) => (e: React.MouseEvent) => {
    e.stopPropagation();

    requestDeleteRegion(region).then(() => {
      refetch();
    });
  };

  const updateRegionPrimary = (region: IRegion) => (e: React.MouseEvent) => {
    requestChangePrimaryRegion(region).then(() => {
      refetch();
    });
  };

  return { regions, deleteRegion, updateRegionPrimary };
}

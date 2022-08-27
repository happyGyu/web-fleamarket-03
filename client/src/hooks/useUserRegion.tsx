import { requestChangePrimaryRegion, requestDeleteRegion } from '@apis/user';
import { IRegion } from '@customTypes/region';
import useUser from '@queries/useUser';
import React from 'react';

export default function useUserRegion() {
  const { getUser } = useUser();
  const { data: user, refetch } = getUser();
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

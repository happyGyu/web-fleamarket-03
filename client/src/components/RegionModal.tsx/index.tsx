import { IRegion } from '@customTypes/region';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface RegionModalProps {
  isModalOpen: boolean;
  toggleModalOpen: () => void;
  selectRegion: (region: IRegion) => void;
}

export default function RegionModal({
  isModalOpen,
  toggleModalOpen,
  selectRegion,
}: RegionModalProps) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<IRegion[]>([]);
  useEffect(() => {
    axios
      .get(`/region/search?keyword=${searchKeyword}`)
      .then((res) => setSearchResult(res.data.regions));
  }, [searchKeyword]);

  return (
    <RegionModalWrapper isModalOpen={isModalOpen}>
      <input
        type="text"
        placeholder="동네 검색"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value)}
      />
      {searchResult.map((region) => (
        <button tabIndex={0} type="button" onClick={() => selectRegion(region)}>
          {region.address}
        </button>
      ))}
    </RegionModalWrapper>
  );
}

const RegionModalWrapper = styled.div<{ isModalOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in;
  ${({ isModalOpen }) =>
    isModalOpen
      ? css`
          transform: translateX(0%);
        `
      : css`
          transform: translateX(100%);
        `};
`;

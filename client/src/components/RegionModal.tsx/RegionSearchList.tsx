import colors from '@constants/colors';
import { fontSize } from '@constants/fonts';
import { IRegion } from '@customTypes/region';
import mixin from '@style/mixin';
import styled from 'styled-components';

interface RegionSearchListProps {
  searchResult: IRegion[];
  selectRegion: (region: IRegion) => void;
}

export default function RegionSearchList({ searchResult, selectRegion }: RegionSearchListProps) {
  return searchResult.length ? (
    <SearchListWrapper>
      {searchResult.map((region) => (
        <ResultItem key={region.id} tabIndex={0} type="button" onClick={() => selectRegion(region)}>
          {region.address}
        </ResultItem>
      ))}
    </SearchListWrapper>
  ) : (
    <div>검색결과가 없습니다.</div>
  );
}

const SearchListWrapper = styled.div`
  padding: 1rem;
  ${mixin.flexMixin({ direction: 'column' })}
`;

const ResultItem = styled.button`
  width: 100%;
  padding: 1rem 0.25rem;
  text-align: left;
  font-size: ${fontSize.medium};
  border-bottom: 1px solid ${colors.grey2};

  :hover {
    background-color: ${colors.secondary};
  }
`;

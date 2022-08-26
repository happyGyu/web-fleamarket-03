import MapPinIcon from '@assets/icons/MapPinIcon';
import DropDown from '@components/common/DropDown';
import LoadingIndicator from '@components/common/LoadingIndicator';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import { getLastAddress } from '@utils/product';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function MainNavTitle() {
  const { data: user } = useQuery(['user'], getUser);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const navigate = useNavigate();

  const regions = user?.regions || [];

  const dropdownItems = [
    ...regions.map(({ region }) => ({
      onClick: () => alert('primary region 를 바꿉니다.'),
      name: getLastAddress(region.address) || '',
    })),
    {
      name: '내 동네 설정하기',
      onClick: () => navigate('/user/region'),
    },
  ];

  return user ? (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        setIsDropDownOpen((prev) => !prev);
      }}
    >
      <MapPinIcon />
      {/* // ! TODO 여기 region이 프라이머리 region이 아님    */}
      <Text color={colors.white}>{getLastAddress(user.regions[0].region.address)}</Text>
      {isDropDownOpen && (
        <DropDown dropDownItems={dropdownItems} top="85%" transform="translate(-25%,0)" />
      )}
    </Container>
  );
}

const Container = styled.button`
  ${mixin.flexMixin({ align: 'center' })}
  gap: 0.25rem;

  svg {
    scale: 0.9;
    stroke: ${colors.white};
  }
`;

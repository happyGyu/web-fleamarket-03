import RegionModal from '@components/RegionModal.tsx';
import useRegionModal from '@hooks/useRegionModal';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { IOAuthUserInfo } from '@customTypes/auth';
import { useState } from 'react';

export default function SignUpPage() {
  const { isModalOpen, toggleModalOpen, selectedRegion, setSelectedRegion } = useRegionModal();
  const [userName, setUserName] = useState<string>('');
  const { state } = useLocation();
  const oAuthInfo = state as IOAuthUserInfo;

  const signUp = () => {
    axios.post('/user/sign-up', {
      name: userName,
      regionId: selectedRegion?.id,
      ...oAuthInfo,
    });
  };

  return (
    <SignUpPageWrapper>
      <InputWrapper>
        <InputTitle>닉네임</InputTitle>
        <input
          type="text"
          placeholder="황금마켓에서 사용할 이름을 입력해주세요"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper onClick={toggleModalOpen}>
        <InputTitle>동네</InputTitle>
        <input
          type="text"
          placeholder="동네를 선택해주세요"
          value={selectedRegion?.address || ''}
        />
      </InputWrapper>
      <RegionModal
        isModalOpen={isModalOpen}
        toggleModalOpen={toggleModalOpen}
        setSelectedRegion={setSelectedRegion}
      />
      <button type="submit" onClick={signUp}>
        회원가입
      </button>
    </SignUpPageWrapper>
  );
}

const SignUpPageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const InputWrapper = styled.div`
  & input {
    border: 1px solid black;
  }
`;
const InputTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
`;

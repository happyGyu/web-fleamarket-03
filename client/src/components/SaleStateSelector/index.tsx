import { updateProduct } from '@apis/product';
import ChevronDown from '@assets/icons/ChevronDown';
import DropDown from '@components/common/DropDown';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import { SalesStatusType, SalesStatusEnum } from '@customTypes/product';
import mixin from '@style/mixin';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import styled from 'styled-components';
import useSalesStatusSelector from './useSalesStatusSelector';

interface SaleStateSelectorProps {
  initialStatus: SalesStatusType;
  productId: number;
}

export default function SaleStateSelector({ initialStatus, productId }: SaleStateSelectorProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [salesStatus, setSalesStatus] = useState<SalesStatusType>(initialStatus);
  const salesStatusMutator = useSalesStatusSelector(productId);

  const handleDropDownItemClick = (newSalesStatus: SalesStatusType) => {
    if (salesStatus === newSalesStatus) return;
    setSalesStatus(newSalesStatus);
    salesStatusMutator(newSalesStatus);
  };

  const dropDownItems = Object.entries(SalesStatusEnum).map(([enumKey, enumValue]) => ({
    name: enumValue,
    onClick: () => handleDropDownItemClick(enumKey as SalesStatusType),
  }));

  return (
    <Container onClick={() => setIsDropDownOpen((prev) => !prev)}>
      <Text size="small" weight="bold">
        {SalesStatusEnum[salesStatus]}
      </Text>
      <ChevronDown />
      {isDropDownOpen && <DropDown dropDownItems={dropDownItems} top="3rem" left="0" />}
    </Container>
  );
}

const Container = styled.button`
  position: relative;
  ${mixin.flexMixin({ align: 'center', justify: 'space-between' })}
  width: 7.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${colors.grey2};
  padding: 0.625rem 1rem;

  svg {
    stroke: ${colors.grey1};
    scale: 0.8;
  }
`;

import { IRegion } from '@customTypes/region';
import { useState } from 'react';

export default function useRegionModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);

  const toggleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const selectRegion = (region: IRegion) => {
    setSelectedRegion(region);
  };

  return { isModalOpen, toggleModalOpen, selectedRegion, selectRegion };
}

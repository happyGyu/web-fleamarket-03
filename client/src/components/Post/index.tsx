import CategorySelector from './CategorySelector';
import DescriptionTextArea from './DescriptionTextArea';
import ImageUploader from './ImageUploader';
import PriceInput from './PriceInput';
import TitleInput from './TitleInput';

export default function Post() {
  return (
    <>
      <ImageUploader />
      <TitleInput />
      <CategorySelector />
      <PriceInput />
      <DescriptionTextArea />
    </>
  );
}

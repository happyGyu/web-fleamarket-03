import ImageIcon from '@assets/icons/ImageIcon';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';
import UploadedImage from '../UploadedImage';
import { useUploadImage } from './useUploadImage';

const MAX_QUANTITY_IMG_URLS = 2;

export default function ImageUploader() {
  const { uploadedImgUrls, actions } = useUploadImage();

  return (
    <>
      <Container>
        <ImageInput>
          <ImageIcon />
          <Flex>
            <Text size="xSmall">{uploadedImgUrls.length}</Text>
            <Text size="xSmall">/</Text>
            <Text size="xSmall">{MAX_QUANTITY_IMG_URLS}</Text>
          </Flex>

          <input
            onClick={(e) => {
              e.currentTarget.value = '';
            }}
            onInput={actions.imageUpload}
            type="file"
            accept=" image/jpeg, image/png"
          />
        </ImageInput>
        {uploadedImgUrls.map((imgUrl) => (
          <UploadedImage
            onClick={() => {
              actions.deleteImageFile(imgUrl);
            }}
            imgUrl={imgUrl}
          />
        ))}
      </Container>
      <div />
    </>
  );
}

const Container = styled.div`
  padding: 24px 0;
  overflow-x: auto;
  border-bottom: 1px solid ${colors.grey3};
  ${mixin.flexMixin({})}
  gap: 1.2rem;
`;

const ImageInput = styled.div`
  --size: 6rem;
  flex: 0 0 6rem;
  position: relative;
  background-color: ${colors.offWhite};
  width: var(--size);
  height: var(--size);
  border-radius: 8px;
  ${mixin.flexMixin({ align: 'center', justify: 'center', direction: 'column' })}
  gap: 4px;
  border: 1px solid ${colors.grey3};

  input[type='file'] {
    width: var(--size);
    height: var(--size);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
  ${Text} {
    color: ${colors.grey1};
  }

  svg {
    stroke-width: 1px;
    stroke: ${colors.grey1};
  }
`;

const Flex = styled.div`
  ${mixin.flexMixin({})};
  gap: 2px;
`;

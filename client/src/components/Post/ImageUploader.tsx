import ImageIcon from '@assets/icons/ImageIcon';
import { Text } from '@components/common/Text';
import colors from '@constants/colors';
import mixin from '@style/mixin';
import styled from 'styled-components';
import UploadedImage from './UploadedImage';

export default function ImageUploader() {
  return (
    <>
      <Container>
        <ImageInput>
          <ImageIcon />
          <Flex>
            <Text size="xSmall">1</Text>
            <Text size="xSmall">/</Text>
            <Text size="xSmall">10</Text>
          </Flex>

          <input type="file" />
        </ImageInput>
        <UploadedImage />
      </Container>
      <div />
    </>
  );
}

const Container = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${colors.grey3};
  ${mixin.flexMixin({})}
  gap: 1.2rem;
`;

// const ImageInput = styled.input`

// `
const ImageInput = styled.div`
  --size: 6rem;
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

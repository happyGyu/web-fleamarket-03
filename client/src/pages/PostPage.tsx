import CheckIcon from '@assets/icons/CheckIcon';
import NavigationBar from '@components/common/NavigationBar';
import PageContainer from '@components/common/PageContainer';
import Post from '@components/Post';
import RegionFooter from '@components/Post/RegionFooter';
import { padding } from '@constants/padding';
import styled from 'styled-components';

export default function PostPage() {
  return (
    <>
      <NavigationBar title="글쓰기" actionItem={<CheckIcon />} />
      <PostPageWrapper>
        <form>
          <Post />
        </form>
        <RegionFooter />
      </PostPageWrapper>
    </>
  );
}

const PostPageWrapper = styled(PageContainer)`
  position: relative;
  padding-right: ${padding.pageSide};
  padding-left: ${padding.pageSide};
  width: 100%;
  height: 100%;
  background-color: white;
`;

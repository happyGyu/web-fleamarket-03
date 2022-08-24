import NavigationBar from '@components/common/NavigationBar';
import MoreButton from '@components/MoreButton';
import colors from '@constants/colors';

export default function DetailPageNavigationBar() {
  return (
    <NavigationBar
      color={colors.white}
      backgroundColor="transparent"
      shadowColor="transparent"
      actionItem={<MoreButton color={colors.white} />}
    />
  );
}

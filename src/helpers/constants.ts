import {WINDOW_WIDTH} from '@constants/reusable';
import {nativeBaseTheme} from '@constants/theme';
import {PixelRatio, Dimensions} from 'react-native';

export const BORDER_RADIUS = 65;
export interface IconProps {
  active?: boolean;
}
const tabBarRoutesNumberOfIcons = 6;
const horizontalPadding = 90;
export const DURATION = 50;
export const PADDING = 16;
export const SEGMENT = PixelRatio.roundToNearestPixel(
  WINDOW_WIDTH / tabBarRoutesNumberOfIcons,
);

export const ICON_SIZE = SEGMENT - horizontalPadding;

export const Colors = {
  primary: nativeBaseTheme.colors.primary[1],
  border: 'red',
};

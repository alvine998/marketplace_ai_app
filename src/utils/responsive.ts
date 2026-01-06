import {
  Dimensions,
  PixelRatio,
  Platform,
  useWindowDimensions,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Samsung S series usually have high pixel density
// Z Fold tablets have high width when unfolded
export const isLargeScreen = SCREEN_WIDTH >= 600;

export const getGridColumns = (width: number = SCREEN_WIDTH) => {
  if (width >= 900) return 6; // Large tablets / Expanded Fold (Premium view)
  if (width >= 700) return 4; // Mini Fold / Small tablets
  if (width >= 500) return 3; // Large phones / Fold outer screen maybe
  return 2; // Standard Phones
};

export const getResponsiveWidth = (
  percent: number,
  width: number = SCREEN_WIDTH,
) => {
  return (width * percent) / 100;
};

// Optimization for high-end Samsung displays (higher resolution images if needed)
export const getPixelRatio = () => {
  return PixelRatio.get();
};

export const isFoldable = (width: number, height: number) => {
  const ratio = height / width;
  return width > 500 && ratio < 1.4;
};

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const columns = getGridColumns(width);
  const isFoldedIn = width > 500 && height / width < 1.4;

  return {
    width,
    height,
    isLandscape,
    columns,
    isFoldedIn,
    spacing: width > 600 ? 24 : 16,
    isSML: width < 380, // For small devices (e.g. S series with small display zoom)
  };
};

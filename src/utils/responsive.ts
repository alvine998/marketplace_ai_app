import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Samsung S series usually have high pixel density
// Z Fold tablets have high width when unfolded
export const isLargeScreen = SCREEN_WIDTH >= 600;

export const getGridColumns = () => {
    if (SCREEN_WIDTH >= 900) return 4; // Large tablets / Expanded Fold
    if (SCREEN_WIDTH >= 600) return 3; // Small tablets / Mini Fold
    return 2; // Phones
};

export const getResponsiveWidth = (percent: number) => {
    return (SCREEN_WIDTH * percent) / 100;
};

// Optimization for high-end Samsung displays (higher resolution images if needed)
export const getPixelRatio = () => {
    return PixelRatio.get();
};

export const isFoldable = () => {
    // Basic detection for foldables based on aspect ratio and width
    // Z Fold 5 unfolded is ~1812 x 2176 (approx 0.83 ratio)
    // Most phones are > 1.7 ratio
    const ratio = SCREEN_HEIGHT / SCREEN_WIDTH;
    return SCREEN_WIDTH > 500 && ratio < 1.5;
};

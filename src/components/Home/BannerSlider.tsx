import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { SPACING, SIZES, COLORS, SHADOWS } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useResponsive } from '../../utils/responsive';

const BANNER_HEIGHT = normalize(150);

const BANNER_DATA = [
    require('../../assets/images/banner1.jpeg'),
    require('../../assets/images/banner2.jpeg'),
    require('../../assets/images/banner3.jpeg'),
];

const BannerSlider = () => {
    const { width } = useResponsive();
    // Correctly calculate width based on paddingHorizontal: SPACING.sm (8)
    const bannerWidth = width - (SPACING.sm * 2);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
            >
                {BANNER_DATA.map((imageSource, index) => (
                    <View key={index} style={[styles.bannerWrapper, { width: bannerWidth }]}>
                        <Image
                            source={imageSource}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: BANNER_HEIGHT,
        marginTop: SPACING.sm,
        paddingHorizontal: SPACING.sm,
    },
    scrollView: {
        borderRadius: SIZES.radiusLg,
    },
    bannerWrapper: {
        height: BANNER_HEIGHT,
        borderRadius: SIZES.radiusLg,
        overflow: 'hidden',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
});

export default BannerSlider;

import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import { useResponsive } from '../../utils/responsive';

const BANNER_HEIGHT = normalize(140);

const BANNER_DATA = [
    'https://picsum.photos/seed/10/800/400',
    'https://picsum.photos/seed/11/800/400',
    'https://picsum.photos/seed/12/800/400',
];

const BannerSlider = () => {
    const { width } = useResponsive();
    const bannerWidth = width - (SPACING.md * 2);

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
            >
                {BANNER_DATA.map((uri, index) => (
                    <View key={index} style={[styles.bannerWrapper, { width: bannerWidth }]}>
                        <Image
                            source={{ uri }}
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
        marginTop: SPACING.md,
        paddingHorizontal: SPACING.md,
    },
    scrollView: {
        borderRadius: SIZES.radius,
    },
    bannerWrapper: {
        height: BANNER_HEIGHT,
        borderRadius: SIZES.radius,
        overflow: 'hidden',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
});

export default BannerSlider;

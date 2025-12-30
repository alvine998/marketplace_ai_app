import React from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - (SPACING.md * 2);
const BANNER_HEIGHT = normalize(140);

const BANNER_DATA = [
    'https://images.tokopedia.net/img/cache/1200/BDS_Srp/2025/12/30/banner1.jpg', // Placeholder
    'https://images.tokopedia.net/img/cache/1200/BDS_Srp/2025/12/30/banner2.jpg', // Placeholder
];

const BannerSlider = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
            >
                {BANNER_DATA.map((item, index) => (
                    <View key={index} style={styles.bannerWrapper}>
                        <Image
                            source={{ uri: `https://picsum.photos/seed/${index + 10}/800/400` }} // Using Picsum for demo
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
        width: BANNER_WIDTH,
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

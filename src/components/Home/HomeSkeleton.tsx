import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { COLORS, SPACING, SIZES } from '../../utils/theme';
import normalize from 'react-native-normalize';
import Skeleton from '../Common/Skeleton';

const { width } = Dimensions.get('window');

const HomeSkeleton = () => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header Placeholder (Already rendered usually, but keeping consistency) */}
            <View style={styles.headerSpacer} />

            {/* Seller Promotion Placeholder */}
            <View style={styles.sellerPromotion}>
                <View style={styles.row}>
                    <Skeleton width={normalize(40)} height={normalize(40)} borderRadius={normalize(20)} />
                    <View style={styles.textContainer}>
                        <Skeleton width="60%" height={normalize(14)} style={{ marginBottom: 6 }} />
                        <Skeleton width="40%" height={normalize(12)} />
                    </View>
                </View>
                <Skeleton width={normalize(80)} height={normalize(24)} borderRadius={normalize(12)} />
            </View>

            {/* Banner Placeholder */}
            <View style={styles.bannerContainer}>
                <Skeleton width="100%" height={normalize(150)} borderRadius={SIZES.radius} />
            </View>

            {/* Categories Placeholder */}
            <View style={styles.categoriesContainer}>
                {[1, 2, 3, 4, 5].map((i) => (
                    <View key={i} style={styles.categoryItem}>
                        <Skeleton width={normalize(45)} height={normalize(45)} borderRadius={normalize(22.5)} />
                        <Skeleton width={normalize(40)} height={normalize(10)} style={{ marginTop: 8 }} />
                    </View>
                ))}
            </View>

            {/* Recommendation Title */}
            <View style={styles.sectionTitleContainer}>
                <Skeleton width={normalize(120)} height={normalize(18)} />
            </View>

            {/* Product Rows Placeholder */}
            {[1, 2].map((row) => (
                <View key={row} style={styles.productRow}>
                    <View style={styles.productCard}>
                        <Skeleton width="100%" height={normalize(120)} borderRadius={SIZES.radius} />
                        <Skeleton width="90%" height={normalize(14)} style={{ marginTop: 10 }} />
                        <Skeleton width="60%" height={normalize(12)} style={{ marginTop: 6 }} />
                    </View>
                    <View style={styles.productCard}>
                        <Skeleton width="100%" height={normalize(120)} borderRadius={SIZES.radius} />
                        <Skeleton width="90%" height={normalize(14)} style={{ marginTop: 10 }} />
                        <Skeleton width="60%" height={normalize(12)} style={{ marginTop: 6 }} />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    headerSpacer: {
        height: normalize(60),
    },
    sellerPromotion: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        marginHorizontal: SPACING.md,
        marginTop: SPACING.sm,
        padding: SPACING.md,
        borderRadius: SIZES.radius,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textContainer: {
        marginLeft: SPACING.sm,
        flex: 1,
    },
    bannerContainer: {
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.md,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.lg,
    },
    categoryItem: {
        alignItems: 'center',
    },
    sectionTitleContainer: {
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.xl,
        marginBottom: SPACING.md,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        marginBottom: SPACING.md,
    },
    productCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        padding: SPACING.sm,
    },
});

export default HomeSkeleton;
